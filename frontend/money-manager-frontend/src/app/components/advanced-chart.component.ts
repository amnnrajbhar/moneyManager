import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { TransactionService, Transaction } from '../services/transaction.service';

Chart.register(...registerables);

@Component({
  selector: 'app-advanced-chart',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Navigation -->
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
                <span class="text-white font-bold text-sm">📊</span>
              </div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced Analytics
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">Total Income</p>
                <p class="text-2xl font-bold text-green-600">₹{{ formatIndianCurrency(totalIncome) }}</p>
              </div>
              <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">Total Expenses</p>
                <p class="text-2xl font-bold text-red-600">₹{{ formatIndianCurrency(totalExpense) }}</p>
              </div>
              <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">Net Balance</p>
                <p class="text-2xl font-bold" [class]="netBalance >= 0 ? 'text-green-600' : 'text-red-600'">
                  ₹{{ formatIndianCurrency(Math.abs(netBalance)) }}
                </p>
              </div>
              <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Income vs Expense Chart -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h3>
            <div class="h-64">
              <canvas baseChart
                [data]="incomeExpenseData"
                [type]="'doughnut'"
                [options]="doughnutOptions">
              </canvas>
            </div>
          </div>

          <!-- Category Breakdown -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
            <div class="h-64">
              <canvas baseChart
                [data]="categoryData"
                [type]="'pie'"
                [options]="pieOptions">
              </canvas>
            </div>
          </div>

          <!-- Monthly Trend -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 lg:col-span-2">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Trend</h3>
            <div class="h-80">
              <canvas baseChart
                [data]="monthlyTrendData"
                [type]="'line'"
                [options]="lineOptions">
              </canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdvancedChartComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpense = 0;
  netBalance = 0;
  Math = Math;

  incomeExpenseData: ChartData<'doughnut'> = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#10B981', '#EF4444'],
      borderWidth: 0
    }]
  };

  categoryData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#EF4444', '#F97316', '#F59E0B', '#EAB308',
        '#84CC16', '#22C55E', '#10B981', '#14B8A6',
        '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1'
      ],
      borderWidth: 0
    }]
  };

  monthlyTrendData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  doughnutOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  pieOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  lineOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.calculateTotals();
        this.updateCharts();
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
    
    this.netBalance = this.totalIncome - this.totalExpense;
  }

  updateCharts(): void {
    // Update Income vs Expense chart
    this.incomeExpenseData.datasets[0].data = [this.totalIncome, this.totalExpense];

    // Update Category chart
    const expenseCategories = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    this.categoryData.labels = Object.keys(expenseCategories);
    this.categoryData.datasets[0].data = Object.values(expenseCategories);

    // Update Monthly Trend chart
    const monthlyData = this.transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { income: 0, expense: 0 };
      }
      acc[month][t.type] += t.amount;
      return acc;
    }, {} as Record<string, { income: number; expense: number }>);

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );

    this.monthlyTrendData.labels = sortedMonths;
    this.monthlyTrendData.datasets[0].data = sortedMonths.map(month => monthlyData[month].income);
    this.monthlyTrendData.datasets[1].data = sortedMonths.map(month => monthlyData[month].expense);
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }
}