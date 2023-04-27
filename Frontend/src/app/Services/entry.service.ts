import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Data/Category';
import { Entry ,UserAndCategories} from '../Data/Entry';
import { User } from '../Data/User';
import { ChartData, ChartDataOptions } from '../Data/ChartDataOptions';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  public hostUrl:string='http://localhost:8080/entry';
  constructor(private http:HttpClient) {

  }
  public addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${this.hostUrl}/add`, entry);
  }
  public findAllByCategories(user:User,categories:Category[]): Observable<Entry[]> {
    const g:UserAndCategories={user,categories};
    return this.http.post<Entry[]>(`${this.hostUrl}/all/categories`,g);
  }
  public findAllEntries(user: User): Observable<Entry[]> {
    return this.http.post<Entry[]>(`${this.hostUrl}/all`,user);
  }
  public updateEntry(entry: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.hostUrl}/update`, entry);
  }
  public deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.hostUrl}/delete/${id}`);
  }
  public getChartData(chartOptions:ChartDataOptions): Observable<ChartData>{
    return this.http.post<ChartData>(`${this.hostUrl}/chart-data`,chartOptions);
  }

}
