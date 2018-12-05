import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

import { NbToastrService } from '@nebular/theme';

import { ApiService } from './api.service';
import { Model } from '../types/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private models = new ReplaySubject<Model[]>(1);

  constructor(
    private apiService: ApiService,
    private nbToastrService: NbToastrService
  ) {}

  getModels(): Observable<Model[]> {
    return this.models.asObservable();
  }

  refresh(): void {
    this.apiService.getAll()
      .subscribe((res: any) => {
        if (res.result) {
          console.log(res.data);
          this.models.next(res.data);
        } else {
          this.nbToastrService.show('Some text', 'some message in this');
        }
      });
  }
}
