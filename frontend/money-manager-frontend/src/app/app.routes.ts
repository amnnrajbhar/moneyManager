import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { AddTransactionComponent } from './components/add-transaction.component';
import { AdvancedChartComponent } from './components/advanced-chart.component';
import { PortfolioComponent } from './components/portfolio.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'add-transaction', component: AddTransactionComponent, canActivate: [authGuard] },
  { path: 'advanced-chart', component: AdvancedChartComponent, canActivate: [authGuard] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [authGuard] }
];