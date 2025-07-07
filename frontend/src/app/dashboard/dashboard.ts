import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard</h2>
    <button (click)="goTo('registrar')">Registrar Plantación</button>
    <button (click)="goTo('listar')">Listar Plantaciones</button>
  `
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }
}
