import { Component, OnInit } from '@angular/core';

import { ModelsService } from './services/models.service';
import { ToastsService } from './services/toasts.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'sails-hook-cms';

  constructor(
    private modelsService: ModelsService,
    private toastsService: ToastsService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.configService.refresh();
    this.modelsService.refresh();
    this.toastsService.welcome();
  }
}
