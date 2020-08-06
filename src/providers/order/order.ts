import { Inject, Injectable } from '@angular/core';
import { HttpProvider } from "../http";
import { APP_CONFIG, AppConfig } from "../../app/app.config";
// import { Events } from "@ionic/angular";
//import {PrintProvider} from "../print";
import { DatePipe } from "@angular/common";
import { NativeProvider } from "../native";
import { AppCache } from '../../app/app.cache';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class OrderProvider {
  newOrderCount_waimai: number = 0;  //微信外卖 新订单数量
  waitingDeliveryCount_waimai: number = 0;  //微信外卖 待配送订单数量
  deliveryCount_waimai: number = 0;  //微信外卖 配送中订单数量
  takeSelf_waimai: number = 0;  //微信外卖 配送中订单数量

  autoProcess_waimai: boolean = false; //微信外卖 自动任务 标识
  autoProcess_table: boolean = false; //微信桌台 自动任务 标识

  notify_waimai: boolean = false;//微信外卖 通知 标识
  notify_table: boolean = false;//微信桌台 通知 标识

  newOrderCount_table: number = 0; //微信桌台 新订单数量
  orderRecCount_table: number = 0; //微信桌台 进行中数量
  finishCount_table: number = 0; //微信桌台 完成数量

  //timestamp_waimai: number;   //微信外卖
  //timestamp_table: number;   //微信桌台

  lastUpdateTime_waimai: number;  //微信外卖 最后更新时间
  lastUpdateTime_table: number; //微信桌台 最后更新时间

  isReceiptPrint_waimai: boolean = false; //微信外卖  是否配置小票打印
  receiptPrintNum_waimai: number = 1; //微信外卖  配置小票打印份数
  iskitchenPrint_waimai: boolean = false; //微信外卖 是否配置厨房打印
  kitchenPrintNum_waimai: number = 1; //微信外卖  配置厨房打印份数
  isTagPrint_waimai: boolean = false; //微信外卖 是否配置厨房打印
  tagPrintNum_waimai: number = 1; //微信外卖  配置厨房打印份数

  isReceiptPrint_table: boolean = false; //微信桌台  是否配置小票打印
  receiptPrintNum_table: number = 1; //微信桌台  配置小票打印份数
  iskitchenPrint_table: boolean = false; //微信桌台 是否配置厨房打印
  kitchenPrintNum_table: number = 1; //微信桌台  配置厨房打印份数
  isTagPrint_table: boolean = false; //微信桌台 是否配置厨房打印
  tagPrintNum_table: number = 1; //微信桌台  配置厨房打印份数
  isReceiptPrint_default: boolean = false; //开单  是否配置小票打印
  receiptPrintNum_default: number = 1; //开单  配置小票打印份数
  iskitchenPrint_default: boolean = false; //开单 是否配置厨房打印
  kitchenPrintNum_default: number = 1; //开单  配置厨房打印份数
  isTagPrint_default: boolean = false; //开单 是否配置厨房打印
  tagPrintNum_default: number = 1; //开单  配置厨房打印份数

  isReceiptPrint_kaitai: boolean = false; //开台  是否配置小票打印
  receiptPrintNum_kaitai: number = 1; //开台  配置小票打印份数
  isReceiptPrint_kaitai_jiezhang: boolean = false; //开台结账  是否配置小票打印
  receiptPrintNum_kaitai_jiezhang: number = 1; //开台结账  配置小票打印份数
  iskitchenPrint_kaitai: boolean = false; //开台 是否配置厨房打印
  kitchenPrintNum_kaitai: number = 1; //开台  配置厨房打印份数
  isTagPrint_kaitai: boolean = false; //开台 是否配置厨房打印
  tagPrintNum_kaitai: number = 1; //开台  配置厨房打印份数

  isReceiptPrint_shoukuan: boolean = false; //开台  是否配置小票打印
  receiptPrintNum_shoukuan: number = 1; //开台  配置小票打印份数

  _waimaiCountInterval: any;  //外卖自动任务 定时器
  _tableCountInterval: any; //桌台自动任务 定时器

  receiptPrintStatus = false;//小票打印机状态
  kitchenPrintStatus = false;//厨房打印机状态
  tagPrintStatus = false;//厨房打印机状态
  //外卖配置
  orderList_waimai: any = [];
  processOrderId_waimai: string;//正在处理订单id
  isDownLoading_waimai: boolean = false;//是否正在下载外卖订单
  isHasPush_waimai: boolean = false;//是否有新推送
  //桌台配置
  orderList_table: any = [];
  processOrderId_table: string;//正在处理桌台订单id
  isDownLoading_table: boolean = false;//正在下载桌台订单
  isHasPush_table: boolean = false;//是否有新推送

  constructor(public http: HttpProvider, @Inject(APP_CONFIG) public config: AppConfig, public appCache: AppCache,//public printProvider: PrintProvider,
    public datePipe: DatePipe, public nativeProvider: NativeProvider) {

  }

  /**
   * 删除一个外卖订单
   * @param order
   */
  removeWaimaiOrder(order) {
    for (let i = 0; i < this.orderList_waimai.length; i++) {
      if (this.orderList_waimai[i].id == order.id) {
        this.orderList_waimai.splice(i, 1);
        break;
      }
    }
  }

  /**
   * 增加一个外卖订单
   * @param order
   */
  addWaimaiOrder(order) {
    this.orderList_waimai[this.orderList_waimai.length] = order;
  }


  clear() {
    if (this._waimaiCountInterval != null) {
      clearInterval(this._waimaiCountInterval)
    }

    if (this._tableCountInterval != null) {
      clearInterval(this._tableCountInterval)
    }
  }






  public stopTask() {
    this.newOrderCount_waimai = 0;  //微信外卖 新订单数量
    this.waitingDeliveryCount_waimai = 0;  //微信外卖 配送订单数量

    this.autoProcess_waimai = false; //微信外卖 自动任务 标识
    this.autoProcess_table = false; //微信桌台 自动任务 标识

    this.newOrderCount_table = 0; //微信桌台 新订单数量

    //this.timestamp_waimai = null;   //微信外卖
    //this.timestamp_table = null;   //微信桌台

    this.lastUpdateTime_waimai = null;  //微信外卖 最后更新时间
    this.lastUpdateTime_table = null; //微信桌台 最后更新时间

    this.isReceiptPrint_waimai = false; //微信外卖  是否配置小票打印
    this.iskitchenPrint_waimai = false; //微信外卖 是否配置厨房打印

    this.isReceiptPrint_default = false; //开单  是否配置小票打印
    this.iskitchenPrint_default = false; //开单 是否配置厨房打印

    this.isReceiptPrint_table = false; //微信桌台  是否配置小票打印
    this.iskitchenPrint_table = false; //微信桌台 是否配置厨房打印

    if (this._waimaiCountInterval != null) {  //外卖自动任务 定时器
      clearInterval(this._waimaiCountInterval)
    }

    if (this._tableCountInterval != null) { //桌台自动任务 定时器
      clearInterval(this._tableCountInterval)
    }
  }
}
