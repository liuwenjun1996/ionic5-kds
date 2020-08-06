
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class GlobalData {

  static token: string; // token
  static userInfo: any;   //用户信息
  static gShop: any; //店铺信息
  static gCusVo: any;  //当前店铺会员卡信息
  static microMembership: any;  //微会员信息

  static set_token_key: string = "AIBAOTOKENKEY";
  static default_all_user: string = 'aibaodefaultalluser';
  static set_cus_vo: string = 'AIBAOCUSVO';
  // static sys_mode: string = CommonStatusEnum.SysMode.s;  //系统模式  single：单店  platform： 平台
  
  static readonly event_shop: string = 'aibao:shopinfo';  //商铺信息事件
  static readonly event_user: string = 'aibao:update-userinfo';  //用户信息事件
  static readonly event_cart: string = 'aibao:update-cart';  //购物车事件
  static readonly event_membership: string = 'aibao:microMembership';   //更新微会员信息
  static readonly event_orderList: string = 'aibao:updateOrderList'  //更新订单列表
  static readonly sys_type: string = 'aibao:system_type';  //项目类别事件， 零售/微信点餐
  static readonly sys_wo_take_order: string = 'aibao:msy:takeorder';  //美食云点菜通知事件

}


@Injectable({
  providedIn: 'root',
})
export class environment {
  //sit环境
  //  static appServerUrl: string = 'https://sit.aibaocloud.com/wechat';   //零售
  //  static waimaiServeUrl:string = 'https://sitwaimai.aibaocloud.com/waimai';  //外卖
  static appServerUrl: string = 'wechat/';   //零售
  static waimaiServeUrl: string = 'waimai/';  //外卖

  //正式环境
  // static appServerUrl: string = 'http://sit.aibaocloud.com/';
  // static waimaiServeUrl:string = 'https://sitwaimai.aibaocloud.com/';


  //本地开发环境
  // appServerUrl: 'http://192.168.1.120:4008/',
  // waimaiServeUrl: 'http://192.168.1.120:4777/',

  // 本地服务器环境
  // static appServerUrl: string = 'http://120.24.15.94:4008/';
  // static waimaiServeUrl:string = 'https://sitwaimai.aibaocloud.com/';


  static requestTimeout: number = 20000;
  // static imgUrl: string = 'http://120.24.101.19:10006/';   //图片地址
  static imgUrl: string = 'commServe/';   //图片地址
}