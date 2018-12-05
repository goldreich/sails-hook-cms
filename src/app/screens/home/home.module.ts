import { NgModule } from '@angular/core';

import { LayoutsModule } from '../../layouts/layouts.module';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    LayoutsModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
