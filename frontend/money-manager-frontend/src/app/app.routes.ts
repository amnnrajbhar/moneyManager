import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { 
    path: 'add-transaction', 
    loadComponent: () => import('./components/add-transaction.component').then(m => m.AddTransactionComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'advanced-chart', 
    loadComponent: () => import('./components/advanced-chart.component').then(m => m.AdvancedChartComponent),
    canActivate: [authGuard] 
  },
  { 
    path: 'portfolio', 
    loadComponent: () => import('./components/portfolio.component').then(m => m.PortfolioComponent),
    canActivate: [authGuard] 
  }
];