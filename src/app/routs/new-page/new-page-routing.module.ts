import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPagePage } from './new-page.page';

const routes: Routes = [
  {
    path: '',
    component: NewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPagePageRoutingModule {}
