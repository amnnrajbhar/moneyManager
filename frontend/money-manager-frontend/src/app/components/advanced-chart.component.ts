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
          <div class="flex items-center justify-between h-16">
            <button
              routerLink="/dashboard"
              class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="font-medium">Back</span>
            </button>
            
            <div class="absolute left-1/2 transform -translate-x-1/2">
              <small class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Advanced Analytics
              </small>
            </div>
            
            <div class="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="fas fa-chart-line text-white text-xs"></i>
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

          <!-- Spending Pattern -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Smart Insights</h3>
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Analysis</span>
              </div>
            </div>
            
            <!-- Key Metrics Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-blue-600 font-medium">AVG DAILY SPEND</p>
                    <p class="text-lg font-bold text-blue-900"><i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatIndianCurrency(avgDailySpend) }}</p>
                  </div>
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-purple-600 font-medium">TOP CATEGORY</p>
                    <p class="text-lg font-bold text-purple-900">{{ topCategory }}</p>
                  </div>
                  <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs text-green-600 font-medium">SAVINGS RATE</p>
                    <p class="text-lg font-bold text-green-900">{{ savingsRate }}%</p>
                  </div>
                  <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Interactive Spending Heatmap -->
            <div class="bg-gray-50 rounded-xl p-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Weekly Spending Pattern</h4>
              <div class="grid grid-cols-7 gap-2">
                <div *ngFor="let day of weeklyPattern; let i = index" 
                     class="relative group cursor-pointer">
                  <div class="text-xs text-center text-gray-500 mb-1">{{ getDayName(i) }}</div>
                  <div class="h-12 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                       [style.background-color]="getHeatmapColor(day.amount)"
                       [title]="'₹' + formatIndianCurrency(day.amount)">
                    <span class="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <i class="fas fa-indian-rupee-sign"></i>{{ formatIndianCurrency(day.amount) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Less</span>
                <div class="flex space-x-1">
                  <div class="w-3 h-3 bg-blue-100 rounded"></div>
                  <div class="w-3 h-3 bg-blue-300 rounded"></div>
                  <div class="w-3 h-3 bg-blue-500 rounded"></div>
                  <div class="w-3 h-3 bg-blue-700 rounded"></div>
                </div>
                <span>More</span>
              </div>
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
  avgDailySpend = 0;
  topCategory = 'N/A';
  savingsRate = 0;
  weeklyPattern: { day: number; amount: number }[] = [];
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
    
    // Calculate smart insights
    const expenseTransactions = this.transactions.filter(t => t.type === 'expense');
    const days = expenseTransactions.length > 0 ? 
      Math.max(1, Math.ceil((Date.now() - new Date(expenseTransactions[0].date).getTime()) / (1000 * 60 * 60 * 24))) : 1;
    this.avgDailySpend = this.totalExpense / days;
    
    // Find top category
    const categoryTotals = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
    this.topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, 'N/A');
    
    // Calculate savings rate
    this.savingsRate = this.totalIncome > 0 ? Math.round((this.netBalance / this.totalIncome) * 100) : 0;
    
    // Calculate weekly pattern
    this.weeklyPattern = Array.from({ length: 7 }, (_, i) => {
      const dayExpenses = expenseTransactions
        .filter(t => new Date(t.date).getDay() === i)
        .reduce((sum, t) => sum + t.amount, 0);
      return { day: i, amount: dayExpenses };
    });
  }

  updateCharts(): void {
    // Update Income vs Expense chart
    this.incomeExpenseData = {
      ...this.incomeExpenseData,
      datasets: [{
        ...this.incomeExpenseData.datasets[0],
        data: [this.totalIncome, this.totalExpense]
      }]
    };

    // Update Category chart
    const expenseCategories = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    this.categoryData = {
      ...this.categoryData,
      labels: Object.keys(expenseCategories),
      datasets: [{
        ...this.categoryData.datasets[0],
        data: Object.values(expenseCategories)
      }]
    };

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

    this.monthlyTrendData = {
      ...this.monthlyTrendData,
      labels: sortedMonths,
      datasets: [
        {
          ...this.monthlyTrendData.datasets[0],
          data: sortedMonths.map(month => monthlyData[month].income)
        },
        {
          ...this.monthlyTrendData.datasets[1],
          data: sortedMonths.map(month => monthlyData[month].expense)
        }
      ]
    };
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }

  getDayName(dayIndex: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dayIndex];
  }

  getHeatmapColor(amount: number): string {
    const maxAmount = Math.max(...this.weeklyPattern.map(d => d.amount));
    if (maxAmount === 0) return '#e5e7eb';
    
    const intensity = amount / maxAmount;
    if (intensity === 0) return '#e5e7eb';
    if (intensity <= 0.25) return '#dbeafe';
    if (intensity <= 0.5) return '#93c5fd';
    if (intensity <= 0.75) return '#3b82f6';
    return '#1d4ed8';
  }
}