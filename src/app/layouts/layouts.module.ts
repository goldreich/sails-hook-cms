import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbButtonModule
} from '@nebular/theme';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutsModule {}
