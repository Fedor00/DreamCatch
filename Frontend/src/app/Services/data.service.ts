import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../Data/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data$ = new BehaviorSubject<User|null>(null);
  selectedData$ = this.data$.asObservable();
  constructor() {}

  setData(user: User) {
    this.data$.next(user);
  }
} 

