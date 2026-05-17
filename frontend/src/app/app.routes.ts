import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'clients', loadComponent: () => import('./features/clients/client-list.component').then(m => m.ClientListComponent) },
      { path: 'orders', loadComponent: () => import('./features/orders/order-list.component').then(m => m.OrderListComponent) },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];
