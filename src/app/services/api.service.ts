import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiPrefix = '/api';

  constructor(
    private httpClient: HttpClient,
    private location: Location
  ) {
  }

  private http: HttpClient = new Proxy(this.httpClient, {
    get: (httpClient, method) => {
      return (url, ...args): Observable<Object> => {
        const preparedUrl = this.location.prepareExternalUrl(`${this.apiPrefix}${url}`);

        return httpClient[method](preparedUrl, ...args);
      };
    }
  });

  getAll(): Observable<Object> {
    return this.http.get(`/all`);
  }
}
