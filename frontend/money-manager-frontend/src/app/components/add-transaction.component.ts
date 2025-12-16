import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Modern Navigation -->
      <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center h-16">
            <button
              routerLink="/dashboard"
              class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mr-6"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="font-medium">Back to Dashboard</span>
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">₹</span>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add Transaction
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-lg mx-auto py-8 px-4 sm:px-6">
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-8">
          <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Transaction Type -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
              <div class="grid grid-cols-2 gap-3">
                <label class="relative">
                  <input
                    type="radio"
                    formControlName="type"
                    value="income"
                    class="sr-only"
                  />
                  <div class="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
                       [class]="transactionForm.get('type')?.value === 'income' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <span class="font-medium text-gray-900">Income</span>
                    </div>
                  </div>
                </label>
                <label class="relative">
                  <input
                    type="radio"
                    formControlName="type"
                    value="expense"
                    class="sr-only"
                  />
                  <div class="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
                       [class]="transactionForm.get('type')?.value === 'expense' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </div>
                      <span class="font-medium text-gray-900">Expense</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Amount -->
            <div>
              <label for="amount" class="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-lg font-semibold">₹</span>
                </div>
                <input
                  id="amount"
                  formControlName="amount"
                  type="number"
                  step="1"
                  min="1"
                  class="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                  placeholder="0"
                />
              </div>
              <div *ngIf="transactionForm.get('amount')?.invalid && transactionForm.get('amount')?.touched" class="mt-1 text-sm text-red-600">
                Please enter a valid amount
              </div>
            </div>

            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                id="category"
                formControlName="category"
                class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="" disabled>Select a category</option>
                <optgroup *ngIf="transactionForm.get('type')?.value === 'income'" label="Income Categories">
                  <option value="Salary">Salary</option>
                  <option value="Business">Business Income</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment Returns</option>
                  <option value="Rental">Rental Income</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Gift">Gift/Cash Received</option>
                  <option value="Other Income">Other Income</option>
                </optgroup>
                <optgroup *ngIf="transactionForm.get('type')?.value === 'expense'" label="Expense Categories">
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills & Utilities">Bills & Utilities</option>
                  <option value="Rent">Rent</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Insurance">Insurance</option>
                  <option value="EMI">EMI/Loans</option>
                  <option value="Mobile Recharge">Mobile Recharge</option>
                  <option value="Internet">Internet</option>
                  <option value="Subscription">Subscriptions</option>
                  <option value="Gift">Gifts Given</option>
                  <option value="Other Expense">Other Expense</option>
                </optgroup>
              </select>
              <div *ngIf="transactionForm.get('category')?.invalid && transactionForm.get('category')?.touched" class="mt-1 text-sm text-red-600">
                Please select a category
              </div>
            </div>

            <!-- Date -->
            <div>
              <label for="date" class="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                id="date"
                formControlName="date"
                type="date"
                class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            <!-- Note -->
            <div>
              <label for="note" class="block text-sm font-semibold text-gray-700 mb-2">Note (Optional)</label>
              <textarea
                id="note"
                formControlName="note"
                rows="3"
                class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                placeholder="Add any additional details..."
              ></textarea>
            </div>

            <!-- Error Message -->
            <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-xl p-3">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm text-red-700">{{ error }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="transactionForm.invalid || loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg *ngIf="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg *ngIf="!loading" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              {{ loading ? 'Adding Transaction...' : 'Add Transaction' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddTransactionComponent {
  transactionForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      type: ['expense', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      note: ['']
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.loading = true;
      this.error = '';

      const transaction = {
        ...this.transactionForm.value,
        amount: parseFloat(this.transactionForm.value.amount)
      };

      this.transactionService.addTransaction(transaction).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to add transaction';
          this.loading = false;
        }
      });
    }
  }
}