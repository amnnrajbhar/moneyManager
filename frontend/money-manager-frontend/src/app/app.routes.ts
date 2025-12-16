import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { AddTransactionComponent } from './components/add-transaction.component';
import { SalarySetupComponent } from './components/salary-setup.component';
import { AdvancedChartComponent } from './components/advanced-chart.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'salary-setup', component: SalarySetupComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-transaction', component: AddTransactionComponent, canActivate: [AuthGuard] },
  { path: 'advanced-chart', component: AdvancedChartComponent, canActivate: [AuthGuard] }
];
