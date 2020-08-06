import { Pipe, PipeTransform } from '@angular/core';
import { Observable, from } from "rxjs";

/**
 * Generated class for the StatsTypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'type',
  pure: false
})
export class StatsTypePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(shopCart: any[], conditions: { [field: string]: any }): number {
    if (shopCart == null || shopCart.length == 0) {
      return 0;
    }

    let num = 0;

    // Array(from(shopCart)).filter(item => {
    //   for (let field in conditions) {
    //     if (item[field] !== conditions[field]) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }).subscribe(res => {
    //   num += res['num']
    // });


    return num;
  }
}
