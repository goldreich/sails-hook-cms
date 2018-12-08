import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ToastsService } from './toasts.service';
import { Model } from '../types/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private models = new ReplaySubject<Model[]>(1);

  constructor(
    private apiService: ApiService,
    private toastsService: ToastsService
  ) {}

  getModels(): Observable<Model[]> {
    return this.models.asObservable();
  }

  getModel(identity): Observable<Model> {
    return this.models.pipe(map(models => this.getOneModel(models, identity)));
  }

  refresh(): void {
    this.apiService.getAll()
      .subscribe(res => this.getAllModelsHandler(res), err => this.toastsService.httpError());
  }

  private getOneModel(models, identity): Model {
    return models
      .filter(model => model.identity === identity)
      .reduce((value, model) => value = model, null);
  }

  private getAllModelsHandler(res: any): void {
    if (res.result) {
      this.models.next(res.data);
    }
  }
}
