import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Login o Registro</h2>
    <form (ngSubmit)="login()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
      <button type="submit">Ingresar</button>
    </form>
    <p>
      ¿No tienes cuenta? <a (click)="goToSignup()" style="cursor:pointer; color:blue">Regístrate aquí</a>
    </p>

  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8080/login', {
      email: this.email,
      password: this.password
    }, { responseType: 'text' }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => alert('Credenciales incorrectas')
    });
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
