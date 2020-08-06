import { MessageServiceBase } from "../MessageServiceBase";
import { Injectable } from "@angular/core";
// import { WebSocketService } from "../webSocketService";

@Injectable({
  providedIn: 'root',
})
export class MobileMessageService extends MessageServiceBase {
    execute(): void {
        let me = this;
        console.log(me.data); // 
        let bizType = me.data.bizType;  // 消息类型
        let swapType = me.data.swapType; // 交流类型, 0.请求消息,1.返回消息,2.推送消息
        if ((swapType + "") === "0") {
            me.requestMessageDeal();
        } else if ((swapType + "") === "1") {
            me.returnMessageDeal();
        } else if ((swapType + "") === "2") {
            me.pushMessageDeal();
        }
    }

    /**
     * @member MobileMessageService
     * @method {Function} requestMessageDeal 请求消息处理函数
     */
    requestMessageDeal() {
        let me = this;
        let bizType = me.data.bizType;
        if ("LOGIN" === bizType) { // 登录
        } else if ("UPDATEDATA" === bizType) {
            // 更新数据
        } else if ("LOADDATA" === bizType) {
            // 加载数据
        }
    }
    /**
     * @member MobileMessageService
     * @method {Function} returnMessageDeal 返回消息处理函数
     */
    returnMessageDeal() {
        let me = this;
        let bizType = me.data.bizType;
        /* if("LOGIN" === bizType) {
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        } else if("UPDATEDATA" === bizType) {
            // 更新数据
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        } else if("LOADDATA" === bizType) {
            // 加载数据
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        } else if("RETURNDETAIL" === bizType) {
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        } else if("CANCELTABLE" === bizType) {  // 撤台
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        } else if("CHANGETABLE" === bizType) {  // 转台
            me.data.callback && me.data.callback(me.data.success, me.data.data.content);
        }*/
        // LOGIN/UPDATEDATA/LOADDATA/RETURNDETAIL/CANCELTABLE/CHANGETABLE
        me.data.callback && me.data.callback(me.data.success, me.data.data.content, me.data.data.data);
    }
    /**
     * @member MobileMessageService
     * @method {Function} pushMessageDeal 推送消息处理
     */
    pushMessageDeal() {
        let me = this;
        let bizType = me.data.bizType;
        let pushContent = me.data.data.content || me.data;

        if ("PUSHSALESUPDATE" === bizType) { // 推送数据过来
            console.log(me.data.data.content);
            //let salesTableList = me.data.data.content.pos_salestable;
            let salesTableList = me.data.data.content.optSalesTable;
            me.orderRefresh(salesTableList, me.appShopping.salesTable);
            let retData = me.data.data.content;
            let salesTableData = retData ? (retData.salesTable || []) : [];
            this.shoppingUtilProvider.updateOrAddLocalData(retData)

            // me.woShopService.refreshSalesTable(salesTableData);
        } else if ("PUSHUPDATE" === bizType) { // 推送数据更新
            if (Array.isArray(pushContent)) {
                for (let ti = 0, tlen = pushContent.length; ti < tlen; ti++) {
                    let pushData = pushContent[ti];
                    pushData.pushType = pushData.type;
                    me.pushMessageForType(pushData);
                }
            } else if (Array.isArray(pushContent.type)) {
                for (let ti = 0, tlen = pushContent.type.length; ti < tlen; ti++) {
                    let pushType = pushContent.type[ti];
                    pushContent.pushType = pushType;
                    me.pushMessageForType(pushContent);
                }
                //me.appPer.buildStaffPermissionArray(pushContent.staff);
            } else {
                pushContent.pushType = pushContent.type;
                me.pushMessageForType(pushContent);
            }
        } else if ("UPDATESTOREPARAM" === bizType) {
            // 更新
        } else if ("UPDATASTAFF" === bizType) {

        } else if ("UPDATECOMMINFO" === bizType) {

        } else if ("UPDATECOMMTYPE" === bizType) {

        } else if ("UPDATETABLEINFO" === bizType) {

        } else if ("UPDATETABLETYPE" === bizType) {

        } else if ("RETURNTABLEVIEW" === bizType) {
            console.log("========================收到来自收银端的餐桌超时");
            var msg = "餐桌占用时长过长,请尽快处理退出餐桌占用";
            if (pushContent) {
                var data = pushContent.data;
                if (pushContent.msg) msg = pushContent.msg;
                if (data && data.deviceId === me.appCache.macId) { //通知id一致的设备
                    if (!me.appCache.isBackgroundMode) { //进入后台不处理消息
                        me.appPer && me.appPer.http.showToast(msg);
                    }
                }
            }
        } else if ("WHOLEORDERCANCEL" === bizType) {
            console.log("========================收到来自收银端的餐桌强占");
            if (pushContent) {
                var data = pushContent.data;
                if (pushContent.deviceId === me.appCache.macId || data.isClear) {//处理id一致的设备  //全部释放
                    console.log("========================发送通知执行退回餐桌界面");
                    // this.events.publish('order:hold-pop-view', data); //通知取单页返回
                }
            }
        } else if ("UPDATEQUEUE" === bizType) {

            // 更新排队数据
            console.log('更新排队数据', pushContent);
            this.shoppingUtilProvider.updateOrAddLocalQueueData(pushContent.data);
        }
    }
    /**
     * @member MobileMessageService
     * @method {Function} pushMessageForType 根据消息类型更新推送消息
     * @param {Object} pushContent
     */
    pushMessageForType(pushContent) {
        let me = this;
        if ("POS_STAFF" === pushContent.pushType || pushContent.pushType === "staff") { // 员工
            try { console.log(JSON.stringify(pushContent.data)); } catch (err) { console.log(err); }
            if (pushContent && pushContent.data && pushContent.data[0])
                me.appPer.buildStaffPermissionArray(pushContent.data[0]);
        } else {
            // 推送消息
            //let pushType = pushContent.type.toUpperCase();
            if (!pushContent.pushType) {
                console.log("非正常的推送消息,内容" + JSON.stringify(pushContent));
            } else {
                let pushType = pushContent.pushType.toLowerCase();
                var shopData = {};
                shopData[pushType] = pushContent[pushType] || pushContent.data;
                // me.woShopService.assignmentData({ data: shopData });
            }
        }
    }
    /**
     * @member MobileMessageService
     * @method {Function} orderRefresh 订单刷新
     * @param salesTableList 
     * @param salesTable 
     */
    orderRefresh(salesTableList, salesTable) {
        // debugger
        if (salesTableList && salesTableList.length > 0) {
            for (let element of salesTableList) {
                if (this.appShopping.salesTable && salesTable.id == element.id && salesTable.status != element.status) {
                    salesTable = element;
                    //订单状态跟新
                    // this.events.publish('order:refresh');
                    return;
                } else if (this.appShopping.salesTable && salesTable.id == element.id && salesTable != element) {
                    salesTable = element;
                    //订单数据更新跟新
                    // this.events.publish('order:refresh-data');
                    return;
                }
            }
            // salesTableList.forEach(element => {
            //     if (this.appShopping.salesTable && salesTable.id == element.id && salesTable.status != element.status) {
            //         salesTable = element;
            //         //订单状态跟新
            //         this.events.publish('order:refresh');
            //     } else if (this.appShopping.salesTable && salesTable.id == element.id && salesTable != element) {
            //         salesTable = element;
            //         //订单数据更新跟新
            //         this.events.publish('order:refresh-data');
            //     }
            // });
        }
    }
}
