import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MaterialModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  signup() {
    this.auth.signup(this.email, this.password).subscribe({
      next: () => {
        this.snackBar.open('✅ Registro exitoso', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'start',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open('⚠️ El usuario ya existe', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'start',
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('❌ Error al registrar', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'start',
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
