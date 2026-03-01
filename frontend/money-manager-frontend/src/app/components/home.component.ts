import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <!-- Hero Section -->
      <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <i class="fas fa-indian-rupee-sign text-white text-sm sm:text-base"></i>
              </div>
              <span class="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Money Manager</span>
            </div>
            <div class="flex space-x-2 sm:space-x-4">
              <a routerLink="/login" class="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium">Login</a>
              <a routerLink="/register" class="px-3 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Get Started</a>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <!-- Hero Section -->
        <section class="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">Money Manager - Track Expenses & Manage Personal Finance</h1>
          <h2 class="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 px-2">Your Complete Budget Tracker and Expense Management Solution</h2>
          <p class="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
            Take control of your finances with our powerful money manager app. Track expenses, manage income, 
            build your investment portfolio, and monitor borrowings all in one place.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <a routerLink="/register" class="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:shadow-2xl transition-all">
              Start Managing Money Free
            </a>
            <a routerLink="/login" class="px-6 py-3 sm:px-8 sm:py-4 border-2 border-blue-600 text-blue-600 text-base sm:text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all">
              Sign In
            </a>
          </div>
        </section>

        <!-- Features Section -->
        <section class="mb-12 sm:mb-16 lg:mb-20">
          <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-4">Complete Personal Finance Manager</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <i class="fas fa-chart-line text-green-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Track Expenses</h3>
              <p class="text-sm sm:text-base text-gray-600">Monitor every expense with our intuitive expense tracker. Categorize spending and identify where your money goes.</p>
            </div>
            <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <i class="fas fa-wallet text-blue-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Manage Money</h3>
              <p class="text-sm sm:text-base text-gray-600">Complete budget tracker to manage income, expenses, and savings. Make smarter financial decisions.</p>
            </div>
            <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <i class="fas fa-chart-pie text-purple-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Investment Portfolio</h3>
              <p class="text-sm sm:text-base text-gray-600">Track your investment portfolio with real-time profit/loss calculations and visual analytics.</p>
            </div>
          </div>
        </section>

        <!-- Benefits Section -->
        <section class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl mb-12 sm:mb-16 lg:mb-20">
          <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Why Choose Our Money Manager App?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div class="flex items-start space-x-3 sm:space-x-4">
              <i class="fas fa-check-circle text-green-500 text-xl sm:text-2xl mt-1 flex-shrink-0"></i>
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Smart Expense Tracking</h3>
                <p class="text-sm sm:text-base text-gray-600">Automatically categorize and track expenses with our intelligent budget tracker system.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 sm:space-x-4">
              <i class="fas fa-check-circle text-green-500 text-xl sm:text-2xl mt-1 flex-shrink-0"></i>
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Real-Time Analytics</h3>
                <p class="text-sm sm:text-base text-gray-600">Visualize your financial data with interactive charts and comprehensive reports.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 sm:space-x-4">
              <i class="fas fa-check-circle text-green-500 text-xl sm:text-2xl mt-1 flex-shrink-0"></i>
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Secure & Private</h3>
                <p class="text-sm sm:text-base text-gray-600">Your financial data is encrypted and completely private. Manage money with confidence.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 sm:space-x-4">
              <i class="fas fa-check-circle text-green-500 text-xl sm:text-2xl mt-1 flex-shrink-0"></i>
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Multi-Device Access</h3>
                <p class="text-sm sm:text-base text-gray-600">Access your personal finance manager from any device, anywhere, anytime.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-white">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2">Start Managing Your Personal Finance Today</h2>
          <p class="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 px-4">Join thousands using our money manager app to track expenses and build wealth</p>
          <a routerLink="/register" class="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-white text-blue-600 text-base sm:text-lg font-bold rounded-xl hover:shadow-2xl transition-all">
            Create Free Account
          </a>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 mt-12 sm:mt-16 lg:mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p class="text-sm sm:text-base text-gray-600">© 2024 Money Manager - Best Expense Tracker & Budget Tracker App</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-2">Track expenses • Manage money • Build wealth</p>
        </div>
      </footer>
    </div>
  `
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Money Manager - Track Expenses & Manage Personal Finance',
      description: 'Free money manager app to track expenses, manage income, build investment portfolio, and control your personal finances. Budget tracker with real-time analytics.',
      keywords: 'money manager app, expense tracker, budget tracker, personal finance manager, track expenses, manage money, income tracker, financial management',
      url: 'https://moneymanager-jade.vercel.app/'
    });
  }
}
