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
      <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <i class="fas fa-indian-rupee-sign text-white"></i>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Money Manager</span>
            </div>
            <div class="flex space-x-4">
              <a routerLink="/login" class="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">Login</a>
              <a routerLink="/register" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Get Started</a>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Hero Section -->
        <section class="text-center mb-20">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Money Manager - Track Expenses & Manage Personal Finance</h1>
          <h2 class="text-2xl text-gray-700 mb-8">Your Complete Budget Tracker and Expense Management Solution</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Take control of your finances with our powerful money manager app. Track expenses, manage income, 
            build your investment portfolio, and monitor borrowings all in one place.
          </p>
          <div class="flex justify-center space-x-4">
            <a routerLink="/register" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all">
              Start Managing Money Free
            </a>
            <a routerLink="/login" class="px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-all">
              Sign In
            </a>
          </div>
        </section>

        <!-- Features Section -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Complete Personal Finance Manager</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-chart-line text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Track Expenses</h3>
              <p class="text-gray-600">Monitor every expense with our intuitive expense tracker. Categorize spending and identify where your money goes.</p>
            </div>
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-wallet text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Manage Money</h3>
              <p class="text-gray-600">Complete budget tracker to manage income, expenses, and savings. Make smarter financial decisions.</p>
            </div>
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-chart-pie text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Investment Portfolio</h3>
              <p class="text-gray-600">Track your investment portfolio with real-time profit/loss calculations and visual analytics.</p>
            </div>
          </div>
        </section>

        <!-- Benefits Section -->
        <section class="bg-white rounded-3xl p-12 shadow-xl mb-20">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Money Manager App?</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="flex items-start space-x-4">
              <i class="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Smart Expense Tracking</h3>
                <p class="text-gray-600">Automatically categorize and track expenses with our intelligent budget tracker system.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <i class="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Real-Time Analytics</h3>
                <p class="text-gray-600">Visualize your financial data with interactive charts and comprehensive reports.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <i class="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p class="text-gray-600">Your financial data is encrypted and completely private. Manage money with confidence.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <i class="fas fa-check-circle text-green-500 text-2xl mt-1"></i>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Multi-Device Access</h3>
                <p class="text-gray-600">Access your personal finance manager from any device, anywhere, anytime.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white">
          <h2 class="text-4xl font-bold mb-6">Start Managing Your Personal Finance Today</h2>
          <p class="text-xl mb-8 opacity-90">Join thousands using our money manager app to track expenses and build wealth</p>
          <a routerLink="/register" class="inline-block px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:shadow-2xl transition-all">
            Create Free Account
          </a>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p class="text-gray-600">© 2024 Money Manager - Best Expense Tracker & Budget Tracker App</p>
          <p class="text-sm text-gray-500 mt-2">Track expenses • Manage money • Build wealth</p>
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
