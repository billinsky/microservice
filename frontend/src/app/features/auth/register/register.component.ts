import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <form (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        <input [(ngModel)]="user.nom" name="nom" placeholder="Nom" required>
        <input [(ngModel)]="user.prenom" name="prenom" placeholder="Prenom" required>
        <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="user.password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
        <a routerLink="/login">Back to Login</a>
      </form>
    </div>
  `,
  styles: [`
    .login-page { display: flex; justify-content: center; align-items: center; height: 100vh; }
    form { display: flex; flex-direction: column; gap: 10px; width: 300px; padding: 20px; border: 1px solid #ccc; }
  `]
})
export class RegisterComponent {
  user = { nom: '', prenom: '', email: '', password: '' };
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8080/auth/register', this.user, { responseType: 'text' }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
