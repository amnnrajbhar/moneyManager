import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeopleService, Person } from '../services/people.service';

@Component({
  selector: 'app-borrowing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 sm:p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Borrowing Overview</h2>
        <div class="flex items-center space-x-3">
          <button 
            (click)="shareDetails()"
            [disabled]="!hasSelectedPeople()"
            class="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            title="Share Details"
          >
            <i class="fas fa-share mr-2"></i>Share Details
          </button>
          <button (click)="close()" class="text-gray-400 hover:text-gray-600 p-2">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div *ngFor="let person of borrowingData" class="bg-gray-50 rounded-lg p-4">
          <div 
            class="flex items-center justify-between mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            (click)="togglePersonTransactions(person)"
          >
            <div class="flex items-center space-x-3">
              <input 
                type="checkbox" 
                [(ngModel)]="person.selected"
                (click)="$event.stopPropagation()"
                class="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 checked:border-blue-600 transition-all duration-200"
              >
              <div>
                <h3 class="font-medium text-gray-900">{{ person.name }}</h3>
                <p class="text-sm text-gray-500">{{ person.relation }}</p>
              </div>
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
        expanded: false,
        selected: false
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

  hasSelectedPeople(): boolean {
    return this.borrowingData.some(person => person.selected);
  }

  sendReminderToSelected(): void {
    const selectedPeople = this.borrowingData.filter(person => person.selected && person.mobile);
    selectedPeople.forEach(person => {
      this.sendReminder(person);
    });
  }

  shareDetails(): void {
    const selectedPeople = this.borrowingData.filter(person => person.selected);
    if (selectedPeople.length === 0) return;

    let detailsText = '💰 Borrowing Details:\n\n';
    
    selectedPeople.forEach(person => {
      detailsText += `👤 ${person.name} (${person.relation})\n`;
      detailsText += `💵 Total Amount: ₹${this.formatCurrency(person.totalAmount)}\n`;
      
      if (person.transactions.length > 0) {
        detailsText += '📋 Transactions:\n';
        person.transactions.forEach((transaction: any) => {
          const status = transaction.returned ? '✅ Returned' : '❌ Pending';
          let transactionLine = `  • ${transaction.category}: ₹${this.formatCurrency(transaction.amount)} (${new Date(transaction.date).toLocaleDateString()}) ${status}`;
          if (transaction.note) {
            transactionLine += ` - Note: ${transaction.note}`;
          }
          detailsText += transactionLine + '\n';
        });
      }
      detailsText += '\n';
    });

    detailsText += '📱 Generated from Money Manager App';

    if (navigator.share) {
      navigator.share({
        title: 'Borrowing Details',
        text: detailsText
      });
    } else {
      navigator.clipboard.writeText(detailsText).then(() => {
        alert('Details copied to clipboard!');
      });
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  close(): void {
    this.dialogRef.close();
  }
}