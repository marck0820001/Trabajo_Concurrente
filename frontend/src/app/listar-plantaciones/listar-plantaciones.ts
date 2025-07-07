import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlantacionService, Plantacion } from '../services/plantacion/plantacion';
import { MaterialModule } from '../material.module';
import { PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-plantaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MaterialModule, RouterModule],
  templateUrl: './listar-plantaciones.html'
})
export class ListarPlantacionesComponent implements OnInit {
  plantaciones: Plantacion[] = [];
  paginadas: Plantacion[] = [];
  pageSize = 4;
  currentPage = 0;

  constructor(private plantacionService: PlantacionService) {}

  ngOnInit() {
    this.plantacionService.listar().subscribe({
      next: (data) => {
        this.plantaciones = data;
        this.actualizarPaginadas();
      },
      error: () => alert('Error al listar plantaciones')
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.actualizarPaginadas();
  }

  actualizarPaginadas() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginadas = this.plantaciones.slice(startIndex, endIndex);
  }
}
