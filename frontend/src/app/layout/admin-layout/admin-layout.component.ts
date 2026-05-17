import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-container">
      <aside class="sidebar">
        <h2>Admin</h2>
        <nav>
          <a routerLink="/clients" routerLinkActive="active">Clients</a>
          <a routerLink="/orders" routerLinkActive="active">Orders</a>
          <button (click)="logout()">Logout</button>
        </nav>
      </aside>
      <main class="content">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-container { display: flex; height: 100vh; }
    .sidebar { width: 250px; background: #333; color: white; padding: 20px; }
    .sidebar nav { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
    .sidebar a { color: white; text-decoration: none; padding: 10px; }
    .sidebar a.active { background: #555; }
    .content { flex: 1; display: flex; flex-direction: column; }
    header { padding: 20px; border-bottom: 1px solid #ddd; }
    .main-content { padding: 20px; overflow-y: auto; }
  `]
})
export class AdminLayoutComponent {
  constructor(private authService: AuthService) {}
  logout() { this.authService.logout(); }
}
