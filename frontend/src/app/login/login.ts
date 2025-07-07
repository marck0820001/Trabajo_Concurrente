import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (localStorage.getItem('usuario')) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        localStorage.setItem('usuario', this.email);
        this.snackBar.open('✅ Bienvenido de nuevo', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.snackBar.open('❌ Credenciales incorrectas', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
