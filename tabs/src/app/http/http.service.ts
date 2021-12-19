import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'http://localhost:3000/developers';

  getDevelopers() {
    return this.http.get<any>(this.baseUrl);
  }
  deleteDeveloper(id){
    const url = `${this.baseUrl}/${id}`
    console.warn(id)
    return this.http.delete<any>(url)
  }
  onUpsertDevelopers(developer){
    console.warn(developer)
    if(!developer.id){
      return this.http.post<any>(this.baseUrl, {
        name: developer.name,
        position: developer.position,
        startWork: developer.startWork,
        level: developer.level
      });
    } else {
      return this.http.put<any>(this.baseUrl, {
        id: developer.id,
        name: developer.name,
        position: developer.position,
        startWork: developer.startWork,
        level: developer.level
      })
    }
  }
  constructor(private http: HttpClient) { }
}