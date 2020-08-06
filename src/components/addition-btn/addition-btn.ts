
import { AppShopping } from '../../app/app.shopping';
import { UtilProvider } from '../../providers/util/util';
import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the OrderBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'addition-btn',
  templateUrl: 'addition-btn.html',
})
export class AdditionBtnComponent {

  @Input() aditionCom: {} = {};
  @Output() add = new EventEmitter<any>();
  @Output() sub = new EventEmitter<any>();
  constructor(public appShopping: AppShopping, public utilProvider: UtilProvider) {
    // console.log(this.aditionCom);

  }
  ngOnInit() { }

  subData() {
    if (this.aditionCom['salesQty'] && this.aditionCom['salesQty'] >= 1) {
      this.aditionCom['salesQty'] = this.utilProvider.accSub(this.aditionCom['salesQty'], 1, 0);
    } else {
      this.aditionCom['salesQty'] = 0;
    }
    // this.sub.emit({ num: this.itemQty });
  }

  addData(event) {
    if (this.aditionCom['salesQty'] && this.aditionCom['salesQty'] >= 1) {
      this.aditionCom['salesQty'] = this.utilProvider.accAdd(this.aditionCom['salesQty'], 1, 0);
    } else {
      this.aditionCom['salesQty'] = 1;
    }
  }

}
