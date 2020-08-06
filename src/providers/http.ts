import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from "../app/app.config";
import { LoadingController, Platform, } from "@ionic/angular";
import { NativeProvider } from "./native";
import { AppCache } from '../app/app.cache';
import { AppConstants } from '../app/app.constants';
import { DatePipe } from '@angular/common';
import { Observable, TimeoutError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { from } from 'rxjs';
import { Network } from '@ionic-native/network';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class HttpProvider {
  _isMobileDevice: boolean;

  //_isloading: boolean = false;
  refreshTokenInterval: any;

  constructor(public httpClient: HttpClient, @Inject(APP_CONFIG) private config: AppConfig, public loadingCtrl: LoadingController, private datePipe: DatePipe,
    public nativeProvider: NativeProvider, public platform: Platform, public appCache: AppCache, public appConstants: AppConstants) {

    this._isMobileDevice = this.isMobileDevice()
  }

  /**
   * 验证是否手机号码
   * @param mobile
   * @returns {boolean}
   */
  static isMobile(mobile) {
    //定义手机号码正规表达式
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

    return reg.test(mobile);
  }

  //验证是否固定电话
  static isTelNum(tel) {
    //定义手机号码正规表达式
    let reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

    return reg.test(tel);
  }

  /**
   * 验证是否身份证
   * @param idNumber
   */
  static isCitizenIDNumber(idNumber) {
    let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

    return reg.test(idNumber);
  }

  /**
   * 验证是否email
   * @param {string} email
   */
  static isEmail(email: string) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
  }


  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   * @returns {string}
   */
  getNetworkType(): string {
    if (!this._isMobileDevice) {
      return 'wifi';
    }

    return Network.type;
  }

  /**
   * 是否真机环境
   * @returns {boolean}
   */
  isMobileDevice(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 判断是否有网络
   * @returns {boolean}
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 是否空字符串
   * @param str
   * @returns {boolean}
   */
  static isEmptyString(str) {
    return str == null || String(str).trim().length == 0
  }

  /**
   * 检查登录密码格式
   * @param pwd
   * @returns {boolean}
   */
  static checkPwd(pwd) {
    pwd = pwd.trim();

    if (pwd.length < 6 || pwd.length > 20) {
      // return "密码长度为6-30位";
      return false;
    } else {
      //if (/^\d+$/.test(pwd)) {
      //   // return "全数字";
      //   return false;
      // } else if (/^[a-z]+$/i.test(pwd)) {
      //   // return "全字母";
      //   return false;
      // } else if (!/^[A-Za-z0-9]+$/.test(pwd)) {
      //   // return "只能含有数字有字母";
      //   return false;
      // }
      return true;
    }
  }

  /**
   * 匹配ip地址
   * @param ipAddress
   * @returns {boolean}
   */
  static checkIP(ipAddress) {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;

    return reg.test(ipAddress)
  }

  static isPriceNum(str: string | number): boolean {
    let reg = /^[0-9]{1,5}([.]\d{1,2})?$/;

    return reg.test(str + '')
  }

  static isDecimal(str: string | number) {
    let reg = /^(\d+|\d+\.\d*)$/;

    return reg.test(str + '')
  }

  static isStringOrNum(str: string) {
    return /^[A-Za-z0-9]+$/.test(str)
  }

  static isNum(str: string) {
    return /^[0-9]+$/.test(str)
  }

  static isNumOrSlash(str: string) {
    return /^[0-9\-]+$/.test(str)
  }

  /**
   * 是否包含标点符号
   * @param {string} str
   * @returns {boolean}
   */
  static hasPunctuation(str: string) {
    let reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/;

    return reg.test(str)
  }

  //字符串截取
  stringCutOut(st: string, start, end) {
    // st=st.toString();
    return st.substring(start, end)
  }
  /**
   * json参数处理
   * @param {{}} json
   * @returns {string}
   */
  serialize(json = {}) {
    let paramArr = [];
    if (Object.keys(json).length > 0) {
      for (let key in json) {
        if (json[key] != null) {
          paramArr.push(key + '=' + json[key])
        } else {
          paramArr.push(key + '=' + null)
        }
      }
    }

    return encodeURI(paramArr.join('&'))
  }

  //得到一天凌晨的时间戳
  getDayStartTime(data: Date) {
    let data1 = new Date(data);
    data1.setHours(0);
    data1.setMinutes(0);
    data1.setSeconds(0);
    data1.setMilliseconds(0);
    return data1.getTime();
  }
  //得到一天结束的时间戳
  getDayEndTime(data: Date) {
    let data1 = new Date(data);
    data1.setHours(23);
    data1.setMinutes(59);
    data1.setSeconds(59);
    data1.setMilliseconds(999);
    return data1.getTime();
  }
  //得到日期
  getDay(data: Date) {
    return this.datePipe.transform(data, "yyyy-MM-dd");
  }
  //得到日期
  getDayAndTime(data: Date) {
    return this.datePipe.transform(data, "yyyy-MM-dd HH:mm:ss");
  }
  dateChange(flag) {
    let today = new Date();
    let day = today.getDay() == 0 ? 7 : today.getDay();
    let endTime = new Date();
    let startTime = new Date();

    switch (flag) {
      case 1:
        endTime = today;
        startTime = today;
        break;
      case 2:
        endTime = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
        startTime = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
        break;
      case 3:
        endTime = new Date(today.getTime());
        startTime = new Date(today.getTime() - (day - 1) * 24 * 60 * 60 * 1000);
        break;
      case 4:
        endTime = new Date(today.getTime());
        startTime = new Date(today.getTime() - (today.getDate() - 1) * 24 * 60 * 60 * 1000);
        break;
      case 5:
        endTime = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
        startTime = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
        break
      case 6:
        endTime = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
        startTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break
      case 7:
        endTime = new Date(today.getTime() - day * 24 * 60 * 60 * 1000);
        startTime = new Date(today.getTime() - (day + 6) * 24 * 60 * 60 * 1000);
        break
      case 8:
        let tmp = new Date(today.getTime() - today.getDate() * 24 * 60 * 60 * 1000);
        endTime = tmp;
        startTime = new Date(tmp.getTime() - (tmp.getDate() - 1) * 24 * 60 * 60 * 1000);
        break
    }
    return { endTime: endTime, startTime: startTime }
  }

  /**
     * 自动刷新登录token
     */
  public refreshToken(): Observable<Object> {
    //如果已经存在，则先停止
    let me = this;
    return Observable.create(observer => {
      let currentTime = new Date().getTime();
      if (this.appCache.userToken.lastestlogtime.getTime() + this.appCache.userToken.expiresSecond * 1000 > currentTime + 10 * 60 * 1000) {
        observer.next(true);
      } else {
        let dataJson = {
          'grant_type': 'refresh_token',
          'refresh_token': this.appCache.userToken.refreshToken
        };
        me.doRequest({ method: 'POST', url: `${me.config.APPL_SERVICE}auth/oauth/token`, serialize: me.serialize(dataJson), noAuth: true, showLoading: false, isReturnAll: true }).subscribe(res => {
          this.appCache.userToken = {
            accessToken: res['access_token'],
            expiresSecond: res['expires_in'],
            refreshToken: res['refresh_token'],
            lastestlogtime: new Date()
          };
          observer.next(true);

        }, error => {
          let loginJson = {
            username: this.appCache.user.username,
            password: this.appCache.user.password,
            randomStr: '' + Math.ceil(Math.random() * 100000) + Date.now()
          };
          this.appCache.userToken = null;

          me.doRequest({ method: 'POST', url: `${this.config.UCENTER_SERVICE}/ucenter/getToken`, serialize: JSON.stringify(loginJson), isJson: true, noAuth: true, showLoading: false, isReturnAll: true }).subscribe(res => {
            this.appCache.userToken = {
              accessToken: res['data'].access_token,
              expiresSecond: res['data'].expires_in,
              refreshToken: res['data'].refresh_token,
              lastestlogtime: new Date()
            };
            observer.next(true);

          }, error => {
            me.showToast("您的登录已过期，请重新登录");
            // me.app.getRootNav().setRoot(SignInPage, {}, { animate: true, direction: 'back' });
            observer.error(error);
          });
        });
      }
    });
  }

  /**
   * 自动刷新登录token
   */
  public request(data: {
    method: string, url: string, serialize?: string, showLoading?: boolean, content?: string,
    isReturnAll?: boolean, isJson?: boolean, noAuth?: boolean
  }): Observable<Object> {
    //如果已经存在，则先停止
    let me = this;
    let currentTime = new Date().getTime();
    if (this.appCache.userToken.lastestlogtime.getTime() + this.appCache.userToken.expiresSecond * 1000 > currentTime + 10 * 60 * 1000) {
      return me.doRequest(data);
    } else {
      return Observable.create(observer => {
        this.refreshToken().subscribe(() => {
          me.execRequest(observer, data);
        }, error => {
          observer.error(error);
        });
      });
    }
  }

  /**
   * 发起请求
   * @param {string} method
   * @param {string} url
   * @param {string} serialize
   * @returns {Observable<Object>}
   */
  public doRequest(data: {
    method: string, url: string, serialize?: string, showLoading?: boolean, content?: string,
    isReturnAll?: boolean, isJson?: boolean, noAuth?: boolean
  }): Observable<Object> {
    let me = this;
    return Observable.create(observer => {
      me.execRequest(observer, data);
    });
  }

  public execRequest(observer, data: {
    method: string, url: string, serialize?: string, showLoading?: boolean,
    content?: string, isReturnAll?: boolean, isJson?: boolean, noAuth?: boolean
  }) {

    let me = this;
    let headers = {};
    if (!data.noAuth) {
      headers["isAuth"] = "1";
    }
    if (data.isJson) {
      headers["isJson"] = "1";
    }

    if (!data.content || data.content == '') {
      data.content = "正在加载数据，请稍后...";
    }
    me.loadingPresent(data.showLoading, data.content).subscribe(loading => {
      me.httpClient.request(data.method, data.url, { body: data.serialize, headers: headers }).pipe(timeout(me.appConstants.REQ_TIMEOUT)).subscribe(res => {
        if (res['code'] == 0 || res['access_token'] || res['records']) {
          me.loadingDismiss(loading);
          if (data.showLoading && res['msg'] && res['msg'].length > 0) {
            // me.showToast(res['msg']);
          }
          observer.next(res);

        } else if (!res['code'] && (data.url.indexOf('base/menu/getUserTree') > -1
          || data.url.indexOf('api/posStoreStaffroleAuthority/getAllAuthority') > -1
          || data.url.indexOf('api/posPromh/getPromotionDetail') > -1)) {
          observer.next(res)
        } else {
          me.loadingDismiss(loading);
          if (data.isReturnAll) {
            observer.error(res)
          } else {
            let msg = res['msg'] ? res['msg'] : '请求失败,请稍后再试';
            me.showToast(msg);
            observer.next(res)
          }
        }
      }, err => {
        me.loadingDismiss(loading);
        if (err.status == 401 && !data.noAuth) {
          me.showToast("您的登录已过期，请重新登录");
          // me.app.getRootNav().setRoot(SignInPage, {}, { animate: true, direction: 'back' });
          //observer.error(err);
        } else {
          if (data.isReturnAll) {
            observer.error(err)
          } else {
            me.requestFailedHandle(err);
          }
        }
      }, () => {
        if (data.showLoading) {
          me.loadingDismiss(loading)
        }
      })
    });
  }

  requestFailedHandle(err: Response) {
    let msg: string = '请求发生异常';
    if (err instanceof TimeoutError) {
      msg = '请求超时,请稍后再试';
    } else if (!this.isConnecting()) {
      msg = '网络连接不可用，请稍后重试';
    } else {
      let status = err.status;
      if (status === 0) {
        msg = '请求失败，请求响应出错';
      } else if (status === 404) {
        msg = '请求失败，未找到请求地址';
      } else if (status === 500) {
        msg = '服务出错，请稍后再试';
      } else if (status === 502) {
        msg = '连接服务器失败，请确认网络服务是否打开';
      }
    }
    this.showToast(msg);
    return err;
  }

  /**
   * 数据加载界面
   * @param {boolean} isShowing
   * @returns {Observable<any>}
   */
  loadingPresent(isShowing: boolean, content: string, noSpinner: boolean = false, exitFlag: boolean = false): Observable<any> {
    return Observable.create(observer => {
      if (isShowing) {
        let promise = this.loadingCtrl.create({
          // spinner: noSpinner ? 'hide' : 'ios',
          // content: content,
          // enableBackdropDismiss: false,
          // dismissOnPageChange: true,
          message: content,
          duration: 30000
        }).then(loading => {
          loading["exitFlag"] = exitFlag;
          from(promise).subscribe(() => {
            observer.next(loading)
          })
        });

      } else {
        observer.next('OK')
      }
    })
  }

  /**
   * 关闭数据加载界面
   * @param loading
   */
  loadingDismiss(loading) {
    if (loading && loading.dismiss) {
      loading.dismiss().then().catch((err) => { console.log("loadingDismiss: " + err); });
    }
  }

  /**
   * 检查版本号
   * @param { optSystem: string,versionCode:string,showLoading?:boolean}data
   * @returns {Observable<Object>}
   */
  checkAgentVersion(optSystem: string, showLoading?: boolean) {
    return this.doRequest({ method: 'GET', url: `${this.config.UCENTER_SERVICE}/ucenter/VerMgr/version/${optSystem}`, showLoading: showLoading, isReturnAll: !showLoading, noAuth: true, content: '正在检查是否有新版本，请稍后' });
  }


  showToast(content: string, exitFlag: boolean = false, time: number = 1000) {
    var me = this;
    // if(me.isMobileDevice()) {
    //   me.nativeProvider.showShortCenter(content);
    // } else {
    //   me.loadingPresent(true, content, true).subscribe(loading => {
    //     setTimeout(function() {
    //       me.loadingDismiss(loading);
    //     }, 1000);
    //   }); 
    // }  
    me.loadingPresent(true, content, true, exitFlag).subscribe(loading => {
      setTimeout(function () {
        me.loadingDismiss(loading);
      }, time);
    });
  }

}
