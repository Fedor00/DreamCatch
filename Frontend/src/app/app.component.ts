import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DreamCatch';
  isLoggedIn = false;

  constructor(
    private cookie: CookieService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.router.navigate(['/chart']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.cookie.check('user');
    this.authService.updateLoginStatus(this.isLoggedIn);
  }

  logout() {
    this.cookie.delete('user');
    this.authService.updateLoginStatus(false);
  }

  login() {
    this.checkLoginStatus();
  }
}
