import { NgModule } from '@angular/core';
import { SelectCommodityComponent } from './select-commodity/select-commodity';
import { WoOrderBtnComponent } from './wo-order-btn/wo-order-btn';
import { OrderBtnComponent } from './order-btn/order-btn';
import { SelectPaymentComponent } from './selectpayment/selectpayment';
import { AdditionBtnComponent } from './addition-btn/addition-btn';
import { CarBtnComponent } from './car-btn/car-btn';
import { NumberKeyboardComponent } from './number-keyboard/number-keyboard';
import { ComboBtnComponent } from './combo-btn/combo-btn';
import { DirectivesModule } from '../directives/directives.module';
import { IonicModule } from '@ionic/angular';
import { FirstComponent } from './first/first.component';
import { CommonModule } from '@angular/common';


@NgModule({
	declarations: [SelectCommodityComponent,
		OrderBtnComponent,
		AdditionBtnComponent,
		NumberKeyboardComponent,
		CarBtnComponent,
		WoOrderBtnComponent,
		SelectPaymentComponent,
		ComboBtnComponent,
		FirstComponent,
	],
	imports: [IonicModule, DirectivesModule, CommonModule],
	exports: [SelectCommodityComponent,
		OrderBtnComponent,
		AdditionBtnComponent,
		NumberKeyboardComponent,
		CarBtnComponent,
		WoOrderBtnComponent,
		SelectPaymentComponent,
		ComboBtnComponent,
		FirstComponent,
	]
})
export class ComponentsModule { }
