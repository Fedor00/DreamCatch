import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Data/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private  userService:UserService,private router:Router){}
  public onAddUser(): void {
    const { username, email, password } = this.form;
    const user:User={
      id: 0, username: username, email: email, password: password,
      entries: undefined
    };
    
    this.userService.addUser(user).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log("yes");
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(this.errorMessage);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
