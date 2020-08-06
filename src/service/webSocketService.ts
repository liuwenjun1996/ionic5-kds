import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppConstants } from '../app/app.constants';
import { UtilProvider } from '../providers/util/util';
import { MobileMessageService } from "./mobile/MobileMessageService";
import { HttpProvider } from '../providers/http';
import { AppCache } from '../app/app.cache';
import { AppShopping } from '../app/app.shopping';
import { EventsProvider } from 'src/providers/Events';
// import { Events } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
    static mobileWebSocket: any = null;  // websocket连接通道
    webSocket: WebSocket;
    webSocketProxy: any = {};
    url: string;
    heartBeatInterval: any;
    heartBeatTimeDelay: number;
    swapEventMap: any = null;  // 交流通讯map {swapId:callback}
    registerMessageCmp: any = {}; // 注册消息组件
    loadingObserve: any = {}; // 加载框observe
    connectObserve: any = null;  // 连接Observe
    connIP: string;         // 连接IP
    connPort: number;        // 连接端口
    loading: any;
    isReconnectioned: boolean = false; //是否重连过
    isBackgroundMode: boolean = false; //是否退出后台,退出后台会重连

    constructor(
        public events: EventsProvider,
        private utilProvider: UtilProvider,
        public http: HttpProvider,
        public httpProvider: HttpProvider,
        public mobileMessageService?: MobileMessageService,
        public appShopping?: AppShopping,
        public appConstants?: AppConstants,
        public appCache?: AppCache) {
        let me = this;
        me.heartBeatInterval = null;
        me.webSocket = null;

        me.swapEventMap = new Map();
        me.registerMessageCmp["MobileKds"] = mobileMessageService;
        //me.start();
    }

    registerCmp(msgType, cmpClass) {
        this.registerMessageCmp[msgType] = cmpClass;
    }
    /**
     * @member WebSocketService
     * @method {Function} init 初始化操作
     * @param url 
     * @param timeDelay 
     */
    init(url: string, timeDelay: number) {
        let me = this;
        // 先关闭websocket
        if (WebSocketService.mobileWebSocket) WebSocketService.mobileWebSocket.close();
        me.heartBeatTimeDelay = timeDelay || 60000;
        me.url = url;

        me.start();
    }
    /**
     * @member WebSocketService
     * @method {Function} connect 连接websocket服务
     * @param {string} connIP 
     * @param {number} connPort 
     * @param {number} timeDelay 
     * @param {Function} callback
     */
    connect(connIP: string, connPort: number, timeDelay: number) {
        let me = this;
        // me.http.loadingPresent(true, '正在连接服务，请稍后...').subscribe(loading => {
        //     this.loading = loading;

        // });
        // me.http.loadingDismiss(this.loading);
        me.connIP = connIP;
        me.connPort = connPort;
        let connUrl = "ws://" + connIP + ":" + connPort + "/?isMaster=N&optSystem=MacOS&storeId=11112345566";
        me.init(connUrl, timeDelay);


        setTimeout(function () {
            if (me.connectObserve) {
                me.connectObserve.next({
                    success: false,
                    data: "连接服务超时!"
                });
                me.connectObserve = null;
            }
        }, 10000);
        return Observable.create(obserable => {
            me.connectObserve = obserable;
        });
    }
    reconnect(isBackgroundMode?): any {
        let me = this;
        me.isBackgroundMode = isBackgroundMode; //记录是否返回后台触发的重连
        me.connect(me.connIP, me.connPort, 30000);
        //throw new Error("Method not implemented.");
    }
    /**
     * @method {Function} handleConnect handle socket已连接事件
     */
    handleConnect() {
        let me = this;
        me.connectObserve && me.connectObserve.next({
            success: true,
            data: "连接服务成功!",
        });
        me.http.loadingDismiss(me.loading);
        me.connectObserve = null;
        me.isReconnectioned = false;
        //连接成功通知收银端释放本机相关内存数据
        if (!me.isBackgroundMode) this.sendObserveMessage("RELEASEMASTERDATA", { status: 0 }, { isShowing: false }).subscribe(function () { });
    }
    handleClose() {
        let me = this;
        me.connectObserve && me.connectObserve.next({
            success: false,
            data: "连接服务失败!"
        });
        me.connectObserve = null;
        if (!me.isReconnectioned) {
            me.isReconnectioned = true;
            this.events.notifyDataChanged('order:hold-pop-view', {});
        }
    }
    handleError() {
        let me = this;
        me.handleClose();
    }
    start() {
        let me = this;
        console.log("正在发送连接_" + me.url);
        me.webSocket = new WebSocket(me.url);
        /**
         * @member 
         * @method {Function} onopen websocket连接上的事件
         */
        me.webSocket.onopen = function () {
            console.log(me.url + "__ onopen!");
            me.handleConnect && me.handleConnect();
            console.log('ljcg.............');

        }
        /**
         * 监听websocket接收到消息
         * @method {Function} onmessage 接受消息事件
         * @param {MessageEvent} e
         */
        me.webSocket.onmessage = function (e) {
            //var jsonData =  JSON.parse(e.data);
            me.parseMessage(e.data);
        };
        /**
         * @member onerror websocket发生错误
         */
        me.webSocket.onerror = function () {
            console.log(me.url + " __ onerror!");
            // 要根据错误来做相应处理
            //me.handleOnError && me.handleOnError();
            me.handleError && me.handleError();
        };
        /**
         * @member onclose websocket发生关闭
         */
        me.webSocket.onclose = function () {
            console.log(me.url + " __ onclose!");
            // 要根据关闭来做相应处理
            //if(typeof me.handleOnClose === "function") me.handleOnClose();
            //me.handleOnClose && me.handleOnClose();
            me.handleClose && me.handleClose();
        };
        /**
         * @member webSocketProxy
         * @method {Function} sendSwapResult 发送通讯结果消息
         * @param {Boolean} success 是否成功
         * @param {Object|String} messageData 返回的消息
         */
        me.webSocketProxy.sendSwapResult = function (success: boolean, messageData: any) {
            var returnData: any = {};
            if (typeof messageData === "string") {
                returnData.data = {};
                returnData.data.content = messageData;
            } else {
                if (!messageData.data) returnData.data = messageData;
                else returnData = messageData;
            }
            returnData.success = success;
            returnData.swapType = 1;   // 返回消息
            returnData.createTime = returnData.createTime || me.utilProvider.getNowTime(); // 创建时间
            returnData.pushTime = returnData.pushTime || returnData.createTime; // 推送时间
            returnData = JSON.stringify(returnData);

            me.webSocket.send(returnData);
        }
        me.sendHeartBeat();
    }

    sendHeartBeat() {
        let me = this;
        me.closeHeartBeat();
        console.log(me.url + "__launch heart beat!");
        // webSocket已经启动且使用中
        me.heartBeatInterval = setInterval(function () {
            if (me.webSocket && parseInt(me.webSocket.readyState + "") === 1) {
                me.webSocket.send(JSON.stringify({ bizType: 'client2Ping', EVENT: 'HEART_BEAT' }));
            } else {
                // webSocket 被关闭
                if (parseInt(me.webSocket.readyState + "") === 3) me.webSocket.close();
                me.start();  // 如果连接失败，每隔1分钟连接一次!
            }
        }, me.heartBeatTimeDelay);
    }

    /**
     * @member WebSocketService
     * @method {Function} closeHeartBeat 关闭心跳包
     * @param
     */
    closeHeartBeat() {
        var me = this;
        if (me.heartBeatInterval) {
            clearInterval(me.heartBeatInterval);
            me.heartBeatInterval = null;
        }
    }
    // 更新数据
    sendUpdataDataMessage(data, loadingData: any = { isShowing: true, content: "正在处理中...", duration: this.appConstants.REQ_TIMEOUT }) { }
    // 加载数据
    sendLoadDataMessage(data, loadingData: any = { isShowing: true, content: "数据加载中...", duration: this.appConstants.REQ_TIMEOUT }) { }
    // 登录操作
    sendLoginMessage(data, loadingData: any = { isShowing: true, content: "正在处理中...", duration: this.appConstants.REQ_TIMEOUT }) { }
    sendObserveMessage(eventName, data, loadingData: any = { isShowing: true, content: "加载中...", duration: this.appConstants.REQ_TIMEOUT, timeOut: 0 }) {
        if (loadingData.isShowing === false) {
            loadingData.isShowing = false;
        } else {
            loadingData.isShowing = true;
        }
        loadingData.content = loadingData.content || "正在处理中...";
        loadingData.duration = loadingData.duration || this.appConstants.REQ_TIMEOUT;
        loadingData.timeOut = loadingData.timeOut || 0;
        return Observable.create(observable => {
            let me = this;
            // 显示 loading
            // debugger
            me.http.loadingPresent(loadingData.isShowing, loadingData.content).subscribe(loading => {
                me.sendServerMessage(eventName, data, function (success, data, returnData) {
                    setTimeout(() => {
                        me.http.loadingDismiss(loading);
                        if (!success) {
                            if (loadingData.isShowing)
                                if (returnData && returnData.msg) me.http.showToast(returnData.msg);
                                else me.http.showToast(data);
                        }
                    }, loadingData.timeOut);
                    observable.next({ success: success, data: data, returnData: returnData });
                    // observable.timeout({success:false, errorCode:0, returnData:{msg:"请求超时..."}});
                }, function (success) {

                });
            });
        });
    }
    /**
     * @member WebSocketService
     * @method {Function} sendServerMessage 发送服务端消息
     * @param {String} eventName 事件名
     * @param {Object} data 数据
     * @param {Function} callback 回调
     * @param {Function} errCallback 错误回调
     */
    sendServerMessage(eventName, data, callback, errCallback) {
        let me = this;
        let messageData: any = {};
        messageData.bizType = eventName;
        messageData.data = {};
        messageData.data.content = data;
        messageData.callback = callback;    // 成功/失败回调
        messageData.errCallback = errCallback; // 连接服务失败回调
        me.sendDefaultMessage(messageData);
    }
    /**
     * @member WebSocketService
     * @method {Function} sendDefaultMessage 发送默认消息
     * @param {Object} messageData 
     */
    sendDefaultMessage(messageData: any) {
        let me = this;
        messageData.msgType = "MobileKds";  // 点菜宝都是Mobile类型
        messageData.staff = this.appShopping.staff;
        messageData.EVENT = messageData.EVENT || messageData.bizType;
        me.sendSwapMessage(messageData);
    }
    /**
     * @member WebSocketService
     * @method {Function} sendSwapMessage 发送通讯消息
     * @param {Object|String} messageData
     */
    sendSwapMessage(messageData: any) {
        let me = this;
        let sendContent: any = {}; // 发送内容
        let cpSendContent: any = {};  //备份消息内容
        let msgCallback = null; // 消息回调
        let errCallback = null; // 未连接回调
        let msgSwapId = me.utilProvider.genUUID();
        if (typeof messageData === "string") { // 
            sendContent.data = {};
            sendContent.data.content = messageData;
        } else {
            msgCallback = messageData.callback;
            delete messageData.callback;
            errCallback = messageData.errCallback;
            if (!messageData.data) messageData.data = {};
            sendContent = messageData;
        }

        sendContent.swapType = 0;   // 请求消息
        sendContent.deviceId = me.appCache.macId;
        sendContent.createTime = sendContent.createTime || me.utilProvider.getNowTime(); // 创建时间
        sendContent.pushTime = sendContent.pushTime || sendContent.createTime; // 推送时间
        sendContent.version = this.appConstants.VERSION; //版本号
        //sendContent.storeId = Store.getStoreId();  // 商家ID
        sendContent.uniqueSwapId = msgSwapId;//me.utilProvider.getUUID(); // 生成uuid 用于通讯时的唯一识别ID
        cpSendContent = me.cloneSocketData(sendContent);
        cpSendContent.callback = msgCallback;
        sendContent = JSON.stringify(sendContent);

        if (me.webSocket && me.webSocket.readyState === 1) {
            console.log(sendContent);
            me.webSocket.send(sendContent);
            me.saveSwapInfo(cpSendContent, msgCallback); // 消息
        } else {
            let toastMessage = "";
            if (me.webSocket) {
                if (2 === me.webSocket.readyState || 3 === me.webSocket.readyState) {
                    // 正在关闭或已经关闭
                    me.reconnect();
                } else if (0 === me.webSocket.readyState) {
                    toastMessage = "正在连接收银前台中,请稍候...";
                }
            }
            //me.httpProvider && me.httpProvider.showToast(toastMessage);
            msgCallback && msgCallback(false, "未连接到收银前台...");
            errCallback && errCallback(false, "未连接到收银前台...");
        }
    }
    /**
     * @method {Function} cloneSocketData 克隆发送的socket数据
     * @param data 
     */
    cloneSocketData(data: any) {
        return JSON.parse(JSON.stringify(data));
    }
    /**
     * @method {Function} clearEventTimeout 清除时间计时器
     * @param {String} swapId 通讯唯一标识
     */
    clearEventTimeout(swapId: string) {
        let me = this;
        let eventData = me.swapEventMap.get(swapId);
        if (eventData && eventData.eventTimeout) {
            clearTimeout(eventData.eventTimeout);
            eventData.eventTimeout = null;
        }
    }
    /**
     * @method {Function} saveSwapInfo 保存通讯信息
     * @param swapData 通讯唯一识别ID
     * @param callback 
     */
    saveSwapInfo(swapData, callback) {
        let me = this;
        let swapId = swapData.uniqueSwapId;
        let swapEventTimeout = setTimeout(function () {
            let eventData = me.swapEventMap.get(swapId);
            //me.clearEventTimeout(swapId);
            eventData.success = false;
            eventData.data.content = "请求超时, 请检查服务是否正常...";
            eventData.data.data = { isTimeOut: true, errorCode: 0 };
            eventData.swapType = 1;
            me.dispatchMessage(eventData);
        }, me.appConstants.REQ_TIMEOUT);
        swapData.currTime = me.utilProvider.getNowTime();
        swapData.currTimeMs = me.utilProvider.getMsTime();
        swapData.eventTimeout = swapEventTimeout;
        swapData.callback = callback;
        me.swapEventMap.set(swapId, swapData);
    }
    /**
     * @member WebSocketService
     * @method {Function} sendMessage 发送消息
     * @param {Object|String}message
     */
    sendMessage(message: any) {
        let me = this;
        if (!(typeof message === "string")) {
            message = JSON.stringify(message);
        }
        me.webSocket.send(message);
    }
    /**
     * @member WebSocketService
     * @method {Function} parseMessage 解析消息
     * @param {Object|String} data
     */
    parseMessage(data: any) {
        let me = this;
        let parseData = data;
        try {
            parseData = JSON.parse(data);
            let swapData = me.swapEventMap.get(parseData.uniqueSwapId);  // 获取发送时保留的通讯信息
            if (swapData) {
                parseData.callback = swapData.callback;
                if (me.utilProvider.getMsTime() - parseData.currTimeMs > me.appConstants.REQ_TIMEOUT) {
                    // 30000超时返回false
                    parseData.success = false;
                    parseData.data.content = "请求数据超时!";
                }
            }
            //data = JSON.stringify(parseData); // 转数据
            //if(parseData.msgType === "Mobile") {
            //    me.mobileMessageService.init(parseData, 2, me.webSocketProxy);
            //    me.mobileMessageService.execute();
            //}
        } catch (err) {
            console.log(err);
        }
        //MessageService.analysis(data, me.webSocketProxy);
        //MessageServiceBase.dispatch(parseData, me.webSocketProxy);
        //if(me.loadingObserve[parseData.uniqueSwapId]) {// 关闭加载框
        //    me.http.loadingDismiss(me.loadingObserve[parseData.uniqueSwapId]);
        //    delete me.loadingObserve[parseData.uniqueSwapId];
        //}
        me.dispatchMessage(parseData);
    }
    /**
     * @member WebSocketService
     * @method {Function} dispatchMessage 分配消息
     * @param {Object|String} parseData
     */
    dispatchMessage(parseData: any) {
        let me = this;
        if (me.registerMessageCmp[parseData.msgType]) { // 找到消息服务组件
            me.clearEventTimeout(parseData.uniqueSwapId); //
            me.swapEventMap.delete(parseData.uniqueSwapId);
            me.registerMessageCmp[parseData.msgType].init(parseData, 2, me.webSocketProxy);
            me.registerMessageCmp[parseData.msgType].execute();
        }
        //throw new Error("please overwrite dispatchMessage function!");
    }
    /**
     * @member WebSocketService
     * @method {Function} close 关闭websocket
     */
    close() {
        let me = this;
        if (me.webSocket) me.webSocket.close();
    }
    static startMobileWebSocket(connIP: any, connPort: any) {
        if (WebSocketService.mobileWebSocket) {
            WebSocketService.mobileWebSocket.close();
        }
        /**
         * isMaster 是否主机/副机
         * storeId 什么店铺
         * optSystem 什么操作系统
         */
        var wsSocketUrl = "ws://" + connIP + ":" + connPort + "/?isMaster=Y&optSystem=MacOS&storeId=11112345566";
        //WebSocketService.mobileWebSocket = (wsSocketUrl, 60000);
    }



    /**查询有单桌台 */
    getSalesTable(data: { status: 0, }): Observable<any> {
        return Observable.create(observable => {
            data['tableName'] = "pos_salestable";
            this.sendObserveMessage("LOADDATA", [data]).subscribe(function (res) {
                observable.next(res);
            })
        });
    }

    /**取出对应桌台销售数据 */
    getSalesDataByTableId(dataParam, loadingData?: {}) {
        let data = {};
        return Observable.create(observable => {
            data['id'] = dataParam.id;
            data['tableName'] = "pos_salesh";
            data['isTheCashier'] = dataParam.isTheCashier;
            data['isUnRefresh'] = dataParam.isUnRefresh || false; //不是刷新才需要记录内存
            this.sendObserveMessage("LOADDATA", [data], loadingData).subscribe(function (res) {
                observable.next(res);
            })
        });
    }

    /**退菜 */
    doRetreatFood(data: { salesId, salesDetailId, lastUpdateBy, returnQty }): Observable<any> {
        return Observable.create(observable => {
            data = data;
            this.sendObserveMessage("RETURNDETAIL", data).subscribe(function (res) {
                observable.next(res);
            })
        });
    }


    /**上传日志 */
    upLogData(data: {}): Observable<any> {
        return Observable.create(observable => {
            data = data;
            this.sendObserveMessage("PRINTLOG", data, { isShowing: false }).subscribe(function (res) {
                observable.next(res);
            })
        });
    }
}