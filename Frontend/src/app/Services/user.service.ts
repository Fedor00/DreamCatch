import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { User } from '../Data/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: string;
  public password: string;
  public hostUrl:string='http://localhost:8080/user';
  constructor(private http:HttpClient) {

  }
  public addUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.hostUrl}/register`, user);
  }
  public login(email:string,password:string):Observable<User>{
    const user:User={
      id: 0, username: "", email: email, password: password,
      entries: undefined
    };
    return this.http.post<User>(`${this.hostUrl}/login`, user);
  }
  
 
}
