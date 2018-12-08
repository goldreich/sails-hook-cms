import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = new ReplaySubject<any>(1);

  getConfig(): Observable<any> {
    return this.config.asObservable();
  }

  constructor(
    private apiService: ApiService
  ) {}

  refresh(): void {
    this.apiService.getConfig()
      .subscribe((res: any) => {
        if (res.result) {
          this.config.next(res.config);
        }
      });
  }
}
