import { Routes } from '@angular/router';
import { Login } from './views/account/login/login';
import { Employee } from './views/employee/employee';
import { Dashboard } from './views/employee/dashboard/dashboard';
import { Requests } from './views/employee/requests/requests';
import { Tickets } from './views/employee/tickets/tickets';
import { AuditAndAnalytics } from './views/employee/audit-and-analytics/audit-and-analytics';
import { UserManagement } from './views/employee/user-management/user-management';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Employee,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'request', component: Requests },
      { path: 'requests', redirectTo: 'request', pathMatch: 'full' },
      { path: 'tickets', component: Tickets },
      { path: 'audit-and-analytics', component: AuditAndAnalytics },
      { path: 'user-management', component: UserManagement },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
