import { ModalController ,Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { HttpProvider } from '../providers/http';
import { AppCache } from '../app/app.cache';
import { WebSocketService } from './webSocketService';
import { AppShopping } from '../app/app.shopping';
import { UtilProvider } from '../providers/util/util';
import { HelperService } from '../providers/Helper';
import { PrintService } from './printService';
import { NetSocketReqService } from './netSocketReqService';
import { ShoppingUtilProvider } from '../providers/util/shoppingUtil';

@Injectable({
  providedIn: 'root',
})
export class CallOrTakeNumberService {
    deviceType: string;
    constructor(
        public http: HttpProvider,
        public appCache: AppCache,
        public modalCtrl: ModalController,
        public webSocketService: WebSocketService, 
        public appShopping: AppShopping,
        public util: UtilProvider,
        public help: HelperService,
        public platform: Platform,
        public printService: PrintService,
        public netSocketReqService: NetSocketReqService,
        public shoppingUtil: ShoppingUtilProvider,
    ) {


    }


    getQueueData(call) {
        // 加载排队数据
        this.netSocketReqService.getQueueData(res => {
            console.log('qqqqqqqqqqqqqqqqqqqqq', res);
            if (res.pos_queueOrder && res.pos_queueOrder.length > 0) {
                this.appShopping.queueOrderList = res.pos_queueOrder;
            }
            if (res.pos_queueOrderDetail && res.pos_queueOrderDetail.length > 0) {
                this.appShopping.queueOrderDetailList = res.pos_queueOrderDetail;
            }
            this.shoppingUtil.doGetShowQueueData();
            call && call(this.appShopping.showQueueOrderList);
        });
    }





}
