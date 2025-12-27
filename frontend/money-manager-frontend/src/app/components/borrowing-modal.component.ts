import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeopleService, Person } from '../services/people.service';

@Component({
  selector: 'app-borrowing-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 sm:p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Borrowing Overview</h2>
        <button (click)="close()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="space-y-4">
        <div *ngFor="let person of borrowingData" class="bg-gray-50 rounded-lg p-4">
          <div 
            class="flex items-center justify-between mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            (click)="togglePersonTransactions(person)"
          >
            <div>
              <h3 class="font-medium text-gray-900">{{ person.name }}</h3>
              <p class="text-sm text-gray-500">{{ person.relation }}</p>
            </div>
            <div class="flex items-center space-x-3">
              <div class="text-right">
                <p class="font-bold text-orange-600">
                  <i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatCurrency(person.totalAmount) }}
                </p>
                <p class="text-xs text-gray-500">{{ person.transactions.length }} transactions</p>
              </div>
              <i class="fas" [class]="person.expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>
          </div>

          <div *ngIf="person.expanded" class="space-y-2 mt-3">
            <div *ngFor="let transaction of person.transactions" class="flex items-center justify-between bg-white rounded p-2">
              <div class="flex-1">
                <p class="text-sm font-medium">{{ transaction.category }}</p>
                <p class="text-xs text-gray-500">{{ transaction.date | date:'MMM dd, yyyy' }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-orange-600">
                  <i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatCurrency(transaction.amount) }}
                </span>
                <div class="flex items-center space-x-2">
                  <label class="text-xs text-gray-600">Returned:</label>
                  <input 
                    type="radio" 
                    [name]="'returned_' + transaction._id" 
                    [checked]="transaction.returned === true"
                    (change)="updateReturnStatus(transaction._id, true)"
                    class="text-green-600"
                  >
                  <span class="text-xs">Yes</span>
                  <input 
                    type="radio" 
                    [name]="'returned_' + transaction._id" 
                    [checked]="transaction.returned === false"
                    (change)="updateReturnStatus(transaction._id, false)"
                    class="text-red-600"
                  >
                  <span class="text-xs">No</span>
                </div>
                <button 
                  *ngIf="!transaction.returned && person.mobile"
                  (click)="sendReminder(person)"
                  class="text-blue-600 hover:text-blue-800 text-xs"
                  title="Send Reminder"
                >
                  <i class="fas fa-bell"></i>
                </button>
              </div>
            </div>
            <div *ngIf="person.transactions.length === 0" class="text-center py-4 text-gray-500 text-sm">
              No borrowing transactions yet
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="borrowingData.length === 0" class="text-center py-8">
        <i class="fas fa-handshake text-gray-400 text-4xl mb-4"></i>
        <p class="text-gray-500">No borrowing transactions found</p>
      </div>
    </div>
  `
})
export class BorrowingModalComponent {
  borrowingData: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<BorrowingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private peopleService: PeopleService
  ) {
    this.loadPeopleAndProcessData();
  }

  loadPeopleAndProcessData(): void {
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.processBorrowingData(people);
      },
      error: (err) => {
        console.error('Error loading people:', err);
        this.processBorrowingData([]);
      }
    });
  }

  processBorrowingData(people: any[]): void {
    const borrowingTransactions = this.data.borrowings || [];
    
    // Always show all people first
    this.borrowingData = people.map(person => {
      const personTransactions = borrowingTransactions.filter((t: any) => t.person === person._id);
      const totalAmount = personTransactions.reduce((sum: number, t: any) => sum + t.amount, 0);
      
      return {
        name: person.name,
        relation: person.relation,
        mobile: person.mobile || '',
        totalAmount: totalAmount,
        transactions: personTransactions,
        expanded: false
      };
    });
  }

  togglePersonTransactions(person: any): void {
    person.expanded = !person.expanded;
  }

  updateReturnStatus(transactionId: string, returned: boolean): void {
    // Update local data
    this.borrowingData.forEach(person => {
      person.transactions.forEach((transaction: any) => {
        if (transaction._id === transactionId) {
          transaction.returned = returned;
        }
      });
    });
  }

  sendReminder(person: any): void {
    if (person.mobile) {
      const message = `Hi ${person.name}, this is a friendly reminder about the money you borrowed. Please return when convenient. Thanks!`;
      const whatsappUrl = `https://wa.me/${person.mobile}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  close(): void {
    this.dialogRef.close();
  }
}