import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Portfolio } from '../services/portfolio.service';

@Component({
  selector: 'app-add-portfolio-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4">
      <div class="bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900">Add Investment</h2>
          <button
            type="button"
            (click)="onCancel()"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <form [formGroup]="portfolioForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Investment Name</label>
            <input
              formControlName="name"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., RELIANCE, SBI Bluechip Fund"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              formControlName="type"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="stocks">📈 Stocks</option>
              <option value="mutual_funds">🐷 Mutual Funds</option>
              <option value="bonds">📜 Bonds</option>
              <option value="crypto">₿ Cryptocurrency</option>
              <option value="other">🪙 Other</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                formControlName="quantity"
                type="number"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Units"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
              <input
                formControlName="date"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Buy Price (₹)</label>
              <input
                formControlName="buyPrice"
                type="number"
                step="0.01"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Price (₹)</label>
              <input
                formControlName="currentPrice"
                type="number"
                step="0.01"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              (click)="onCancel()"
              class="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="portfolioForm.invalid"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddPortfolioModalComponent {
  portfolioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPortfolioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.portfolioForm = this.fb.group({
      name: ['', Validators.required],
      type: ['stocks', Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      buyPrice: ['', [Validators.required, Validators.min(0.01)]],
      currentPrice: ['', [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  onSubmit(): void {
    if (this.portfolioForm.valid) {
      this.dialogRef.close(this.portfolioForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}