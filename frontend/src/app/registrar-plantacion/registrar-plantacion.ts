import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { PlantacionService, Plantacion } from '../services/plantacion/plantacion';
import { MaterialModule } from '../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-plantacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './registrar-plantacion.html',
  styleUrls: ['./registrar-plantacion.css']
})
export class RegistrarPlantacionComponent {
  plantacion: Plantacion = {
    departamento: '',
    finalidad: '',
    especie: '',
    superficie: 0,
    regimen_tenencia: ''
  };

  constructor(
    private plantacionService: PlantacionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  registrar() {
    this.plantacionService.registrar(this.plantacion).subscribe({
      next: () => {
        this.snackBar.open('✅ Plantación registrada con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.snackBar.open('❌ Error al registrar la plantación', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
