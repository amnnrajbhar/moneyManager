import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../services/transaction.service';

@Component({
  selector: 'app-expenses-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  template: `
    <div class="bg-white rounded-2xl w-full max-h-[80vh] flex flex-col mx-2">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center">
            <mat-icon class="text-white">trending_down</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">All Expenses</h2>
            <p class="text-sm text-gray-600">Total: ₹{{ formatIndianCurrency(totalExpenses) }}</p>
          </div>
        </div>
        <button mat-icon-button (click)="close()" class="text-gray-400 hover:text-gray-600">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-1 overflow-hidden">
        <div class="h-full overflow-y-auto px-6 py-4">
          <div class="space-y-3">
            <div *ngFor="let expense of paginatedExpenses" 
                 class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                  <mat-icon class="text-white text-sm">remove</mat-icon>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ expense.category }}</h4>
                  <p class="text-sm text-gray-600">{{ expense.date | date:'MMM dd, yyyy' }}</p>
                  <p *ngIf="expense.note" class="text-xs text-gray-500 mt-1">{{ expense.note }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-red-600">
                  -₹{{ formatIndianCurrency(expense.amount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 p-4">
        <mat-paginator
          [length]="expenses.length"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 20]"
          [pageIndex]="pageIndex"
          (page)="onPageChange($event)"
          showFirstLastButtons>
        </mat-paginator>
      </div>
    </div>
  `
})
export class ExpensesModalComponent {
  expenses: Transaction[] = [];
  paginatedExpenses: Transaction[] = [];
  totalExpenses = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<ExpensesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { expenses: Transaction[] }
  ) {
    this.expenses = data.expenses;
    this.totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    this.updatePaginatedExpenses();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedExpenses();
  }

  updatePaginatedExpenses(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedExpenses = this.expenses.slice(startIndex, endIndex);
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  close(): void {
    this.dialogRef.close();
  }
}