import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isLoggedIn(); // implementa esta lógica en el servicio
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
