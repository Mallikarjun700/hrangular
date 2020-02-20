import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurdcommonserviceService {

  constructor(private http: HttpClient) { }

  get(url: any, params?: any): Observable<any> {
    return this.http.get<any>(environment.apiUrl + url, params);
      // .pipe(map(data => {
      //   return data;
      // }));
  }
  post(url: any, params?: any) {
    return this.http.post<any>(environment.apiUrl + url, params);
      // .pipe(map(data => {
      //   return data;
      // }));
  }
}
