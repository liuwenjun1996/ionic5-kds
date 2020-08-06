import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { HttpProvider } from '../providers/http';
import { Observable } from 'rxjs';
import { AppCache } from '../app/app.cache';
import { WebSocketService } from './webSocketService';
import { AppShopping } from '../app/app.shopping';
import { UtilProvider } from '../providers/util/util';
import { ShoppingUtilProvider } from '../providers/util/shoppingUtil';
import { HelperService } from '../providers/Helper';

/**
 * NetSocketReqService webSocket接口请求服务
 */
@Injectable({
  providedIn: 'root',
})
export class NetSocketReqService {
    constructor(
        public http: HttpProvider,
        public appCache: AppCache,
        public webSocketService: WebSocketService,
        public appShopping: AppShopping,
        public util: UtilProvider,
        public shoppingUtilProvider: ShoppingUtilProvider,
        public help: HelperService,
        public platform: Platform
    ) {
    }

    //login加载数据
    loginLoddata() {
        let me = this;
        return Observable.create(obs => {
            me.webSocketService.sendObserveMessage("LOADDATA", "*", { timeOut: 5000 }).subscribe(function (retData) {
                if (retData && retData.success) {
                    if (me.shoppingUtilProvider.assignmentData(retData)) {
                        obs.next();
                    } else {
                        obs.error();
                    }
                }
            });
        })
    }

    getSalesData() {
        this.webSocketService.sendObserveMessage("LOADDATA", ["pos_salesh"]).subscribe(res => {
            console.log('res', res);
            if (res.success) {
                this.shoppingUtilProvider.assignmentSalesData(res);
            } else {
                // this.help.toast('获取数据失败');
            }

        })
    }
    /**
     * @method getQueueData 获取排队信息
     * @param callback 回调参数
     */
    getQueueData(callback) {
        this.webSocketService.sendObserveMessage("LOADDATA", ["pos_queueOrder"]).subscribe(res => {
            console.log('res', res);
            if (res.success) {
                callback && callback(res.data);
            } else {
                // this.help.toast('获取数据失败');
            }
        });
    }


}
