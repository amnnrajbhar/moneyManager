import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TransactionService, Transaction } from '../services/transaction.service';
import { PeopleService, Person } from '../services/people.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div class="flex items-center justify-between h-14 sm:h-16">
            <button routerLink="/dashboard" class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="font-medium text-sm sm:text-base">Back</span>
            </button>
            <div class="absolute left-1/2 transform -translate-x-1/2">
              <small class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">Edit Transaction</small>
            </div>
            <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xs sm:text-sm">₹</span>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-lg mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()" class="space-y-4 sm:space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Transaction Type</label>
              <div class="grid grid-cols-3 gap-2 sm:gap-3">
                <label class="relative">
                  <input type="radio" formControlName="type" value="income" class="sr-only" />
                  <div class="flex items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200"
                       [class]="transactionForm.get('type')?.value === 'income' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'">
                    <div class="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <span class="font-medium text-xs sm:text-sm text-gray-900">Income</span>
                    </div>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" formControlName="type" value="expense" class="sr-only" />
                  <div class="flex items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200"
                       [class]="transactionForm.get('type')?.value === 'expense' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'">
                    <div class="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                      </div>
                      <span class="font-medium text-xs sm:text-sm text-gray-900">Expense</span>
                    </div>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" formControlName="type" value="Borrowed" class="sr-only" />
                  <div class="flex items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200"
                       [class]="transactionForm.get('type')?.value === 'Borrowed' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
                    <div class="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
                      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-handshake text-white text-xs sm:text-sm"></i>
                      </div>
                      <span class="font-medium text-xs sm:text-sm text-gray-900">Borrowed</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label for="amount" class="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-base sm:text-lg font-semibold">₹</span>
                </div>
                <input id="amount" formControlName="amount" type="number" step="1" min="1"
                  class="block w-full pl-7 sm:pl-8 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-base sm:text-lg"
                  placeholder="0" />
              </div>
            </div>

            <div *ngIf="transactionForm.get('type')?.value === 'Borrowed'">
              <label for="person" class="block text-sm font-semibold text-gray-700 mb-2">Person</label>
              <select id="person" formControlName="person"
                class="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base">
                <option value="" disabled>Select a person</option>
                <option *ngFor="let person of people" [value]="person._id">{{ person.name }} ({{ person.relation }})</option>
              </select>
            </div>

            <div>
              <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select id="category" formControlName="category"
                class="block w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base">
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
                <optgroup *ngIf="transactionForm.get('type')?.value === 'Borrowed'" label="Borrowed Categories">
                  <option value="Borrowed Money">Borrowed Money</option>
                  <option value="Lent Money">Lent Money</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label for="date" class="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input id="date" formControlName="date" type="date"
                class="block w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base" />
            </div>

            <div>
              <label for="note" class="block text-sm font-semibold text-gray-700 mb-2">Note (Optional)</label>
              <textarea id="note" formControlName="note" rows="3"
                class="block w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-sm sm:text-base"
                placeholder="Add any additional details..."></textarea>
            </div>

            <button type="submit" [disabled]="transactionForm.invalid || loading"
              class="w-full flex justify-center items-center py-3 sm:py-4 px-4 border border-transparent rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg *ngIf="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Updating...' : 'Update Transaction' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class EditTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  loading = false;
  people: Person[] = [];
  transactionId: string = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.transactionForm = this.fb.group({
      type: ['expense', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      person: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const transaction = navigation?.extras?.state?.['transaction'] || history.state?.transaction;
    
    if (transaction) {
      this.transactionId = transaction._id;
      this.transactionForm.patchValue({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        person: transaction.person || '',
        date: new Date(transaction.date).toISOString().split('T')[0],
        note: transaction.note || ''
      });
    }

    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPeople().subscribe({
      next: (people) => this.people = people,
      error: (err) => console.error('Error loading people:', err)
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.loading = true;
      const transaction = {
        ...this.transactionForm.value,
        amount: parseFloat(this.transactionForm.value.amount)
      };

      this.transactionService.updateTransaction(this.transactionId, transaction).subscribe({
        next: () => {
          this.toastService.show('Transaction updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error updating transaction:', err);
          this.toastService.show('Failed to update transaction');
          this.loading = false;
        }
      });
    }
  }
}
