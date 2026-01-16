import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../services/transaction.service';

@Component({
  selector: 'app-income-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  template: `
    <div class="bg-white rounded-xl sm:rounded-2xl w-full max-h-[85vh] flex flex-col">
      <!-- Header - Responsive -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
        <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
            <mat-icon class="text-white text-sm sm:text-base">trending_up</mat-icon>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg sm:text-xl font-bold text-gray-900 truncate">Additional Income</h2>
            <p class="text-xs sm:text-sm text-gray-600">Total: ₹{{ formatIndianCurrency(totalIncome) }}</p>
          </div>
        </div>
        <button mat-icon-button (click)="close()" class="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2">
          <mat-icon class="text-lg sm:text-xl">close</mat-icon>
        </button>
      </div>

      <!-- Content - Responsive Scrollable Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="px-3 sm:px-6 py-3 sm:py-4">
          <div class="space-y-2 sm:space-y-3">
            <div *ngFor="let income of paginatedIncome" 
                 class="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div class="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <mat-icon *ngIf="income.type !== 'Borrowed'" class="text-white text-xs sm:text-sm">add</mat-icon>
                  <mat-icon *ngIf="income.type === 'Borrowed'" class="text-white text-xs sm:text-sm">handshake</mat-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-sm sm:text-base text-gray-900 truncate">{{ income.category }}</h4>
                  <p class="text-xs sm:text-sm text-gray-600">{{ income.date | date:'MMM dd, yyyy' }}</p>
                  <p *ngIf="income.note" class="text-xs text-gray-500 mt-1 truncate">{{ income.note }}</p>
                </div>
              </div>
              <div class="text-right flex-shrink-0 ml-3">
                <div class="text-sm sm:text-lg font-bold text-green-600">
                  +₹{{ formatIndianCurrency(income.amount) }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State - Responsive -->
          <div *ngIf="incomes.length === 0" class="text-center py-8 sm:py-12">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <mat-icon class="text-gray-400 text-xl sm:text-2xl">account_balance_wallet</mat-icon>
            </div>
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">No additional income found</h3>
            <p class="text-sm text-gray-500">You haven't recorded any additional income yet.</p>
          </div>
        </div>
      </div>

      <!-- Footer with Pagination - Responsive -->
      <div class="border-t border-gray-200 p-3 sm:p-4" *ngIf="incomes.length > 0">
        <mat-paginator
          [length]="incomes.length"
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
export class IncomeModalComponent {
  incomes: Transaction[] = [];
  paginatedIncome: Transaction[] = [];
  totalIncome = 0;
  pageSize = 5;
  pageIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<IncomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { incomes: Transaction[] }
  ) {
    this.incomes = data.incomes;
    this.totalIncome = this.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    this.updatePaginatedIncome();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedIncome();
  }

  updatePaginatedIncome(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedIncome = this.incomes.slice(startIndex, endIndex);
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  close(): void {
    this.dialogRef.close();
  }
}