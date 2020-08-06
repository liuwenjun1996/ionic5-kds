
import { AppShopping } from '../../app/app.shopping';
import { UtilProvider } from '../../providers/util/util';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpProvider } from '../../providers/http';
import { AppPermission } from '../../app/app.permission';


/**
 * Generated class for the OrderBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'car-btn',
  templateUrl: 'car-btn.html',
})
export class CarBtnComponent {

  @Input() salesDetail: any = {};
  @Output() setNumber = new EventEmitter<any>();  
  constructor(
    public appShopping: AppShopping,
    public utilProvider: UtilProvider,
    public httpProvider: HttpProvider,
    public appPer: AppPermission,
  ) {
    // console.log(this.salesDetail);

  }
  ngOnInit() { }

  setNumberData() {
    if (!this.appPer.staffPermission('1001')) {
      this.httpProvider.showToast('无【修改商品数量】权限');
      return;
    }
    if (this.setNumber) {
      this.setNumber.emit();
    }
  }
  sub() {
    if (this.salesDetail.salesQty <= this.salesDetail.minCount) {
    }

  }
}
