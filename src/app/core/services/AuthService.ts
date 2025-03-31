import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
        }
      }),
      catchError(error => throwError(() => new Error('Falha no login.')))
    );
  }

  register(username: string, password: string, cargo?: string): Observable<any> {
    const credentials = { username, password, cargo };
    return this.http.post<any>(`${this.apiUrl}/auth/register`, credentials).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Falha no registro.')))
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  }

  storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
    }
  }
}
