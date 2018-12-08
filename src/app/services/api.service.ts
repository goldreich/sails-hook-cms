import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ToastsService } from './toasts.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiPrefix = '/api';

  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private toastsService: ToastsService
  ) {
  }

  private http: HttpClient = new Proxy(this.httpClient, {
    get: this.httpClientProxyGetter.bind(this)
  });

  private httpClientProxyGetter(httpClient, method): (url: string, ...args) => Observable<Object> {
    return (url, ...args) => {
      const preparedUrl = this.location.prepareExternalUrl(`${this.apiPrefix}${url}`);
      const request = httpClient[method].bind(httpClient);

      return request(preparedUrl, ...args).pipe(tap(res => this.checkResult(res)));
    };
  }

  private checkResult(res: any): void {
    if (!res.result) {
      this.toastsService.somethingWrong();
    }
  }

  getAll(): Observable<Object> {
    return this.http.get(`/all`);
  }

  getConfig(): Observable<Object> {
    return this.http.get('/');
  }
}
