import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app/app.config";
// import { OrderProvider } from "./order/order";
import { NativeProvider } from "./native";
import { UtilProvider } from "./util/util";
import { SysMsgDao } from '../dao/sysMsgDao';
import { SysMsg, MSG_KEY_MEDIA, } from '../domain/sysMsg';
import { SellerDao } from '../dao/sellerDao';
import { UserDao } from '../dao/userDao';
import { Seller } from '../domain/seller';
import { HttpProvider } from './http';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MSG_KEY_SYS } from '../domain/sysMsg';
import { AppCache } from '../app/app.cache';
import { AppConstants } from '../app/app.constants';
// import { NativeAudio } from '@ionic-native/native-audio';
// import { PushOriginal } from '@ionic-native/push';

/**
 * 消息推送
 */
@Injectable({
  providedIn: 'root',
})
export class PushProvider {
  pushWebSocket: WebSocket = null;
  socketInterval = null;
  heartInterval = null;
  receivablesList = [];
  pushType = {
    table: 'ORDER', //微信小程序餐桌
    waimai: 'WAIMAI', //微信小程序外卖
    cash: 'CASH', //微信小程序收款
    message: "normalInfoMqMsg", //消息通知
  };

  constructor(@Inject(APP_CONFIG) private config: AppConfig, public nativeProvider: NativeProvider, public appConstants: AppConstants,
    private util: UtilProvider, private sysMsgDao: SysMsgDao, private sellerDao: SellerDao, private http: HttpProvider, private datePipe: DatePipe, public appCache: AppCache,
    private decimalPipe: DecimalPipe, public userDao: UserDao,
    //private push:PushOriginal,
  ) {

  }

  /**
   * 创建推送连接
   * @returns {___anonymous_pushWebSocket}
   */
  public startPushWebSocket(): WebSocket {
    if ('WebSocket' in window) {
      try {
        let jktranstionid = `${this.appConstants.SYSCODE}-${this.appCache.seller.storeSysCode}-${this.datePipe.transform(new Date(), 'yyyyMMddhhmmsss')}-${Math.ceil(Math.random() * 10000)}`;
        let url = this.config.PUSH_URL + "?auth=Bearer " + this.appCache.userToken.accessToken + "&cptype=VB&posid=0&isMaster=1&jktranstionid=" + jktranstionid;
        let webSocket = new WebSocket(url);

        webSocket.onopen = () => {
          console.log('消息推送服务连接成功! ' + url);
        };

        webSocket.onmessage = (event) => {
          console.log('接收消息', JSON.stringify(event.data));
          this.dealPushMessage(event.data);
        };

        webSocket.onerror = (event) => {
          console.log('消息推送服务处理错误! ');
          if (this.pushWebSocket) {
            this.pushWebSocket.close();
            this.pushWebSocket = null;
          }
        };

        webSocket.onclose = () => {
          // console.log('消息推送服务关闭! ');
          this.pushWebSocket = null;
        };
        return webSocket;
      } catch (err) {
        console.log('Websocket连接出错', err);
        return null
      }
    } else {
      throw new Error('框架不支持 WebSocket!');
    }
  }

  public autoConnetionPush() {
    if (this.appCache.seller.id) {
      if (this.pushWebSocket) {
        this.pushWebSocket.close();
        this.pushWebSocket = null;
      }
      this.pushWebSocket = this.startPushWebSocket();
    }

    //如果已经存在，则先停止
    if (this.socketInterval) {
      clearInterval(this.socketInterval);
    }
    this.socketInterval = setInterval(() => {
      if (!this.appCache.seller.id) {
        return;
      }
      if (!this.pushWebSocket || this.pushWebSocket.readyState != 1) {
        this.http.refreshToken().subscribe(res => {
          this.pushWebSocket = this.startPushWebSocket();
        });
      }
    }, 5000);

    //如果已经存在，则先停止
    if (this.heartInterval) {
      clearInterval(this.heartInterval);
    }

    //一分钟发起一次心跳
    this.heartInterval = setInterval(() => {
      if (!this.appCache.seller.id) {
        return;
      }
      if (this.pushWebSocket && this.pushWebSocket.readyState == 1) {
        let data = {
          bizType: 'p2'
        };
        this.pushWebSocket.send(JSON.stringify(data));
        //console.log('发起心跳 !');
      }
    }, 60000);
  }

  /**
   * 处理推送消息
   * @param message
   */
  public dealPushMessage(message) {
    let mData = JSON.parse(message);

    if (mData.pushType == this.pushType.table) {//处理桌台订单消息
      // this.dealPushTable(mData);
    } else if (mData.pushType == this.pushType.waimai) {  //处理外卖订单消息
      // this.dealPushWaimai(mData);
    } else if (mData.pushType == this.pushType.cash) {  //处理收款消息
      this.dealPushCasg(mData);
    } else if (mData.bizType == this.pushType.message) {
      this.dealMessage(mData);
    }
  }

  public dealMessage(mData) {
    if (mData.msg instanceof Array) {
      for (let msg of mData.msg) {
        this.doDealMessage(msg);
      }
    } else {
      this.doDealMessage(mData.msg);
    }
  }

  /**
   * 检查用户是否想要接收该消息
   * @param bizType 
   */
  public getMsgStatus(bizType): boolean {
    if (!this.appCache.user.noticeConfig || !this.appCache.user.noticeConfig.hasOwnProperty(bizType)) {
      return true;
    } else {
      return this.appCache.user.noticeConfig[bizType];
    }
  }

  //处理通知消息
  public doDealMessage(msg, isAlert = true) {
    let tmpMsg;
    if (!msg.id) {
      tmpMsg = new SysMsg();
      tmpMsg.id = this.util.genUUID();
      tmpMsg.title = "爱宝团队";
      tmpMsg.bizType = MSG_KEY_SYS;
      tmpMsg.pushTime = new Date().getTime();
      tmpMsg.storeId = this.appConstants.SYS_SELLER_ID;
      tmpMsg.content = msg;
      tmpMsg.subcontent = "爱宝系统消息";
    } else {
      if (this.getMsgStatus(msg.bizType) == false) {
        return;
      }
      tmpMsg = msg
    }
    let sysMsg = this.sysMsgDao.initEntity(SysMsg.toJson(), tmpMsg);
    this.sysMsgDao.set(sysMsg).then(() => {

      for (let seller of this.appCache.subSellers) {
        if (sysMsg.storeId == null || sysMsg.storeId == '') {
          sysMsg.storeId = this.appConstants.SYS_SELLER_ID; //系统通知
        }
        if ((this.appCache.subSellers.length == 1 && sysMsg.storeId == this.appConstants.SYS_SELLER_ID) //如果只有一个店铺，系统通知显示在该店铺中
          || sysMsg.storeId == seller.id) {
          seller["secMsg"] = seller["lastMsg"];
          seller["secMsgTime"] = seller["lastMsgTime"];
          seller["lastMsg"] = sysMsg.title + (sysMsg.transAmt ? '￥' + this.decimalPipe.transform(sysMsg.transAmt, '1.2-2') : '');
          seller["lastMsgTime"] = sysMsg.pushTime;
          if (this.appCache.msgShowed && this.appCache.selSeller && this.appCache.selSeller.id == seller.id) {
            seller["msgNum"] = 0;
          } else {
            seller["msgNum"] = seller["msgNum"] + 1;
            this.appCache.totalMsgNum = this.appCache.totalMsgNum + 1;
          }

          if (this.appCache.subSellers.length == 1) {
            this.appCache.sysMsgs.unshift(sysMsg);
            if (this.appCache.sysMsgs && this.appCache.sysMsgs.length > 1000) {
              this.appCache.sysMsgs.pop();
            }
          }

          let tmpSeller = this.sellerDao.initEntity(Seller.toJson(), seller);
          this.sellerDao.set(tmpSeller);
          break;
        }
      }

      this.appCache.subSellers.sort(function (m, n) {
        if (m.lastMsgTime < n.lastMsgTime) return 1
        else if (m.lastMsgTime > n.lastMsgTime) return -1
        else return 0
      });

      if (sysMsg.pushTime > this.appCache.sysMsg0.pushTime) {
        this.appCache.sysMsg1 = this.appCache.sysMsg0;
        this.appCache.sysMsg0 = sysMsg;
        if (sysMsg.transAmt) {
          this.appCache.sysMsg0.title = sysMsg.title + (sysMsg.transAmt ? '￥' + this.decimalPipe.transform(sysMsg.transAmt, '1.2-2') : '');
        }
      }
      if (isAlert) {
        this.nativeProvider.msgNotification(sysMsg, this.getMsgStatus(MSG_KEY_MEDIA));
      }

    });

  }





  /**
   * 处理收款推送
   * @param mData
   */
  public dealPushCasg(mData) {
    console.log(mData);
    if (mData.type == "15") {
      // this.events.publish('store:pay', { status: '1' });
      return;
    }

    if (mData.type == "4") {
      let date = new Date();
      date.setTime(mData.pushTime);
      let list = [];
      list.push({ amount: mData.amount, pushTime: this.util.formatDate(date, 'yyyy-MM-dd hh:mm:ss') });
      this.util.concatListAll(list, this.receivablesList);
      this.receivablesList = list;
      console.log(this.receivablesList)
    } else {
      let date = new Date();
      date.setTime(mData.pushTime);
      let list = [];
      list.push({ amount: mData.amount, pushTime: this.util.formatDate(date, 'yyyy-MM-dd hh:mm:ss') });
      this.util.concatListAll(list, this.receivablesList);
      this.receivablesList = list;
      console.log(this.receivablesList)
      //this.events.publish('receivables-code:pay', {amount: mData.amount,pushTime: this.util.formatDate(date,'yyyy-MM-dd hh:mm:ss')});
    }

    if (this.appCache.processing_cash) {
      //播放声音
      if (mData.type == "4") {
        this.nativeProvider.onekeyPayPlay();
      } else {
        this.nativeProvider.qrPayPlay();
      }
    }
  }

  public closeSocket() {
    if (this.pushWebSocket != null) {
      this.pushWebSocket.close();

    }

    if (this.socketInterval != null) {
      clearInterval(this.socketInterval)
    }

    if (this.heartInterval) {
      clearInterval(this.heartInterval);
    }

    //this.appCache.processing_waimai = false;
    //this.appCache.processing_table = false;
  }
}
