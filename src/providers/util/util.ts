import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AppConstants } from '../../app/app.constants';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class UtilProvider {
  alert: any;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public datePipe: DatePipe,
    public toastCtrl: ToastController,
    public appConstants: AppConstants,) {
  }

  /**
   * 加法函数，用来得到精确的加法结果
   *说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   *调用：accAdd(arg1,arg2)
   * 返回值：arg1加上arg2的精确结果
   * num:保留小数位 默认两位
   */
  accAdd(arg1: number, arg2: number, num: number = 2): number {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    let r1, r2, m, c;

    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }

    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));

    if (c > 0) {
      let cm = Math.pow(10, c);

      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    let tmp = (arg1 + arg2) / m;
    return this.formatNumDecimals(tmp, num, true)

  }

  /**
   * 减法函数，用来得到精确的减法结果
   *说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   * 调用：accSub(arg1,arg2)
   * 返回值：arg1加上arg2的精确结果
   * num:保留小数位 默认两位
   */
  accSub(arg1: number, arg2: number, num: number = 2): number {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    let r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }

    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    let tmp = ((arg1 * m - arg2 * m) / m).toFixed(n);
    return this.formatNumDecimals(tmp, num, true)
  }

  /**
   ** 乘法函数，用来得到精确的乘法结果
   ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   ** 调用：accMul(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精确结果
   **/
  accMul(arg1: number, arg2: number, num: number = 2): number {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 0;
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {
    }

    try {
      m += s2.split(".")[1].length;
    } catch (e) {
    }
    let tmp = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    return this.formatNumDecimals(tmp, num, true)
  }

  /**
   ** 除法函数，用来得到精确的除法结果
   ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   ** 调用：accDiv(arg1,arg2)
   ** 返回值：arg1除以arg2的精确结果
   **/
  accDiv(arg1: number, arg2: number, num: number = 2): number {
    arg1 = arg1 ? arg1 : 0;
    arg2 = arg2 ? arg2 : 1;
    let t1 = 0, t2 = 0, r1, r2;

    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }

    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    let tmp = (r1 / r2) * Math.pow(10, t2 - t1);
    return this.formatNumDecimals(tmp, num, true)
  }
  /**  
   * 小数位数超过设定值，保留的小数位数
   *  
   * @param maxNum保留的最大小数位数 | maxLength保留的小数位数 | forceFmt是否强制格式化
   */
  formatNumDecimals(num: any, maxLength: number, forceFmt?: boolean) {
    num = Number(num);
    var x = String(num).indexOf('.') + 1;   //小数点的位置
    var y = String(num).length - x;  //小数的位数
    if (forceFmt || (y > 0 && y > maxLength)) {
      num = num.toFixed(maxLength); //返回字符串
    }
    return Number(num);
  }


  /* 验证正数 */
  checkNumber(value) {
    var re = /^[0-9]\d*$/;
    if (!re.test(value)) {
      return false;
    } else {
      return true;
    }
  }
  /**
   * 验证是数字
   */
  checkDigital(value) {
    var re = /^[0-9]\d*(|\.)[0-9]{0,2}$/;
    if (!re.test(value)) return false;
    return true;
  }

  /**
   * 数据加载界面
   * @param {boolean} isShowing
   * @returns {Observable<any>}
   */
  showLoading(content: string) {
    this.loadingCtrl.create({
      mode: 'ios',
      showBackdrop: true,
      // content: content,
      backdropDismiss: false,
      // dismissOnPageChange: true,
      duration: 30000
    }).then(loading => {
      loading.present();
      return loading;
    });

  }

  /**
   * 关闭数据加载界面
   * @param loading
   */
  hide(loading) {
    if (loading) {
      loading.dismiss();
    }
  }

  public showAlert(title: string, message: string, isModal: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.alert) {
          this.alert.dismiss();
          this.alert = null;
        }
        this.alert = this.alertCtrl.create({
          header: title,
          message: message,
          backdropDismiss: !isModal,
          buttons: [{
            text: '确定',
            handler: () => {
              resolve({})
            }
          }]
        });
        this.alert.present();
      } catch (err) {
        console.log(err);
        reject({ err: err });
      }
    });
  }
  public showConfirm(title: string, message: string, isModal: boolean = false): Promise<any> {
    var me = this;
    return new Promise((resolve, reject) => {
      try {
        me.alertCtrl.create({
          header: title,
          message: message,
          backdropDismiss: !isModal,
          buttons: [
            {
              text: '取消',
              handler: () => {
                resolve({ res: "no" })
              }
            },
            {
              text: '确定',
              handler: () => {
                resolve({ res: "yes" })
              }
            }]
        }).then(alert => {
          alert.present();
        });

      } catch (err) {
        console.log(err);
        reject({ err: err });
      }
    });
  }

  /**
   * 判断是否最后一页
   * @param {number} currPage
   * @param {number} totalCount
   * @param {number} pageSize
   * @returns {boolean}
   */
  public isLast(currPage: number, totalCount: number, pageSize: number) {
    /*console.log("currPage:"+currPage);
    console.log("totalCount:"+totalCount);
    console.log("pageSize:"+pageSize);*/
    let totalPage = parseInt(totalCount / pageSize + "");
    if (totalCount % pageSize > 0) {
      totalPage += 1;
    }
    //console.log("totalPage:"+totalPage);
    if ((currPage + 1) > totalPage) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 把目标列表插入到原列表
   * @param source
   * @param target
   * @returns {any}
   */
  public concatList(source, target) {
    let ids = [];
    for (let k = 0; k < source.length; k++) {
      ids.push(source[k].id);
    }
    for (let i = 0; i < target.length; i++) {
      if (ids.indexOf(target[i].id) == -1) {
        source.push(target[i]);
      }
    }
    return source;
  }

  /**
   * 把目标列表插入到原列表
   * @param source
   * @param target
   * @returns {any}
   */
  public concatListAll(source, target) {
    for (let i = 0; i < target.length; i++) {
      source.push(target[i]);
    }
    return source;
  }

  public formatDate(date: Date, format: string) {
    var o = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S": date.getMilliseconds()
      // millisecond
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }

  public getLastMonthDate(data) {
    var t = new Date(data);
    var tm = new Date(t.getFullYear(), t.getMonth() - 1, t.getDate());
    var m = '0' + (tm.getMonth() + 1);
    var d = '0' + tm.getDate();
    return tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);
  }

  public getNearMonthDate(data, num) {
    var t = new Date(data);
    var tm = new Date(t.getFullYear(), t.getMonth() + num, t.getDate());
    var m = '0' + (tm.getMonth() + 1);
    var d = '0' + tm.getDate();
    return tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);
  }
  public genUUID(): string {
    let id = UUID.UUID().replace(/-/g, "0");
    return id;
  }

  public getUUID(): string {
    let id = UUID.UUID().replace(/-/g, "");
    return id;
  }

  /**将data类型时间转换成string类型
   * @data 时间
   * @form 格式
   */
  transformDatatoString(data: Date, form: string = "yyyy-MM-dd") {
    return this.datePipe.transform(data, form);
  }

  getNowTime(form: string = "yyyy-MM-dd HH:mm:ss") {
    let data = new Date();
    return this.datePipe.transform(data, form);
  }
  /**
   * 删除数组中的一个对象
   * @param list 
   * @param array 
   */
  dedelArrayByListById(list, array) {
    list = list.filter(item => item.id != array.id);
  }
  /** 
   * 获取毫秒时间
   * @method {Function} getMsTime 
   * @param 
   */
  getMsTime() {
    let date = new Date();
    return date.getTime();
  }

  presentToast(message, time: number = 1500) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: 'top',
      // showCloseButton: true,
      buttons: [{
        text: '关闭',
        side: 'end',
        role: 'cancel',
      }],
      // dismissOnPageChange: true,
    }).then(toast => {
      toast.onDidDismiss().then();
      toast.present();
    });


  }
  /**
   * 
   * @param value 
   */
  jsonTransformToString(value: any): any {
    if (value && value.length > 0) {
      let arr = JSON.parse(value);
      let str: string = '';
      for (let i in arr) {
        console.log(i);
        console.log(arr[i]);
        str = str + i + ':' + arr[i] + ';';
      }
      return str;
    } else {
      return '';
    }
  }

  stringPrintLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>  
    ///<param name="str">要获得长度的字符串</param>  
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  };


  getAlert(param: { title }) {
    return Observable.create(observable => {
      let alert = this.alertCtrl.create({
        header: param.title,
        // message: '该订单状态发生改变',
        // enableBackdropDismiss: false,
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              observable.next('yes');
            }
          },
        ]
      }).then(
        alert => {
          alert.present();
        }
      );
    });
  }
  /**
 * 是否空字符串
 * @param str
 * @returns {boolean}
 */
  static isEmptyString(str) {
    return str == null || String(str).trim().length == 0
  }

  showImg(url: string) {
    if (!UtilProvider.isEmptyString(url)) {
      PhotoViewer.show(url);
    } else {
      // this.photoViewer.show("assets/imgs/public/default-dish.png");

    }
  }

  /**
   * 选择一行显示商品数量
   * reture class类名
   * @param type 
   */
  selectShowItemNum(type) {
    type = Number(type) || 2
    if (type == 1) {
      return 'isShowSlab1 isShowSlabNoImg';
    } else if (type == 2) {
      return 'isShowSlab2 isShowSlabNoImg';
    } else if (type == 3) {
      return 'isShowSlab3 isShowSlabNoImg';
    } else if (type == 4) {
      return 'isShowSlab4 isShowSlabNoImg';
    } else {
      return 'isShowSlab1 isShowSlabNoImg';
    }

  }

  /**
   * @member UtilProvider
   * @method {Function} checkNumCorrect 检测数值是否正确
   * @param {any} numVal 数值 
   * */
  checkNumCorrect(numVal: any) {
    if (numVal && (numVal < 0 || numVal > this.appConstants.NUM_MAX_LENGTH)) return false;
    if (!this.checkDigital(numVal)) return false;
    return true;
  }
  /**
   * @member UtilProvider
   * @method {Function} getNumHintTxt 获取数值错误提示
   * @param 
   * @returns {String} numVal;
   */
  getErrorNumHintTxt() {
    return this.appConstants.NUM_LENGHT_ERROR_HINT;
  }

  /**
   * @member UtilProvider
   * @method {Function} checkNumEquals 检查数字是否相等
   * @param {Number|String} srcNum  原数字
   * @param {Number} destNum  目标数字
   */
  checkNumEquals(srcNum: any, destNum: number) {
    if (this.checkDigital(srcNum)) {
      if (parseFloat(srcNum) === destNum) return true;
      return false;
    }
    return false;
  }


  //确认
  /**
   * 
   * @param data 
   * @param methods 
   */
  checkIsContinue(data, methods: { cancel?, continue }) {
    let doConfirm = false;
    this.alertCtrl.create({
      header: '提示',
      message: data.message,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            doConfirm = true;
          }
        }
      ]
    }).then(alert => {
      alert.present();
      alert.onDidDismiss().then(() => {
        if (doConfirm) {
          methods.continue && methods.continue();
        } else {
          methods.cancel && methods.cancel()
        }
      });
    });
  }

  doRadio(data: { soursMap, checked, title, cssClass?}, methods: { handler }) {
    let soursMap = data.soursMap;
    let checked = data.checked;
    var ca = this.appConstants.getKeys(soursMap);
    let inputs = [];
    for (let item of ca) {
      inputs.push({
        type: 'radio',
        label: soursMap[item],
        disabled: false,
        value: item,
        checked: item == checked,
        handler: alert => {
          alert.dismiss();
          methods.handler && methods.handler(item);
        }
      });
    }
    this.alertCtrl.create(
      {
        cssClass: data.cssClass || 'spec-alert',
        header: data.title,
        inputs: inputs,
        buttons: [{
          text: '取消',
          role: "",
        }]
      }).then(alert => {
        alert.present();
      });

  }


  timeFn(d1) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    let dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))//计算出小时数
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))//计算相差分钟数
    //计算相差秒数
    let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)
    console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");
    return { dayDiff: dayDiff, hours: hours, minutes: minutes, seconds: seconds };
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
    //   , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
  }
  subTimeMinutes(d1) {
    let dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
    let dateEnd = new Date();//获取当前时间
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let minutes = Math.floor(dateDiff / (60 * 1000))//计算相差分钟数
    // console.log(" 相差 " + minutes + " 分钟");
    return minutes;
  }

  orderby(arr, selector) {
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left = [];
    const right = [];

    for (const i of arr) {
      if (selector(i) < selector(pivot)) {
        left.push(i);
      } else {
        right.push(i);
      }
    }
    return this.orderby(left, selector).concat([pivot], this.orderby(right, selector));
  }



}
