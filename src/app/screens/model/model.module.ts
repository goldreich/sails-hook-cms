import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule, NbButtonModule } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { ModelRoutingModule } from './model-routing.module';
import { ModelHomeComponent } from './model-home/model-home.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    NbInputModule,
    NbButtonModule,
    ModelRoutingModule,
    LayoutsModule
  ],
  declarations: [ModelHomeComponent, CreateComponent]
})
export class ModelModule { }
