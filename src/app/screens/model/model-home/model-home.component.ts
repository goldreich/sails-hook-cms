import { ConfigService } from './../../../services/config.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, combineLatest } from 'rxjs/operators';

import { ModelsService } from 'src/app/services/models.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-model-home',
  templateUrl: './model-home.component.html',
  styleUrls: ['./model-home.component.scss']
})
export class ModelHomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  columns: any[];
  rows: any[];

  constructor(
    private route: ActivatedRoute,
    private modelsService: ModelsService,
    private utilsService: UtilsService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.updateModelByParam());
  }

  private updateModelByParam() {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.modelsService.getModel(params.get('model'))),
        combineLatest(this.configService.getConfig())
      )
      .subscribe(([model, config]) => {
        if (model) {
          this.columns = this.utilsService.getSortedColumns(model, config.defaultSortPattern);
          this.rows = model.records;
        } else {
          this.clearData();
        }
      });
  }

  private clearData(): void {
    this.columns = [];
    this.rows = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
