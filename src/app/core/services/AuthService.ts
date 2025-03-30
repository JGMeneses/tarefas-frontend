// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
// import { environment } from '../../../environments/environment'; // Descomente se usar

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://localhost:8080/api/auth`; // Ajuste para usar environment, se necessário

  constructor(private http: HttpClient) {}

  // Função de login
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token);
        }
      }),
      catchError(error => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error('Falha no login.'));
      })
    );
  }

  // Função de registro
  register(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/register`, credentials).pipe(
      catchError(error => {
        console.error('Erro ao registrar:', error);
        return throwError(() => new Error('Falha no registro.'));
      })
    );
  }

  // Função para verificar autenticação
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Função para obter o token (evita erro no SSR)
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  // Função para armazenar o token (evita erro no SSR)
  storeToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
    }
  }

  // Função para remover o token (logout)
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
    }
  }
}
