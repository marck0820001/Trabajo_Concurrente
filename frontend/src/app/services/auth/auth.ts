import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post(`${this.api}/login`, { email, password }, { responseType: 'text' });
  }

  signup(email: string, password: string): Observable<string> {
    return this.http.post(`${this.api}/signup`, { email, password }, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuario');
  }
}
