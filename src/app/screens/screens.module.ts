import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { ModelModule } from './model/model.module';

@NgModule({
  imports: [
    HomeModule,
    ModelModule
  ]
})
export class ScreensModule {}
