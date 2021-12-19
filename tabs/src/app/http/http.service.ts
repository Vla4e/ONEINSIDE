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
  constructor(private http: HttpClient) { }
}