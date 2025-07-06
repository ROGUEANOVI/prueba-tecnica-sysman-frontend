import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { type RegisterRequest } from '../models/auth/register-request.model';
import { type LoginRequest } from '../models/auth/login-request.model';
import { type JwtPayload } from '../models/auth/jwt-payload.model';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/auth/register`,
      registerRequest
    );
  }

  login(request: LoginRequest): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/auth/login`, request)
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

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.sub || null;
    const username = email.split('@')[0] || null;

    return username.toUpperCase();
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }
}
