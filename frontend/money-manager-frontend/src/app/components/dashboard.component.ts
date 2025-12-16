import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartConfiguration, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { TransactionService, Transaction } from '../services/transaction.service';
import { ExpensesModalComponent } from './expenses-modal.component';
import { IncomeModalComponent } from './income-modal.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Modern Navigation -->
      <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">₹</span>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Money Manager
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <div class="hidden sm:block text-sm text-gray-600">
                Salary: ₹{{ formatIndianCurrency(monthlySalary) }}
              </div>
              <button
                (click)="logout()"
                class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span class="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Salary Info -->
        <div class="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold mb-1">Monthly Salary</h3>
              <p class="text-3xl font-bold">₹{{ formatIndianCurrency(monthlySalary) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm opacity-90 mb-1">Amount Left</p>
              <p class="text-2xl font-bold" [class]="balance >= 0 ? 'text-green-200' : 'text-red-200'">
                ₹{{ formatIndianCurrency(Math.abs(balance)) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Modern Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Expense Card -->
          <div (click)="openExpensesModal()" class="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">Total Expenses</p>
                <p class="text-2xl font-bold text-gray-900">₹{{ formatIndianCurrency(totalExpense) }}</p>
                <p class="text-xs text-blue-600 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Click to view details
                </p>
              </div>
              <div class="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Additional Income Card -->
          <div (click)="openIncomeModal()" class="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">Additional Income</p>
                <p class="text-2xl font-bold text-gray-900">₹{{ formatIndianCurrency(totalIncome) }}</p>
                <p class="text-xs text-blue-600 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Click to view details
                </p>
              </div>
              <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Simple Chart -->
        <div class="mb-8 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Quick Overview</h3>
            <button
              routerLink="/advanced-chart"
              class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Advanced Filter</span>
            </button>
          </div>
          <div class="h-48">
            <canvas baseChart
              [data]="chartData"
              [type]="'bar'"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mb-8 flex justify-center">
          <button
            routerLink="/add-transaction"
            class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-3"
          >
            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add New Transaction</span>
          </button>
        </div>

        <!-- Modern Transactions List -->
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200/50">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <div class="text-sm text-gray-500">{{ transactions.length }} transactions</div>
            </div>
          </div>
          
          <div class="divide-y divide-gray-200/50">
            <div *ngFor="let transaction of transactions; let i = index" 
                 class="px-6 py-4 hover:bg-gray-50/50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="relative">
                    <div 
                      class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      [class]="transaction.type === 'income' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path *ngIf="transaction.type === 'income'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        <path *ngIf="transaction.type === 'expense'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h4 class="text-sm font-semibold text-gray-900">{{ transaction.category }}</h4>
                      <span class="px-2 py-1 text-xs rounded-full" 
                            [class]="transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                        {{ transaction.type }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">{{ transaction.date | date:'MMM dd, yyyy' }}</p>
                    <p *ngIf="transaction.note" class="text-xs text-gray-500 mt-1">{{ transaction.note }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="text-right">
                    <div class="text-lg font-bold" 
                         [class]="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                      {{ transaction.type === 'income' ? '+' : '-' }}₹{{ formatIndianCurrency(transaction.amount) }}
                    </div>
                  </div>
                  <button
                    (click)="deleteTransaction(transaction._id!)"
                    class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Delete transaction"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div *ngIf="transactions.length === 0" class="px-6 py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p class="text-gray-500 mb-4">Start tracking your finances by adding your first transaction!</p>
            <button
              routerLink="/add-transaction"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  monthlySalary = 0;
  remainingBalance = 0;
  Math = Math;

  chartData: ChartData<'bar'> = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [{
      label: 'Amount (₹)',
      data: [0, 0, 0],
      backgroundColor: ['#10B981', '#EF4444', '#3B82F6'],
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + new Intl.NumberFormat('en-IN').format(value as number);
          }
        }
      }
    }
  };

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkSalarySetup();
    this.loadTransactions();
  }

  checkSalarySetup(): void {
    const salary = localStorage.getItem('monthlySalary');
    if (!salary) {
      this.router.navigate(['/salary-setup']);
      return;
    }
    this.monthlySalary = parseFloat(salary);
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.calculateTotals();
      },
      error: (err) => console.error('Error loading transactions:', err)
    });
  }

  calculateTotals(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    this.totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Total available = salary + additional income
    const totalAvailable = this.monthlySalary + this.totalIncome;
    this.remainingBalance = totalAvailable - this.totalExpense;
    this.balance = this.remainingBalance;
    
    // Update chart data
    this.chartData.datasets[0].data = [this.totalIncome, this.totalExpense, Math.abs(this.balance)];
  }

  deleteTransaction(id: string): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.loadTransactions(),
        error: (err) => console.error('Error deleting transaction:', err)
      });
    }
  }

  openExpensesModal(): void {
    const expenseTransactions = this.transactions.filter(t => t.type === 'expense');
    this.dialog.open(ExpensesModalComponent, {
      data: { expenses: expenseTransactions },
      width: '95%',
      maxWidth: '600px',
      maxHeight: '85vh',
      panelClass: 'custom-dialog-container',
      position: { top: '50px' }
    });
  }

  openIncomeModal(): void {
    const incomeTransactions = this.transactions.filter(t => t.type === 'income');
    this.dialog.open(IncomeModalComponent, {
      data: { incomes: incomeTransactions },
      width: '95%',
      maxWidth: '600px',
      maxHeight: '85vh',
      panelClass: 'custom-dialog-container',
      position: { top: '50px' }
    });
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}