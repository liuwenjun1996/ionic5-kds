import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AppCache } from '../../app/app.cache';
import { HttpProvider } from '../../providers/http';
import { AlertController } from '@ionic/angular';

/**
 * Generated class for the SelectcateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selectpayment',
  templateUrl: 'selectpayment.html'
})
export class SelectPaymentComponent {
  @Output() backToPage = new EventEmitter();
  @Input() payment: {} = {};
  @Input() brand: {} = {};
  @Input() supplier: {} = {};
  text: string;
  payments: any[] = [];

  constructor(public alertCtrl: AlertController, public appCache: AppCache, public http: HttpProvider,
  ) {
    console.log('Hello SelectcateComponent Component');
    this.text = 'Hello World';

  }

  back(event) {
    this.backToPage.emit(event);
  }

  showPayments(refresh: boolean = false) {
    this.openCommidtyTypes();
  }

  openCommidtyTypes() {
    //   let alert = this.alertCtrl.create(
    //     {
    //       header:'选择商品类别',
    //       cssClass: 'spec-alert' }
    //   ).then(alert=>{
    //     alert.setAttribute
    //   });
    //   alert.se  ('');

    //   for (let item of this.payments) {
    //     if (item.id == '') {
    //       continue;
    //     }
    //     alert.addInput({
    //       type: 'radio',
    //       label: item['payName'],
    //       value: item['id'],
    //       checked: item.id == this.payment['id'],
    //       handler: () => {
    //         this.payment['id'] = item['id'];
    //         // this.commidtyTypeName=data;
    //         this.payment['name'] = item['cateName'];
    //         // this.back({ 'id': this.commidtyTypeId, 'name': this.commidtyTypeName });
    //         alert.dismiss();
    //       }

    //     });
    //   }
    //   alert.addButton({
    //     text: '刷新',
    //     handler: () => {
    //       this.showPayments(true);
    //     }
    //   });
    //   alert.addButton('取消');
    //   alert.present();
  }
}
