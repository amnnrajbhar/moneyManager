import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PdfExportService } from '../services/pdf-export.service';
import { TransactionService } from '../services/transaction.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-pdf-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-gray-900">Export PDF Report</h2>
        <button (click)="close()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="space-y-4">
        <!-- Filter Type Selection -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Select Filter</label>
          <div class="grid grid-cols-2 gap-3">
            <label class="relative cursor-pointer">
              <input
                type="radio"
                [(ngModel)]="filterType"
                value="month"
                (change)="onFilterTypeChange()"
                class="sr-only"
              />
              <div class="p-3 border-2 rounded-lg transition-all"
                   [class]="filterType === 'month' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-calendar-alt text-orange-600"></i>
                  <span class="font-medium text-sm">By Month</span>
                </div>
              </div>
            </label>
            <label class="relative cursor-pointer">
              <input
                type="radio"
                [(ngModel)]="filterType"
                value="range"
                (change)="onFilterTypeChange()"
                class="sr-only"
              />
              <div class="p-3 border-2 rounded-lg transition-all"
                   [class]="filterType === 'range' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-calendar-week text-orange-600"></i>
                  <span class="font-medium text-sm">Date Range</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Month Selection -->
        <div *ngIf="filterType === 'month'">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Select Month</label>
          <input
            type="month"
            [(ngModel)]="selectedMonth"
            (change)="onDateChange()"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Date Range Selection -->
        <div *ngIf="filterType === 'range'" class="space-y-3">
          <!-- Quick Range Buttons -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Quick Select</label>
            <div class="grid grid-cols-4 gap-2">
              <button
                (click)="setQuickRange('3months')"
                [class]="rangePreset === '3months' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                class="px-3 py-2 text-xs font-medium rounded-lg transition-all"
              >
                3 Months
              </button>
              <button
                (click)="setQuickRange('6months')"
                [class]="rangePreset === '6months' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                class="px-3 py-2 text-xs font-medium rounded-lg transition-all"
              >
                6 Months
              </button>
              <button
                (click)="setQuickRange('year')"
                [class]="rangePreset === 'year' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                class="px-3 py-2 text-xs font-medium rounded-lg transition-all"
              >
                This Year
              </button>
              <button
                (click)="setQuickRange('custom')"
                [class]="rangePreset === 'custom' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                class="px-3 py-2 text-xs font-medium rounded-lg transition-all"
              >
                Custom
              </button>
            </div>
          </div>

          <!-- Date Inputs -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                [(ngModel)]="startDate"
                (change)="onDateChange()"
                [disabled]="rangePreset !== 'custom'"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                [(ngModel)]="endDate"
                (change)="onDateChange()"
                [disabled]="rangePreset !== 'custom'"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <!-- Transaction Count Info -->
        <div *ngIf="transactionCount !== null" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p class="text-sm text-blue-800">
            <i class="fas fa-info-circle mr-2"></i>
            {{ transactionCount }} transaction(s) will be exported
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 pt-4">
          <button
            (click)="generatePDF()"
            [disabled]="!canGenerate() || loading"
            class="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <i class="fas fa-file-pdf mr-2"></i>
            {{ loading ? 'Generating...' : 'Download PDF' }}
          </button>
          <button
            (click)="close()"
            class="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `
})
export class PdfExportModalComponent {
  filterType: 'month' | 'range' = 'month';
  selectedMonth: string = new Date().toISOString().substring(0, 7);
  startDate: string = '';
  endDate: string = '';
  rangePreset: '3months' | '6months' | 'year' | 'custom' = '3months';
  transactionCount: number | null = null;
  loading = false;
  transactions: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PdfExportModalComponent>,
    private pdfExportService: PdfExportService,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {
    this.loadTransactions();
    this.setQuickRange('3months');
  }

  onFilterTypeChange(): void {
    this.updateTransactionCount();
  }

  onDateChange(): void {
    if (this.filterType === 'range' && this.startDate && this.endDate) {
      this.rangePreset = 'custom';
    }
    this.updateTransactionCount();
  }

  setQuickRange(preset: '3months' | '6months' | 'year' | 'custom'): void {
    this.rangePreset = preset;
    const today = new Date();
    const endDate = new Date(today);
    let startDate = new Date(today);

    switch (preset) {
      case '3months':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(today.getMonth() - 6);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'custom':
        return;
    }

    this.startDate = startDate.toISOString().split('T')[0];
    this.endDate = endDate.toISOString().split('T')[0];
    this.updateTransactionCount();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.updateTransactionCount();
      },
      error: (err) => console.error('Error loading transactions:', err)
    });
  }

  updateTransactionCount(): void {
    if (this.filterType === 'month' && this.selectedMonth) {
      this.transactionCount = this.transactions.filter(t => 
        t.date.substring(0, 7) === this.selectedMonth
      ).length;
    } else if (this.filterType === 'range' && this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      this.transactionCount = this.transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= start && tDate <= end;
      }).length;
    } else {
      this.transactionCount = null;
    }
  }

  canGenerate(): boolean {
    if (this.filterType === 'month') {
      return !!this.selectedMonth && this.transactionCount! > 0;
    }
    return !!this.startDate && !!this.endDate && this.transactionCount! > 0;
  }

  generatePDF(): void {
    if (!this.canGenerate()) return;

    this.loading = true;
    this.toastService.show('Generating PDF...');

    setTimeout(() => {
      try {
        if (this.filterType === 'month') {
          this.pdfExportService.generateTransactionPDF({
            transactions: this.transactions,
            month: this.selectedMonth
          });
        } else {
          this.pdfExportService.generateTransactionPDF({
            transactions: this.transactions,
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate)
          });
        }
        this.toastService.show('PDF generated successfully!');
        this.close();
      } catch (error) {
        console.error('Error generating PDF:', error);
        this.toastService.show('Failed to generate PDF');
      } finally {
        this.loading = false;
      }
    }, 500);
  }

  close(): void {
    this.dialogRef.close();
  }
}
