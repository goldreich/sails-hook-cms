import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { combineLatest, switchMap } from 'rxjs/operators';

import { ModelsService } from 'src/app/services/models.service';
import { ConfigService } from 'src/app/services/config.service';

import { Model } from 'src/app/types/Model';

@Component({
  selector: 'app-model-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  inputs: any[] = null;
  model: Model = null;

  constructor(
    private route: ActivatedRoute,
    private modelsService: ModelsService,
    private configService: ConfigService,
    private utilsService: UtilsService
  ) { }



  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) => this.modelsService.getModel(params.get('model'))),
          combineLatest(this.configService.getConfig())
        )
        .subscribe(([model, config]) => {
          if (model) {
            this.model = model;
            this.inputs = this.utilsService
              .getSortedColumns(model, config.defaultSortPattern)
              .filter(m => !m.readOnly);
          } else {
            // TODO: Redirect to HomePage
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
