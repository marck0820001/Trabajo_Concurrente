import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  usuario = localStorage.getItem('usuario') || 'Invitado';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
