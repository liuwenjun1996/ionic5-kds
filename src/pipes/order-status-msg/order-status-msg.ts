import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusMsg'
})
export class OrderStatusMsgPipe implements PipeTransform {

  msg: string;
  transform(value: any, args?: any): any {
    if(value.status == '0') {   //待付款
      if(value.payType == '2' || value.payType == '3') {  //在线支付 / 会员支付
        this.msg = '您的订单暂未付款，请及时付款';
      } else if (value.payType == '4') {  //到店支付
        this.msg = '您的订单已提交，等待商家确认';
      }
    } else if (value.status == '1') {  //已支付
      this.msg = '您已付款成功，等待商家确认';
    } else if (value.status == '2') {  //商家确认
      if(value.logisticsType == '4') {  //自取
        if(value.payType == '4') {
          this.msg = '商家已接单，请及时到店完成付款并取货';
        } else {
          this.msg = '商家已接单，请及时到店取货';
        }
      } else {
        this.msg = '商家已接单，商品配送中';
      }
    } else if (value.status == '3') {
      this.msg = '您的订单已申请取消，后台正在审核中';
    } else if (value.status == '6') {
      this.msg = '您的订单已配送，收获前请确保商品完好无损';
    } else if (value.status == '7') {
      this.msg = '很抱歉，商家拒绝接单';
    } else if (value.status == '8') {
      this.msg = '您的订单已完成，感谢您的信任，欢迎再次下单';
    } else if (value.status == '9') {
      this.msg = '您的订单已取消，感谢您的信任，欢迎再次下单';
    } else if (value.status == '10') {
      this.msg = '您的订单退款中，请耐心等待';
    }

    return this.msg;
  }

}
