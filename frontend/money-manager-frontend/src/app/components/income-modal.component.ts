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
    <div class="bg-white rounded-2xl w-full max-h-[80vh] flex flex-col mx-2">
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <mat-icon class="text-white">trending_up</mat-icon>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Additional Income</h2>
            <p class="text-sm text-gray-600">Total: ₹{{ formatIndianCurrency(totalIncome) }}</p>
          </div>
        </div>
        <button mat-icon-button (click)="close()" class="text-gray-400 hover:text-gray-600">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-1 overflow-hidden">
        <div class="h-full overflow-y-auto px-6 py-4">
          <div class="space-y-3">
            <div *ngFor="let income of paginatedIncome" 
                 class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <mat-icon class="text-white text-sm">add</mat-icon>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">{{ income.category }}</h4>
                  <p class="text-sm text-gray-600">{{ income.date | date:'MMM dd, yyyy' }}</p>
                  <p *ngIf="income.note" class="text-xs text-gray-500 mt-1">{{ income.note }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-green-600">
                  +₹{{ formatIndianCurrency(income.amount) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 p-4">
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
  pageSize = 10;
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