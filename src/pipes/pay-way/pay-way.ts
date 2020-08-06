import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'payWay'
})
export class PayWayPipe implements PipeTransform {

  // 1：货到付款 2：在线支付 3：会员支付 4:到店支付       允许多选，以逗号分隔',
  transform(value: any, args?: any): any {
    let test: string;
    switch (Number(value)) {
      case 1:
        test = '货到付款'
        break;
      case 2:
        test = '在线支付'
        break;
      case 3:
        test = '会员支付'
        break;
      case 4:
        test = '到店支付'
        break;
    }
    return test;
  }

}

@Pipe({
  name: 'logistics'
})
export class LogisticsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value) {
      return 
    }
    return value;
  }

}
