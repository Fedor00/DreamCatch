import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Data/User';
import { DataService } from '../Services/data.service';
import { UserService } from '../Services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  constructor(private userService: UserService,private router:Router
              ,private cookie: CookieService,private authService:AuthService){}
  ngOnInit(): void {
    if(this.cookie.get("user"))
      this.router.navigate(['/dreams']);
  }
  onSubmit(): void {
    const { username, password } = this.form;
   
    this.login(username,password);
  }
  login(username:string,password:string):void{
    this.userService.login(username,password).subscribe({
      next: data => {
        this.router.navigate(['/chart']);
        this.isLoggedIn=true;
        data.entries=[];
        this.cookie.set('user',JSON.stringify(data));
        this.authService.updateLoginStatus(true);
      },
      error: err => {
       this.errorMessage = err.error.message;
       this.isLoginFailed = true;
      }
    });
  }
}
