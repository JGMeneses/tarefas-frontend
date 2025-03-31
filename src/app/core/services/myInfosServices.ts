import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../core/services/AuthService';
import { User } from '../../shared/models/user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyInfoServices {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  currentUser(): Observable<User> {
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error('Token de autenticação não encontrado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/auth/me`, { headers })
      .pipe(
        catchError(error => throwError(() => error))
      );
  }
}