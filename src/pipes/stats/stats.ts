import { Pipe, PipeTransform } from '@angular/core';
import { Observable, from } from "rxjs";
import { UtilProvider } from "../../providers/util/util";

/**
 * Generated class for the TotalPricePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'stats',
  pure: false
})
export class StatsPipe implements PipeTransform {

  constructor(public util: UtilProvider) {

  }

  /**
   * 计算购物车商品总价.
   */
  transform(shopCart: any[]): [number, number] {
    if (shopCart.length == 0) {
      return [0, 0];
    }

    let num = 0;
    let total = 0;

    from(shopCart).subscribe(res => {
      num += res['num'];
      // total += res['num'] * res['price']
      total = this.util.accAdd(total, this.util.accMul(res['num'], res['price']))
    });

    return [num, total]
  }
}
