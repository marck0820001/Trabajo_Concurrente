import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Registro de Usuario</h2>
    <form (ngSubmit)="signup()">
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Contraseña" required>
      <button type="submit">Registrarse</button>
    </form>
    <p>
      ¿Ya tienes cuenta? <a (click)="goToLogin()" style="cursor:pointer; color:blue">Iniciar sesión</a>
    </p>
  `
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  signup() {
    this.http.post('http://localhost:8080/signup', {
      email: this.email,
      password: this.password
    }, { responseType: 'text' }).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('El usuario ya existe');
        } else {
          alert('Error al registrar');
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
