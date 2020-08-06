import { Pipe, PipeTransform } from '@angular/core';
import { UtilProvider } from "../../providers/util/util";
import { DatePipe } from '@angular/common';

/**
 * Generated class for the TotalPricePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateCalc',
  pure: false
})
export class DateCalcPipe implements PipeTransform {

  constructor(public util: UtilProvider, public datePipe: DatePipe) {

  }

  /**
   * 计算购物车商品总价.
   */
  transform(date: number): string {
    if (!date) {
      return "";
    }
    let today = new Date();
    let minute = parseInt((today.getTime() - date) / (60 * 1000) + '');
    let hour = parseInt((today.getTime() - date) / (60 * 60 * 1000) + '');

    today.setHours(0, 0, 0, 0);
    let timestamp1 = today.getTime();
    let timestamp2 = timestamp1 - 24 * 60 * 60 * 1000;
    if (date < timestamp2) {
      return this.datePipe.transform(date, 'MM-dd hh:mm');
    } else if (date < timestamp1) {
      return "昨天 " + this.datePipe.transform(date, 'HH:mm');
    } else if (hour > 1) {
      return this.datePipe.transform(date, 'HH:mm');
    } else if (hour == 1) {
      return "1小时前";
    } else if (minute == 0) {
      return "刚刚";
    } else {
      return `${minute}分钟前`;
    }
  }
}
