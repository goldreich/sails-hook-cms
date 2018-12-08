import { Injectable } from '@angular/core';

import { ToastsService } from './toasts.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
    private toastsService: ToastsService
  ) {}

  getSortedColumns(model, sortPattern): any[] {
    const { attributes } = model;
    const columns = [];

    sortPattern.forEach((patternKey) => {
      if (patternKey !== '*') {
        if (attributes[patternKey]) {
          columns.push({
            ...attributes[patternKey],
            prop: patternKey,
            readOnly: true
          });
        } else if (patternKey === 'id') {
          this.toastsService.idIsNotFoundError();
        }
      } else {
        const keys = Object.keys(attributes);

        keys.forEach((key) => {
          if (!sortPattern.includes(key)) {
            columns.push({ ...attributes[key], prop: key });
          }
        });
      }
    });

    return columns;
  }
}
