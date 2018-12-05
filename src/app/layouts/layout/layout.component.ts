import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NbMenuItem } from '@nebular/theme';

import { ModelsService } from '../../services/models.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mainMenu: NbMenuItem[] = [];

  private mainMenuTitle: NbMenuItem = {
    title: 'ALL MODELS',
    group: true
  };

  constructor(
    private modelsService: ModelsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.modelsService.getModels()
      .subscribe((models) => {
        this.mainMenu = [
          this.mainMenuTitle,
          ...models.map(model => ({
            title: model.globalId,
            link: `/${model.identity}`
          }))
        ];
      });
  }
}
