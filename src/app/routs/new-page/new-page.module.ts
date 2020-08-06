import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPagePageRoutingModule } from './new-page-routing.module';

import { NewPagePage } from './new-page.page';
import { ComponentsModule } from 'src/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPagePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [NewPagePage]
})
export class NewPagePageModule { }
