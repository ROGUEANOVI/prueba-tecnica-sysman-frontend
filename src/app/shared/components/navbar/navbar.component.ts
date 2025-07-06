import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.isLoggedIn();
    this.getUserEmail();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserEmail(): string | null {
    return this.authService.getUserEmail();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
