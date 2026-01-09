import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartConfiguration, registerables } from 'chart.js';
import { AddPortfolioModalComponent } from './add-portfolio-modal.component';
import { PortfolioService, Portfolio } from '../services/portfolio.service';
import { ToastService } from '../services/toast.service';

Chart.register(...registerables);

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Responsive Navigation -->
      <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div class="flex items-center justify-between h-14 sm:h-16">
            <button
              routerLink="/dashboard"
              class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="font-medium text-sm sm:text-base">Back</span>
            </button>
            
            <div class="absolute left-1/2 transform -translate-x-1/2">
              <small class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Portfolio
</small>
            </div>
            
            <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <i class="fas fa-chart-pie text-white text-xs"></i>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content - Responsive Container -->
      <div class="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
        <!-- Portfolio Summary - Responsive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <!-- Total Investment Card -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Investment</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 truncate">
                  <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(totalInvestment) }}
                </p>
              </div>
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <i class="fas fa-coins text-white text-sm sm:text-lg"></i>
              </div>
            </div>
          </div>

          <!-- Current Value Card -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">Current Value</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
                  <i class="fas fa-indian-rupee-sign mr-1 sm:mr-2"></i>{{ formatIndianCurrency(currentValue) }}
                </p>
              </div>
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ml-3">
                <i class="fas fa-chart-line text-white text-sm sm:text-lg"></i>
              </div>
            </div>
          </div>

          <!-- P&L Card -->
          <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-600 mb-1">P&L</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold truncate" [class]="profitLoss >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ profitLoss >= 0 ? '+' : '' }}<i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatIndianCurrency(Math.abs(profitLoss)) }}
                </p>
              </div>
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ml-3" [class]="profitLoss >= 0 ? 'bg-green-500' : 'bg-red-500'">
                <i class="fas text-white text-sm sm:text-lg" [class]="profitLoss >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Portfolio Chart - Responsive -->
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
          <div class="h-48 sm:h-56 lg:h-64">
            <canvas baseChart
              [data]="portfolioChartData"
              [type]="'doughnut'"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <!-- Add Portfolio Button - Responsive -->
        <div class="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
          <button
            (click)="openAddPortfolioModal()"
            class="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2 sm:space-x-3"
          >
            <i class="fas fa-plus group-hover:rotate-90 transition-transform duration-300 text-sm sm:text-base"></i>
            <span class="text-sm sm:text-base">Add Investment</span>
          </button>
        </div>

        <!-- Portfolio List - Responsive -->
        <div class="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl overflow-hidden">
          <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200/50">
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">My Investments</h3>
          </div>
          
          <!-- Investment Items - Responsive List -->
          <div class="divide-y divide-gray-200/50">
            <div *ngFor="let item of portfolioItems" class="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" [class]="getTypeColor(item.type)">
                    <i class="fas text-white text-sm sm:text-base" [class]="getTypeIcon(item.type)"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm sm:text-base font-semibold text-gray-900 truncate">{{ item.name }}</h4>
                    <p class="text-xs sm:text-sm text-gray-500">{{ item.type | titlecase }} • {{ item.quantity }} units</p>
                    <p class="text-xs text-gray-500">{{ item.date | date:'MMM dd, yyyy' }}</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 ml-3">
                  <div class="text-sm sm:text-lg font-bold" [class]="(item.currentPrice * item.quantity - item.buyPrice * item.quantity) >= 0 ? 'text-green-600' : 'text-red-600'">
                    <i class="fas fa-indian-rupee-sign mr-1"></i>{{ formatIndianCurrency(item.currentPrice * item.quantity) }}
                  </div>
                  <div class="text-xs sm:text-sm" [class]="(item.currentPrice * item.quantity - item.buyPrice * item.quantity) >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ (item.currentPrice * item.quantity - item.buyPrice * item.quantity) >= 0 ? '+' : '' }}{{ formatIndianCurrency(Math.abs(item.currentPrice * item.quantity - item.buyPrice * item.quantity)) }}
                  </div>
                  <button
                    (click)="deletePortfolioItem(item._id!)"
                    class="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State - Responsive -->
          <div *ngIf="portfolioItems.length === 0" class="px-4 sm:px-6 py-8 sm:py-12 text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-chart-pie text-gray-400 text-lg sm:text-2xl"></i>
            </div>
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
            <p class="text-sm text-gray-500 mb-3 sm:mb-4">Start building your portfolio by adding your first investment!</p>
            <button
              (click)="openAddPortfolioModal()"
              class="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Investment
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PortfolioComponent implements OnInit {
  portfolioItems: Portfolio[] = [];
  totalInvestment = 0;
  currentValue = 0;
  profitLoss = 0;
  Math = Math;

  portfolioChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      borderWidth: 0
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private portfolioService: PortfolioService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPortfolio();
  }

  loadPortfolio(): void {
    this.portfolioService.getPortfolioItems().subscribe({
      next: (items) => {
        this.portfolioItems = items;
        this.calculateTotals();
        this.updateChart();
      },
      error: (err) => console.error('Error loading portfolio:', err)
    });
  }

  calculateTotals(): void {
    this.totalInvestment = this.portfolioItems.reduce((sum, item) => sum + (item.buyPrice * item.quantity), 0);
    this.currentValue = this.portfolioItems.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    this.profitLoss = this.currentValue - this.totalInvestment;
  }

  updateChart(): void {
    const typeData = this.portfolioItems.reduce((acc, item) => {
      const value = item.currentPrice * item.quantity;
      acc[item.type] = (acc[item.type] || 0) + value;
      return acc;
    }, {} as Record<string, number>);

    this.portfolioChartData = {
      ...this.portfolioChartData,
      labels: Object.keys(typeData).map(type => type.replace('_', ' ').toUpperCase()),
      datasets: [{
        ...this.portfolioChartData.datasets[0],
        data: Object.values(typeData)
      }]
    };
  }

  openAddPortfolioModal(): void {
    const dialogRef = this.dialog.open(AddPortfolioModalComponent, {
      width: '95%',
      maxWidth: '500px',
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPortfolioItem(result);
      }
    });
  }

  addPortfolioItem(item: Portfolio): void {
    this.portfolioService.addPortfolioItem(item).subscribe({
      next: (newItem) => {
        this.portfolioItems.push(newItem);
        this.calculateTotals();
        this.updateChart();
        this.toastService.show('Investment added successfully!');
      },
      error: (err) => {
        console.error('Error adding portfolio item:', err);
        this.toastService.show('Failed to add investment');
      }
    });
  }

  getTypeColor(type: string): string {
    const colors = {
      stocks: 'bg-blue-500',
      mutual_funds: 'bg-green-500',
      bonds: 'bg-yellow-500',
      crypto: 'bg-purple-500',
      other: 'bg-gray-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  }

  getTypeIcon(type: string): string {
    const icons = {
      stocks: 'fa-chart-line',
      mutual_funds: 'fa-piggy-bank',
      bonds: 'fa-certificate',
      crypto: 'fa-bitcoin',
      other: 'fa-coins'
    };
    return icons[type as keyof typeof icons] || 'fa-coins';
  }

  deletePortfolioItem(id: string): void {
    if (confirm('Are you sure you want to delete this investment?')) {
      this.portfolioService.deletePortfolioItem(id).subscribe({
        next: () => {
          this.portfolioItems = this.portfolioItems.filter(item => item._id !== id);
          this.calculateTotals();
          this.updateChart();
          this.toastService.show('Investment deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting portfolio item:', err);
          this.toastService.show('Failed to delete investment');
        }
      });
    }
  }

  formatIndianCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }
}