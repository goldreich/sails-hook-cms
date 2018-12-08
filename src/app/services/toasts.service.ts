
import { Injectable } from '@angular/core';

import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  constructor(private nbToastrService: NbToastrService) {}

  welcome(): void {
    setTimeout(() => this.nbToastrService.success(
      'It is auto-generated admin panel hook for Sails.js framework',
      'Welcome!',
      {
        position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
        duration: 10000
      }
    ), 1000);
  }

  httpError(): void {
    this.nbToastrService.danger('You can see this error in the console', 'Http Error');
  }

  somethingWrong(): void {
    this.nbToastrService.danger('Something wrong', 'Error');
  }

  idIsNotFoundError(): void {
    this.nbToastrService.danger('\'id\' column is not found', 'Error');
  }
}
