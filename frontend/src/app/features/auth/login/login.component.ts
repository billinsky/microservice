import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <form (ngSubmit)="onSubmit()">
        <h2>Login</h2>
        <input type="email" [(ngModel)]="credentials.email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="credentials.password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <div *ngIf="error" class="error">{{error}}</div>
      </form>
    </div>
  `,
  styles: [`
    .login-page { display: flex; justify-content: center; align-items: center; height: 100vh; }
    form { display: flex; flex-direction: column; gap: 10px; width: 300px; padding: 20px; border: 1px solid #ccc; }
    .error { color: red; }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
