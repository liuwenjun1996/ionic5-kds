import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IpInputPage } from './ip-input.page';

const routes: Routes = [
  {
    path: '',
    component: IpInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IpInputPageRoutingModule {}
