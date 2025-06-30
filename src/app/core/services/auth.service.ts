import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { type RegisterRequest } from '../models/auth/register-request.model';
import { type LoginRequest } from '../models/auth/login-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/register`, registerRequest);
  }

  login(request: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, request)
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        })
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
