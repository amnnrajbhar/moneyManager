import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div class="max-w-md w-full">
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span class="text-white font-bold text-2xl">₹</span>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Set Your Salary
          </h2>
          <p class="mt-2 text-gray-600">Enter your monthly salary to get started</p>
        </div>

        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-8">
          <form [formGroup]="salaryForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label for="salary" class="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Salary
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-lg font-semibold">₹</span>
                </div>
                <input
                  id="salary"
                  formControlName="salary"
                  type="number"
                  step="1000"
                  min="1000"
                  class="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
                  placeholder="50000"
                />
              </div>
              <div *ngIf="salaryForm.get('salary')?.invalid && salaryForm.get('salary')?.touched" class="mt-1 text-sm text-red-600">
                Please enter a valid salary amount
              </div>
            </div>

            <button
              type="submit"
              [disabled]="salaryForm.invalid || loading"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg *ngIf="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Setting up...' : 'Continue to Dashboard' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class SalarySetupComponent {
  salaryForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.salaryForm = this.fb.group({
      salary: ['', [Validators.required, Validators.min(1000)]]
    });
  }

  onSubmit(): void {
    if (this.salaryForm.valid) {
      this.loading = true;
      const salary = this.salaryForm.value.salary;
      
      // Store salary in localStorage
      localStorage.setItem('monthlySalary', salary.toString());
      
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    }
  }
}