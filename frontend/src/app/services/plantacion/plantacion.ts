import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plantacion {
  departamento: string;
  finalidad: string;
  especie: string;
  superficie: number;
  regimen_tenencia: string;
}

@Injectable({ providedIn: 'root' })
export class PlantacionService {
  private api = 'http://localhost:8080/plantaciones';

  constructor(private http: HttpClient) {}

  registrar(plantacion: Plantacion): Observable<string> {
    return this.http.post(this.api, plantacion, { responseType: 'text' });
  }

  listar(): Observable<Plantacion[]> {
    return this.http.get<Plantacion[]>(this.api);
  }
}
