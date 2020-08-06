import { Inject, Injectable } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Vibration } from '@ionic-native/vibration';
import { APP_CONFIG, AppConfig } from "../app/app.config";
import { Toast } from "@ionic-native/toast";
import { Platform, } from "@ionic/angular";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { Observable } from "rxjs";
import { NativeAudio } from '@ionic-native/native-audio';
import { File } from "@ionic-native/file";
import { LibraryItem, PhotoLibrary } from "@ionic-native/photo-library";
import { Network } from "@ionic-native/network";
import { AppCache } from '../app/app.cache';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { SysMsg } from '../domain/sysMsg';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { Badge } from '@ionic-native/badge';
import { AppConstants } from '../app/app.constants';
import { UtilProvider } from './util/util';
// import { HttpProvider } from './http';

/*
  Generated class for the NativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class NativeProvider {
  _isMobileDevice: boolean;
  storageDirectory: string;
  remindNumber: number = 0;


  bluetoothMap = new Map();
  msgPlayFlag: boolean = false;
  constructor(@Inject(APP_CONFIG) private config: AppConfig, public appCache: AppCache,
    public platform: Platform,
    public util: UtilProvider,
    public appConstants: AppConstants) {
    this._isMobileDevice = this.platform.is('mobile') && !this.platform.is('mobileweb')
  }

  initSound() {
    NativeAudio.preloadSimple('new_msg', this.appConstants.MSG_SOUND).then(
      function () {
        console.log("成功加载new_msg.mp3");
        this.msgPlayFlag = true;
      },
      function (error) { console.log("加载失败new_msg.mp3 " + error); }
    );
    NativeAudio.preloadSimple('number_0', this.appConstants.MSG_SOUND_NUMBER_0).then(
      function () { console.log("成功加载number_0"); }, function (error) { console.log("number_0" + error); }
    );
    NativeAudio.preloadSimple('number_1', this.appConstants.MSG_SOUND_NUMBER_1).then(
      function () { console.log("成功加载number_1"); }, function (error) { console.log("number_1" + error); }
    );
    NativeAudio.preloadSimple('number_2', this.appConstants.MSG_SOUND_NUMBER_2).then(
      function () { console.log("成功加载number_2"); }, function (error) { console.log("number_2" + error); }
    );
    NativeAudio.preloadSimple('number_3', this.appConstants.MSG_SOUND_NUMBER_3).then(
      function () { console.log("成功加载number_3"); }, function (error) { console.log("number_3" + error); }
    );
    NativeAudio.preloadSimple('number_4', this.appConstants.MSG_SOUND_NUMBER_4).then(
      function () { console.log("成功加载number_4"); }, function (error) { console.log("number_4" + error); }
    );
    NativeAudio.preloadSimple('number_5', this.appConstants.MSG_SOUND_NUMBER_5).then(
      function () { console.log("成功加载number_5"); }, function (error) { console.log("number_5" + error); }
    );
    NativeAudio.preloadSimple('number_6', this.appConstants.MSG_SOUND_NUMBER_6).then(
      function () { console.log("成功加载number_6"); }, function (error) { console.log("number_6" + error); }
    );
    NativeAudio.preloadSimple('number_7', this.appConstants.MSG_SOUND_NUMBER_7).then(
      function () { console.log("成功加载number_7"); }, function (error) { console.log("number_7" + error); }
    );
    NativeAudio.preloadSimple('number_8', this.appConstants.MSG_SOUND_NUMBER_8).then(
      function () { console.log("成功加载number_8"); }, function (error) { console.log("number_8" + error); }
    );
    NativeAudio.preloadSimple('number_9', this.appConstants.MSG_SOUND_NUMBER_9).then(
      function () { console.log("成功加载number_9"); }, function (error) { console.log("number_9" + error); }
    );



    // this.newOrder_sound = this.media.create('file:///android_asset/www/assets/sounds/autoordersound.mp3');
    // this.fail_sound = this.media.create('file:///android_asset/www/assets/sounds/auto_accept_fail.mp3');
    // this.receipt_sound = this.media.create('file:///android_asset/www/assets/sounds/base_napos_alert.mp3');
    // this.nonetwork_sound = this.media.create('file:///android_asset/www/assets/sounds/net_disconnect.mp3');
    // this.nodivice_sound = this.media.create('file:///android_asset/www/assets/sounds/bt_device_disconnect.mp3');
    // this.zt_receipt_sound = this.media.create('file:///android_asset/www/assets/sounds/zt_autoordersound.mp3');
    // this.zt_new_sound = this.media.create('file:///android_asset/www/assets/sounds/zt_base_napos_alert.mp3');
    // this.zt_fail_sound = this.media.create('file:///android_asset/www/assets/sounds/zt_auto_accept_fail.mp3');
    // this.onekey_pay_sound = this.media.create('file:///android_asset/www/assets/sounds/1key_pay.mp3');
    // this.QR_pay_sound = this.media.create('file:///android_asset/www/assets/sounds/QR_pay.mp3');

  }
  /**
* 新订单
*/
  msgNewOrder() {
    if (!this._isMobileDevice) {
      console.log("msgPlay: not mobile");
      return;
    }
    NativeAudio.play('new_msg').then(
      function () {
        console.log("成功播放new_msg.mp3");
        // NativeAudio.stop();
      },
      function (error) { console.log("播放失败new_msg.mp3" + error); }
    );

  }

  playListNumSound(num, index = 0) {
    let list = String(num).split('');
    console.log(list);
    let length = list.length;
    let soundId = 'number_' + list[index];
    if (!this._isMobileDevice) {
      console.log("msgPlay: not mobile");
      return;
    }
    let me = this;
    NativeAudio.play(soundId).then(
      function () {
        console.log("成功播放" + soundId);
        // me.nativeAudio.stop(soundId);
        index++;
        if (index < length) {
          setTimeout(() => {
            NativeAudio.stop(soundId);
            me.playListNumSound(num, index);
          }, 300);

        }
      },
      function (err) {
        console.log("播放失败" + soundId + err);
      },
    )
  }


  /**
   *
   * @param {string} msg
   */
  showShortCenter(msg: string) {
    console.warn(msg);

    if (this._isMobileDevice) {
      Toast.showShortCenter(msg).subscribe(() => {
      });
    }
  }

  /**
   * 手机拍照
   * @param {CameraOptions} options
   * @returns {Promise<any>} image fileRUL
   */
  getPicture(options?: CameraOptions): Promise<any> {
    let _options = Object.assign({}, {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    }, options);

    return Camera.getPicture(_options)
  }

  /**
   * 上传图片
   * @param {string} file_path
   * @param {string} file_name
   * @param {string} dir 不包含文件名
   * @returns {Promise<any>}
   */
  upload(file_path: string, file_name: string, dir?: string): Promise<any> {
    let _dir = `${this.config.IMAGE_BASEURL}/${this.appCache.seller.id}${dir ? '/' + dir : ''}/${file_name}`; //上传路径
    let _file_name: string;  //文件名称

    if (file_path.lastIndexOf('?') > 0) { //相册选择路径带 '?'
      _file_name = file_path.substring(file_path.lastIndexOf('/') + 1, file_path.lastIndexOf('?'));
    } else { //拍照
      _file_name = file_path.substr(file_path.lastIndexOf('/') + 1);
    }

    console.log(_file_name);

    let _file_path = file_path.substring(0, file_path.lastIndexOf('/')); //文件路径
    let suffix = _file_name.substr(_file_name.lastIndexOf('.') + 1); //后缀
    let _type = `image/${suffix}`;

    let me = this;
    console.log(_file_path);

    return new Promise((resolve, reject) => {
      File.readAsArrayBuffer(_file_path, _file_name).then((data: ArrayBuffer) => {
        let xhr = new XMLHttpRequest();

        console.log(this.config.IMAGE_UPLOAD);
        xhr.open("POST", this.config.IMAGE_UPLOAD, true);

        xhr.onload = function () {
          console.log("onload: " + xhr.readyState + " " + xhr.status);
          if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Request finished. Do processing here.
            console.log("onload responseText: " + xhr.responseText);
            resolve({ response: xhr.responseText })
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            })
          }
        };

        xhr.onerror = function () {
          console.log("onerror : " + xhr.statusText + xhr.status);
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        };

        let formData = new FormData();
        formData.append('dir', _dir);

        formData.append('file', new Blob([new Uint8Array(data)], { type: _type }));

        xhr.send(formData);

      }, error => {
        console.log(error);
        reject(error)
      })
    })

    // let options: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: `${file_name}`,
    //   headers: {},
    //   params: {
    //     dir: _dir
    //   }
    // };
    // return this.fileTransfer.upload(file_path, this.config.IMAGE_UPLOAD, options)
  }

  download(url): Promise<LibraryItem> {
    return new Promise((resolve, reject) => {
      PhotoLibrary.requestAuthorization().then(() => {
        PhotoLibrary.saveImage(url, '移动收银').then(item => {
          resolve(item)
        }, error => {
          reject({ type: 'request failed', error: error })
        })
      }, error => {
        reject({ type: 'permission denial', error: error })
      })
    })
  }

  /**
   * 扫描二维码
   * @returns {Observable<Object>}
   */
  scan(): Observable<Object> {
    return Observable.create(observer => {
      QRScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted


            // start scanning
            let scanSub = QRScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);

              observer.next(text);

              QRScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });

            // show camera preview
            QRScanner.show();

            // wait for user to scan something, then the observable callback will be called

          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
    })
  }

  /**
   * 新订单
   */
  play() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.newOrder_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.newOrder_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.newOrder_sound.onError.subscribe(error => console.log('Error!', error));
    // this.newOrder_sound.play();
  }

  /**
   * 接收新订单失败!
   */
  failPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.fail_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.fail_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.fail_sound.onError.subscribe(error => console.log('Error!', error));
    // this.fail_sound.play();
  }

  /**
   * 新订单
   */
  receiptPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    try {
      NativeAudio.play('new_msg').then(
        function () {
          console.log("成功播放new_msg.mp3");
          // NativeAudio.stop();
        },
        function (error) { console.log("播放失败new_msg.mp3" + error); }
      );
    } catch (error) {
      console.log('播放音频文件失败', error);

    }

    // this.receipt_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.receipt_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.receipt_sound.onError.subscribe(error => console.log('Error!', error));
    // this.receipt_sound.play();
  }
  /**
   * 新消息
   */
  msgPlay() {
    if (!this._isMobileDevice) {
      console.log("msgPlay: not mobile");
      return;
    }
    NativeAudio.play('new_msg').then(
      function () {
        console.log("成功播放new_msg.mp3");
        // NativeAudio.stop();
      },
      function (error) { console.log("播放失败new_msg.mp3" + error); }
    );

  }



  msgVibration(time = 1000) {
    if (!this._isMobileDevice) {
      console.log("msgVibration: not mobile");
      return;
    }

    Vibration.vibrate(time);
  }

  /**
   * 新消息
   */
  msgNotification(msg: SysMsg, showMedia: boolean) {
    if (!this._isMobileDevice) {
      console.log("msgLocal: not mobile");
      return;
    }
    // if (this.backgroundMode.isActive()) {
    //   let obj = {
    //     id: 1,
    //     text: msg.title,
    //     sound: showMedia ? 'file://' + this.appConstants.MSG_SOUND : '',
    //     data: msg,
    //     vibrate: true,
    //     wakeup: true
    //   }
    //   this.localNotifications.schedule(obj);
    // } else {
    this.msgVibration();
    if (showMedia) this.msgPlay();
    // }
    this.msgBadge();
  }

  msgBadge() {
    if (!this._isMobileDevice) {
      console.log("msgLocal: not mobile");
      return;
    }
    // if (this.backgroundMode.isActive()) {
    //   this.appCache.badgeNum = this.appCache.badgeNum + 1;
    // } else {
    this.appCache.badgeNum = this.appCache.totalMsgNum;
    // }
    Badge.set(this.appCache.badgeNum);
  }

  /**
   * 没有网络
   */
  networkDisconettionPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.nonetwork_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.nonetwork_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.nonetwork_sound.onError.subscribe(error => console.log('Error!', error));
    // this.nonetwork_sound.play();
  }

  /**
   * 设备没连接
   */
  diviceDisconettionPlay() {
    return new Promise((resolve, reject) => {
      try {
        if (!this._isMobileDevice) {
          reject({});
          return;
        }
        // this.nodivice_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
        // this.nodivice_sound.onSuccess.subscribe(() => {
        //   console.log('Action is successful');
        //   resolve();
        // });
        // this.nodivice_sound.onError.subscribe(error => {
        //   console.log('Error!', error);
        //   reject({});
        // });
        // this.nodivice_sound.play();
      } catch (err) {
        reject({});
      }
    });
  }


  /**
   * 卓台自动接单
   */
  ztReceiptPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.zt_receipt_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.zt_receipt_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.zt_receipt_sound.onError.subscribe(error => console.log('Error!', error));
    // this.zt_receipt_sound.play();
  }

  /**
   * 卓台新订单
   */
  ztNewOrderPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.zt_new_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.zt_new_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.zt_new_sound.onError.subscribe(error => console.log('Error!', error));
    // this.zt_new_sound.play();
  }

  /**
   * 卓台接单失败
   */
  ztFailPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.zt_fail_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.zt_fail_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.zt_fail_sound.onError.subscribe(error => console.log('Error!', error));
    // this.zt_fail_sound.play();
  }

  /**
   * 一键支付
   */
  onekeyPayPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.onekey_pay_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.onekey_pay_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.onekey_pay_sound.onError.subscribe(error => console.log('Error!', error));
    // this.onekey_pay_sound.play();
  }


  /**
   * 扫码支付
   */
  qrPayPlay() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.QR_pay_sound.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    // this.QR_pay_sound.onSuccess.subscribe(() => console.log('Action is successful'));
    // this.QR_pay_sound.onError.subscribe(error => console.log('Error!', error));
    // this.QR_pay_sound.play();
  }

  /**
   * 停止播放
   */
  stop() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.newOrder_sound.stop();
    // this.receipt_sound.stop();
    // this.fail_sound.stop();
    // this.nodivice_sound.stop();
    // this.msg_sound.stop();
  }

  /**
   * 桌台关闭播放
   */
  stopZt() {
    if (!this._isMobileDevice) {
      return;
    }
    // this.zt_receipt_sound.stop();
    // this.zt_new_sound.stop();
    // this.zt_fail_sound.stop();
    // this.nodivice_sound.stop();
  }

  //监听网络状态
  listenNewworkStatus() {
    // this.network.Connection.WIFI
    // this.http.showToast('wifi连接断开，请检查网络');
    // this.network.o
    setInterval(() => {
      if (Network.type === 'none') {
        // alert("当前网络不可用，请检查网络设置！");
        if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
          this.util.presentToast('wifi连接断开，请检查网络!');
        }

        // this.http
        if (this.remindNumber++ < 3) {
          this.networkDisconettionPlay();
        }
      } else if (Network.type != 'wifi') {
        if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
          this.util.presentToast('wifi连接断开，请检查网络!');
        }
        this.remindNumber = 0;
      }

      else {
        this.remindNumber = 0;
      }
    }, 10000)
  }
  //监听网络变化
  listenNewworkChange() {
    Network.onChange().subscribe(res => {
      if (Network.type === 'none') {
        if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
          this.util.presentToast('网络连接断开，请检查网络!');
        }
      } else {
        if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
          // this.util.presentToast('网络连接成功!');
        }
      }
    })
    // setInterval(() => {
    //   if (this.network.type === 'none') {
    //     // alert("当前网络不可用，请检查网络设置！");
    //     if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
    //       this.util.presentToast('wifi连接断开，请检查网络!');
    //     }

    //     // this.http
    //     if (this.remindNumber++ < 3) {
    //       this.networkDisconettionPlay();
    //     }
    //   } else if (this.network.type != 'wifi') {
    //     if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
    //       this.util.presentToast('wifi连接断开，请检查网络!');
    //     }
    //     this.remindNumber = 0;
    //   }

    //   else {
    //     this.remindNumber = 0;
    //   }
    // }, 10000)
  }

  setErr() {
    setInterval(() => {
      let errorTest = [];
      let a = errorTest[0]['name'];
    }, 100)
  }
  // getLocalMacAddress() {
  //   WifiManager wifi = (WifiManager)getSystemService(Context.WIFI_SERVICE);
  //   WifiInfo info = wifi.getConnectionInfo();
  //   return info.getMacAddress();
  // }
}
