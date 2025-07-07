import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listar-plantaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Listado de Plantaciones</h2>
    <ul *ngIf="plantaciones.length > 0; else sinDatos">
      <li *ngFor="let p of plantaciones">
        {{ p.departamento }} - {{ p.finalidad }} - {{ p.especie }} - {{ p.superficie }}ha - {{ p.regimen_tenencia }}
      </li>
    </ul>
    <ng-template #sinDatos>
      <p>No hay plantaciones registradas.</p>
    </ng-template>
  `
})
export class ListarPlantacionesComponent implements OnInit {
  plantaciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/plantaciones').subscribe({
      next: (data) => this.plantaciones = data,
      error: () => alert('Error al listar plantaciones')
    });
  }
}
