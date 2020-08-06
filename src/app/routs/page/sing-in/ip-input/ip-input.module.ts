import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IpInputPageRoutingModule } from './ip-input-routing.module';

import { IpInputPage } from './ip-input.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IpInputPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [IpInputPage]
})
export class IpInputPageModule { }
