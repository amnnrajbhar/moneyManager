import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Transaction } from '../services/transaction.service';
import { PeopleService, Person } from '../services/people.service';

@Component({
  selector: 'app-edit-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  template: `
    <div class="bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-bold">Edit Transaction</h2>
        <button (click)="dialogRef.close()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()" class="p-6 space-y-6">
        <!-- Transaction Type -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
          <div class="grid grid-cols-3 gap-3">
            <label class="relative">
              <input type="radio" formControlName="type" value="income" class="sr-only" />
              <div class="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all"
                   [class]="transactionForm.get('type')?.value === 'income' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'">
                <div class="flex flex-col items-center space-y-1">
                  <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <span class="font-medium text-sm">Income</span>
                </div>
              </div>
            </label>
            <label class="relative">
              <input type="radio" formControlName="type" value="expense" class="sr-only" />
              <div class="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all"
                   [class]="transactionForm.get('type')?.value === 'expense' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'">
                <div class="flex flex-col items-center space-y-1">
                  <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </div>
                  <span class="font-medium text-sm">Expense</span>
                </div>
              </div>
            </label>
            <label class="relative">
              <input type="radio" formControlName="type" value="Borrowed" class="sr-only" />
              <div class="flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all"
                   [class]="transactionForm.get('type')?.value === 'Borrowed' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'">
                <div class="flex flex-col items-center space-y-1">
                  <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <i class="fas fa-handshake text-white text-sm"></i>
                  </div>
                  <span class="font-medium text-sm">Borrowed</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 text-lg font-semibold">₹</span>
            </div>
            <input formControlName="amount" type="number" step="1" min="1"
              class="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white text-lg"
              placeholder="0" />
          </div>
        </div>

        <!-- Person (for Borrowed) -->
        <div *ngIf="transactionForm.get('type')?.value === 'Borrowed'">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Person</label>
          <select formControlName="person"
            class="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white">
            <option value="" disabled>Select a person</option>
            <option *ngFor="let person of people" [value]="person._id">{{ person.name }} ({{ person.relation }})</option>
          </select>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select formControlName="category"
            class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white">
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

        <!-- Date -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Date</label>
          <input formControlName="date" type="date"
            class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white" />
        </div>

        <!-- Note -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Note (Optional)</label>
          <textarea formControlName="note" rows="3"
            class="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white resize-none"
            placeholder="Add any additional details..."></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-4">
          <button type="button" (click)="dialogRef.close()" class="flex-1 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold transition-all">Cancel</button>
          <button type="submit" [disabled]="transactionForm.invalid" class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">Update</button>
        </div>
      </form>
    </div>
  `
})
export class EditTransactionModalComponent implements OnInit {
  transactionForm: FormGroup;
  people: Person[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditTransactionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction },
    private fb: FormBuilder,
    private peopleService: PeopleService
  ) {
    this.transactionForm = this.fb.group({
      type: [data.transaction.type, Validators.required],
      amount: [data.transaction.amount, [Validators.required, Validators.min(0.01)]],
      category: [data.transaction.category, Validators.required],
      person: [data.transaction.person || ''],
      date: [new Date(data.transaction.date).toISOString().split('T')[0], Validators.required],
      note: [data.transaction.note || '']
    });
  }

  ngOnInit(): void {
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
      const updatedTransaction = {
        ...this.data.transaction,
        ...this.transactionForm.value,
        amount: parseFloat(this.transactionForm.value.amount)
      };
      this.dialogRef.close(updatedTransaction);
    }
  }
}
