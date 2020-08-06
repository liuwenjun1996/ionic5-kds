import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    DirectivesModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class SharesModule { }
