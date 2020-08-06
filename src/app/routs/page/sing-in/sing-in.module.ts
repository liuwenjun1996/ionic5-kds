import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingInPageRoutingModule } from './sing-in-routing.module';

import { SingInPage } from './sing-in.page';
import { NewPagePage } from '../../new-page/new-page.page';
import { IpInputPage } from './ip-input/ip-input.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingInPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SingInPage, NewPagePage, IpInputPage],
  entryComponents: [NewPagePage, IpInputPage]
})
export class SingInPageModule { }
