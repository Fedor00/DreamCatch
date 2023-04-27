import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Data/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public hostUrl:string='http://localhost:8080/category';
  constructor(private http:HttpClient) {

  }
  public addCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.hostUrl}/add`, category);
  }

  public findAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.hostUrl}/all`);
  }

}
