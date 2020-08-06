import { Pipe, PipeTransform } from '@angular/core';
import { GlobalData } from '../../providers/GlobalData';
@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!GlobalData.microMembership) {
      //未登录 返回原价
      return value;
    } else {
      if(!value) {
        return 0;
      }
    
    }
  }

}
