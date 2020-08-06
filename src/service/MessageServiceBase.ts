import { IMessageBase } from "./IMessageBase";
import { Injectable } from "@angular/core";
import { AppShopping } from "../app/app.shopping";
import { AppPermission } from "../app/app.permission";
import { AppCache } from '../app/app.cache';
import { ShoppingUtilProvider } from "../providers/util/shoppingUtil";

@Injectable({
  providedIn: 'root',
})
export class MessageServiceBase implements IMessageBase {
    //static registerMessageCmp:any = {};  // 注册消息组件
    static MSG_SELF: number = 2;          // 自己专属消息
    static MSG_SELF_BROADCAST: number = 1;  // 广播消息

    static registerMessageCmp: any = {};  // 注册消息组件
    /**
     * 数据类型
     */
    data: any = null
    // 消息类型
    msgType: any = null
    /**
     * 消息子类型
     */
    bizType: any = null
    /**
     * 店铺消息
     */
    sellerId: any = null
    /**
     * 推送消息
     */
    pushTime: any = null
    /**
     * messageCategory 消息分类:
     *  1.自己与广播消息, 
     *  2.专有消息,非自己的消息不接, 
     *  默认为 1 
     */
    messageCategory: number = null
    socketProxy: any = null

    //constructor(public mobileMessageService?:MobileMessageService) {
    //constructor(public webSocketService?:WebSocketService) {
    // Mobile 点菜宝消息服务
    //MessageServiceBase.registerMessageCmp["Mobile"] = mobileMessageService;
    //this.registerMessageCmp["Mobile"] = mobileMessageService;

    //}
    constructor(
        public appShopping?: AppShopping,
        public appPer?: AppPermission,
        public appCache?: AppCache,
        public shoppingUtilProvider?: ShoppingUtilProvider,
    ) { }

    /**
     * @method {Function} init 初始化数据
     * @param data 数据
     * @param msgCategory 消息类型
     * @param socketProxy socket代理
     */
    init(data: any, msgCategory: any, socketProxy: any) {
        if (!data) return;
        this.data = data;
        this.messageCategory = msgCategory || MessageServiceBase.MSG_SELF_BROADCAST;
        this.socketProxy = socketProxy;
        this.msgType = data.msgType;
        this.bizType = data.bizType;
        this.sellerId = data.sellerId;
        this.pushTime = data.pushTime;
        //throw new Error("Method not implemented.");
    }

    /**
     * @method {Function} execute 执行函数
     */
    execute() {
        //throw new Error("Method not implemented.");
    }

    /**
     * @method {Function} dispatch 分配消息
     * @param data 
     * @param socketProxy 
     */
    static dispatch(data: any, socketProxy: any) {
        let me = this;

        // this
        if (MessageServiceBase.registerMessageCmp[data.msgType]) {
            //var messageInst = new window[MessageServiceBase.registerMessageCmp[data.msgType]](data, socketProxy);
            let messageInst = MessageServiceBase.registerMessageCmp[data.msgType];
            messageInst.init(data, 2, socketProxy);
            messageInst.execute();
        }
    }
}