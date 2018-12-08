import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NbMenuItem } from '@nebular/theme';

import { ModelsService } from '../../services/models.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private readonly mainMenuTitle: NbMenuItem = { title: 'COLLECTIONS', group: true };

  mainMenu: NbMenuItem[] = [this.mainMenuTitle];

  constructor(private modelsService: ModelsService) {}

  private updateMainMenuItems(models): void {
    const menuItems = models.map(model => ({
      title: model.globalId,
      link: `/${model.identity}`,
      icon: 'nb-chevron-right-outline'
    }));

    this.mainMenu = [this.mainMenuTitle, ...menuItems];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.modelsService.getModels().subscribe(models => this.updateMainMenuItems(models))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
