import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-plantacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Registrar Plantación</h2>
    <form (ngSubmit)="registrar()">
      <input [(ngModel)]="plantacion.departamento" name="departamento" placeholder="Departamento" required>
      <input [(ngModel)]="plantacion.finalidad" name="finalidad" placeholder="Finalidad" required>
      <input [(ngModel)]="plantacion.especie" name="especie" placeholder="Especie" required>
      <input [(ngModel)]="plantacion.superficie" name="superficie" type="number" placeholder="Superficie (ha)" required>
      <input [(ngModel)]="plantacion.regimen_tenencia" name="regimen_tenencia" placeholder="Régimen Tenencia" required>
      <button type="submit">Registrar</button>
    </form>
  `
})
export class RegistrarPlantacionComponent {
  plantacion = {
    departamento: '',
    finalidad: '',
    especie: '',
    superficie: 0,
    regimen_tenencia: ''
  };

  constructor(private http: HttpClient) {}

  registrar() {
    this.http.post('http://localhost:8080/plantaciones', this.plantacion, { responseType: 'text' }).subscribe({
      next: () => alert('Registro en proceso'),
      error: () => alert('Error al registrar')
    });
  }
}
