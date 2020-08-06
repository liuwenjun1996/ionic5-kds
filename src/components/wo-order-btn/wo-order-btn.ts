import { Component, Input, ViewChild, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { AlertController } from '@ionic/angular';
import { HelperService } from '../../providers/Helper';
import { UtilProvider } from '../../providers/util/util';
import { ShoppingService } from '../../service/shoppingService';

/**
 * Generated class for the WoOrderBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wo-order-btn',
  templateUrl: 'wo-order-btn.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WoOrderBtnComponent),
    multi: true
  }]
})
export class WoOrderBtnComponent {

  numTmp: number = 0;
  addDisabled: boolean = false;
  subDisabled: boolean = false;
  @Output() add = new EventEmitter<any>();
  @Output() sub = new EventEmitter<any>();
  @ViewChild("subEle") subEle: any;
  @ViewChild("addEle") addEle: any;
  propagateChange: any = {};

  @Input() item: any = {};
  @Input() itemQty: number = 0;

  @Input() disabled: boolean = true;
  @Input() isOutFlag: boolean = false;

  constructor(private alertCtrl: AlertController, public util: UtilProvider, public shoppingService: ShoppingService,
    public helper: HelperService) { }

  /*实现ControlValueAccessor接口部分*/
  writeValue(val: number): void {
    // this.itemQty = val || 0;
    // this.numTmp = val || 0;
    // if (this.item.currCrossoutNum == '' || this.item.currCrossoutNum == null) {
    //   if (this.isOutFlag) {
    //     this.item.currCrossoutNum = this.numTmp || this.item.crossoutNum;
    //   } else {
    //     this.item.currCrossoutNum = this.numTmp || this.item.outNum;
    //   }
    // } else if (this.item.currCrossoutNum > this.item.outNum) {
    //   this.item.currCrossoutNum = this.item.outNum;
    // }
    // this.numTmp = this.item.currCrossoutNum;

  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;

  }

  registerOnTouched(fn: any): void { }

  ngOnInit() {
    if (this.isOutFlag) {
      this.item.currCrossoutNum = this.item.crossoutNum;
    } else {
      this.item.currCrossoutNum = this.item.outNum;
    }

    this.isCanTap();
  }

  subData() {
    // this.itemQty > 0 ? this.itemQty-- : '';
    this.item.currCrossoutNum = this.util.accSub(this.item.currCrossoutNum, 1);
    this.isCanTap();
    // this.sub.emit({ num: this.itemQty });
  }

  addData(event) {
    // this.itemQty++;
    this.item.currCrossoutNum = this.util.accAdd(this.item.currCrossoutNum, 1);
    this.isCanTap();
    // this.add.emit({ event: event, num: this.itemQty });
  }

  changeNum(event) {
    this.shoppingService.changeNeedOutNum(this.item, () => { this.isCanTap(); });

  }

  isCanTap() {
    if (this.isOutFlag) {
      if (this.item.currCrossoutNum > this.item.crossoutNum) {
        this.item.currCrossoutNum = this.item.crossoutNum;
        this.addDisabled = true;
      }
    } else {
      if (this.item.currCrossoutNum > this.item.outNum) {
        this.item.currCrossoutNum = this.item.outNum;
        this.addDisabled = true;
      }
    }

    if (this.item.currCrossoutNum <= 0) {
      this.item.currCrossoutNum = 1;
      this.subDisabled = true;
    }
    if (this.item.measureFlag == 'Z') {
      this.item.currCrossoutNum = this.item.outNum;
    }
  }

}
