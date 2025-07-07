import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { RegistrarPlantacionComponent } from './registrar-plantacion/registrar-plantacion';
import { ListarPlantacionesComponent } from './listar-plantaciones/listar-plantaciones';
import { SignupComponent } from './signup/signup';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registrar-plantacion', component: RegistrarPlantacionComponent },
    { path: 'listar-plantaciones', component: ListarPlantacionesComponent },
    { path: 'signup', component: SignupComponent }
];
