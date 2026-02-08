import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartConfiguration, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { TransactionService, Transaction } from '../services/transaction.service';
import { PortfolioService } from '../services/portfolio.service';
import { UserBalanceService } from '../services/user-balance.service';
import { ToastService } from '../services/toast.service';
import { SeoService } from '../services/seo.service';
import { ExpensesModalComponent } from './expenses-modal.component';
import { IncomeModalComponent } from './income-modal.component';
import { BorrowingModalComponent } from './borrowing-modal.component';
import { PdfExportModalComponent } from './pdf-export-modal.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- SEO Landing Section (Hidden for authenticated users) -->
      <section *ngIf="showLandingContent" class="bg-white border-b border-gray-200">
        <div class="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Money Manager - Track Expenses & Manage Personal Finance</h1>
          <h2 class="text-xl text-gray-700 mb-6">Your Complete Budget Tracker and Expense Management Solution</h2>
          <p class="text-gray-600 mb-4">
            Take control of your finances with our powerful money manager app. Track expenses, manage income, 
            build your investment portfolio, and monitor borrowings all in one place. Our budget tracker helps you 
            make smarter financial decisions with real-time analytics and beautiful visualizations.
          </p>
          <p class="text-gray-600">
            Start managing your personal finance today with features like expense tracking, income management, 
            portfolio monitoring, and comprehensive financial reports. Perfect for individuals looking to manage money effectively.
          </p>
        </div>
      </section>
      <!-- Responsive Navigation -->
      <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div class="flex justify-between items-center h-14 sm:h-16">
            <!-- Logo Section -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-indian-rupee-sign text-white text-sm"></i>
              </div>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2">
              <small class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Money Manager
</small>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center space-x-1 sm:space-x-2">
              
              <!-- Add Transaction Button -->
              <button
                routerLink="/add-transaction"
                title="Add Transaction"
                class="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                <i class="fas fa-plus text-xs sm:text-sm"></i>
                <span class="hidden sm:inline text-xs font-medium">Add</span>
              </button>
              
              <!-- Portfolio Button -->
              <button
                routerLink="/portfolio"
                title="Portfolio"
                class="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <i class="fas fa-chart-pie text-xs sm:text-sm"></i>
                <span class="hidden sm:inline text-xs font-medium">Portfolio</span>
              </button>
              
              <!-- Logout Button -->
              <button
                (click)="logout()"
                title="Logout"
                class="flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span class="hidden sm:inline text-xs font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
        <!-- Balance Card - Responsive -->
        <div class="mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div class="text-center sm:text-left">
              <h3 class="text-base sm:text-lg font-semibold mb-1">Total Balance</h3>
              <p class="text-2xl sm:text-3xl font-bold">
                <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(totalBalance) }}
              </p>
              <p class="text-xs sm:text-sm opacity-90 mt-1">Income + Portfolio - Expenses</p>
            </div>
            <div class="text-center sm:text-right">
              <p class="text-xs sm:text-sm opacity-90 mb-1">Available</p>
              <p class="text-xl sm:text-2xl font-bold cursor-pointer hover:bg-white/20 rounded px-2 py-1 transition-all" 
                 [class]="totalBalance >= 0 ? 'text-green-200' : 'text-red-200'"
                 (click)="editAvailableAmount()">
                <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(totalBalance >= 0 ? totalBalance : 0) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Stats Cards - Responsive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <!-- Expense Card -->
          <div (click)="openExpensesModal()" class="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Expenses</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(totalExpense) }}
                </p>
                <p class="text-xs text-blue-600 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span class="truncate">View details</span>
                </p>
              </div>
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Income Card -->
          <div (click)="openIncomeModal()" class="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Additional Income</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(totalIncome) }}
                </p>
                <p class="text-xs text-blue-600 mt-1 flex items-center">
                  <svg class="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span class="truncate">View details</span>
                </p>
              </div>
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ml-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section - Responsive -->
        <div class="mb-4 sm:mb-6 lg:mb-8 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Quick Overview</h3>
            <div class="flex flex-wrap gap-2 sm:gap-3">
              <button
                routerLink="/portfolio"
                class="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
              >
                <i class="fas fa-chart-pie text-xs sm:text-sm"></i>
                <span>Portfolio</span>
              </button>
              <button
                routerLink="/advanced-chart"
                class="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>Chart</span>
              </button>
              <button
                (click)="openBorrowingModal()"
                class="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
              >
                <i class="fas fa-handshake text-xs sm:text-sm"></i>
                <span>Borrowing</span>
              </button>
              <button
                (click)="openPdfExportModal()"
                [disabled]="transactions.length === 0"
                class="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1 sm:space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download PDF Report"
              >
                <i class="fas fa-file-pdf text-xs sm:text-sm"></i>
                <span>PDF</span>
              </button>
            </div>
          </div>
          <!-- Chart Container - Responsive Height -->
          <div class="h-48 sm:h-56 lg:h-64 flex items-center justify-center">
            <canvas baseChart
              [data]="chartData"
              [type]="'bar'"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <!-- Recent Transactions - Responsive -->
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl overflow-hidden">
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/50">
            <div class="flex items-center justify-between">
              <h3 class="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button
                routerLink="/add-transaction"
                class="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Add New
              </button>
            </div>
          </div>
          
          <!-- Transaction List - Responsive -->
          <div class="divide-y divide-gray-200/50 max-h-80 sm:max-h-96 overflow-y-auto">
            <div *ngFor="let transaction of transactions" class="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" [class]="(transaction.type === 'income' || (transaction.type === 'Borrowed' && transaction.category === 'Lent Money')) ? 'bg-green-100' : 'bg-red-100'">
                    <i class="fas text-xs sm:text-sm" [class]="(transaction.type === 'income' || (transaction.type === 'Borrowed' && transaction.category === 'Lent Money')) ? 'fa-plus text-green-600' : (transaction.type === 'Borrowed' ? 'fa-handshake text-red-600' : 'fa-minus text-red-600')"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs sm:text-sm font-semibold text-gray-900 truncate">{{ transaction.category }}</h4>
                    <p class="text-xs text-gray-500">{{ transaction.date | date:'MMM dd, yyyy' }}</p>
                    <p *ngIf="transaction.note" class="text-xs text-gray-400 mt-1 truncate">{{ transaction.note }}</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 ml-3">
                  <div class="text-xs sm:text-sm font-bold" [class]="(transaction.type === 'income' || (transaction.type === 'Borrowed' && transaction.category === 'Lent Money')) ? 'text-green-600' : 'text-red-600'">
                    {{ (transaction.type === 'income' || (transaction.type === 'Borrowed' && transaction.category === 'Lent Money')) ? '+' : '-' }}<i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatIndianCurrency(transaction.amount) }}
                  </div>
                  <button
                    (click)="deleteTransaction(transaction._id!)"
                    class="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State - Responsive -->
          <div *ngIf="transactions.length === 0" class="px-4 sm:px-6 py-8 sm:py-12 text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-receipt text-gray-400 text-lg sm:text-2xl"></i>
            </div>
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">No Transaction found</h3>
            <p class="text-sm text-gray-500 mb-3 sm:mb-4">Start tracking your income and expenses!</p>
            <button
              routerLink="/add-transaction"
              class="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Transaction
            </button>
          </div>
        </div>

        <!-- Copyright Footer -->
        <div class="mt-8 text-center">
          <p class="text-xs text-gray-500">
            © 2026 Money Manager | Developed by <a href="https://amnnrajbhar.github.io/info/" target="_blank" class="text-blue-600 hover:text-blue-700 font-medium">Aman Rajbhar</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpense = 0;
  totalBorrowed = 0;
  balance = 0;
  totalBalance = 0;
  portfolioValue = 0;
  showLandingContent = false;

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
          callback: function (value) {
            return '₹' + new Intl.NumberFormat('en-IN').format(value as number);
          }
        }
      }
    }
  };

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private portfolioService: PortfolioService,
    private userBalanceService: UserBalanceService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private seoService: SeoService
  ) { }

  editAvailableAmount(): void {
    const newAmount = prompt('Enter available amount:', this.totalBalance.toString());
    if (newAmount !== null && !isNaN(Number(newAmount))) {
      this.totalBalance = Number(newAmount);
      this.userBalanceService.updateUserBalance(this.totalBalance).subscribe({
        next: () => {
          this.toastService.show('Balance updated successfully!');
        },
        error: (err) => {
          console.error('Error updating balance:', err);
          this.toastService.show('Failed to update balance');
        }
      });
    }
  }

  loadCustomBalance(): void {
    this.userBalanceService.getUserBalance().subscribe({
      next: (data) => {
        if (data.customBalance > 0) {
          this.totalBalance = data.customBalance;
        }
      },
      error: (err) => console.error('Error loading custom balance:', err)
    });
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Dashboard - Money Manager App',
      description: 'Manage your finances with our comprehensive dashboard. Track expenses, monitor income, view portfolio performance, and control your budget in real-time.',
      url: 'https://moneymanager-jade.vercel.app/dashboard'
    });
    this.loadCustomBalance();
    this.loadTransactions();
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
      .filter(t => t.type === 'income' || (t.type === 'Borrowed' && t.category === 'Lent Money'))
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'expense' || (t.type === 'Borrowed' && t.category === 'Borrowed Money'))
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalBorrowed = this.transactions
      .filter(t => t.type === 'Borrowed')
      .reduce((sum, t) => sum + t.amount, 0);

    // Load portfolio value
    this.loadPortfolioValue();

    // Total balance = income + portfolio - expenses
    this.totalBalance = this.totalIncome + this.portfolioValue - this.totalExpense;
    this.balance = this.totalBalance;

    // Update chart data with new object reference
    this.chartData = {
      ...this.chartData,
      datasets: [{
        ...this.chartData.datasets[0],
        data: [this.totalIncome, this.totalExpense, Math.abs(this.totalBalance)]
      }]
    };
  }

  deleteTransaction(id: string): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.toastService.show('Transaction deleted successfully!');
          this.loadTransactions();
        },
        error: (err) => {
          console.error('Error deleting transaction:', err);
          this.toastService.show('Failed to delete transaction');
        }
      });
    }
  }

  openExpensesModal(): void {
    const expenseTransactions = this.transactions.filter(t => t.type === 'expense' || (t.type === 'Borrowed' && t.category === 'Borrowed Money'));
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
    const incomeTransactions = this.transactions.filter(t => t.type === 'income' || (t.type === 'Borrowed' && t.category === 'Lent Money'));
    this.dialog.open(IncomeModalComponent, {
      data: { incomes: incomeTransactions },
      width: '95%',
      maxWidth: '600px',
      maxHeight: '85vh',
      panelClass: 'custom-dialog-container',
      position: { top: '50px' }
    });
  }

  openBorrowingModal(): void {
    const borrowingTransactions = this.transactions.filter(t => t.type === 'Borrowed');
    this.dialog.open(BorrowingModalComponent, {
      data: { borrowings: borrowingTransactions },
      width: '95%',
      maxWidth: '800px',
      maxHeight: '85vh',
      panelClass: 'custom-dialog-container',
      position: { top: '50px' }
    });
  }

  openPdfExportModal(): void {
    if (this.transactions.length === 0) {
      this.toastService.show('No transactions to export');
      return;
    }
    this.dialog.open(PdfExportModalComponent, {
      width: '95%',
      maxWidth: '500px',
      panelClass: 'custom-dialog-container'
    });
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  loadPortfolioValue(): void {
    this.portfolioService.getPortfolioItems().subscribe({
      next: (portfolioItems) => {
        this.portfolioValue = portfolioItems.reduce((sum, item) =>
          sum + (item.currentPrice * item.quantity), 0);
        // Recalculate total balance after getting portfolio value
        this.totalBalance = this.totalIncome + this.portfolioValue - this.totalExpense;
        this.balance = this.totalBalance;
        // Update chart data
        this.chartData = {
          ...this.chartData,
          datasets: [{
            ...this.chartData.datasets[0],
            data: [this.totalIncome, this.totalExpense, Math.abs(this.totalBalance)]
          }]
        };
      },
      error: (err) => console.error('Error loading portfolio:', err)
    });
  }

  openAddPortfolioModal(): void {
    this.router.navigate(['/portfolio']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}