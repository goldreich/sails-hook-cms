import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelHomeComponent } from './model-home/model-home.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    // Таблица с отображением записей и возможности их удаления
    path: ':model',
    component: ModelHomeComponent
  },
  {
    // Страница добавления
    path: ':model/create',
    component: CreateComponent
  },
  // {
  //   // Страница редактирования
  //   path: ':model/:id/edit',
  //   component: HomeComponent
  // },
  // {
  //   // Просмотр одной конкретной записи
  //   path: ':model/:id',
  //   component: HomeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
