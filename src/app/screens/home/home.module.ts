import { NgModule } from '@angular/core';

import { NbLayoutModule } from '@nebular/theme';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    NbLayoutModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
