import { Inject, Injectable } from '@angular/core';
import { FileOpener } from "@ionic-native/file-opener";
import { HttpProvider } from "../http";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { APP_CONFIG, AppConfig } from "../../app/app.config";
import { File } from "@ionic-native/file";
import { UtilProvider } from "./util";
import { AppConstants } from '../../app/app.constants';
import { AlertController, Platform } from '@ionic/angular';

/*
版本管理
*/
@Injectable({
  providedIn: 'root',
})
export class VersionUtil {
  private fileTransfer: TransferObject;
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    public alertCtrl: AlertController,
    // private transfer: Transfer, 
    public httpProvider: HttpProvider,
    public platform: Platform,
    private util: UtilProvider,
    public appConstants: AppConstants) {

  }

  // 版本更新
  public openUpdateVersion(isShowTip: boolean = false) {
    var me = this;
    var optSystem = this.platform.is('ios') ? "vkds-ios" : "vkds-apk";
    this.httpProvider.checkAgentVersion(optSystem, isShowTip).subscribe(res => {
      if (res["code"] == 0) {
        if (res["data"].versionNum != this.appConstants.VERSION) {
          if (this.platform.is('ios')) {
            me.alertCtrl.create({
              header: '新版本' + res['data'].versionNum,
              message: res['data'].verDesc,
              cssClass: 'alert-log',
              buttons: [
                {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {
                    console.log('取消');
                  }
                },
                {
                  text: '前往下载',
                  handler: () => {
                    window.open(this.appConstants.APP_STORE_URL);
                  }
                }
              ]
            }).then(al => {
              al.present();
            });

          } else {
            me.alertCtrl.create({
              header: '新版本' + res['data'].versionNum,
              message: res['data'].verDesc,
              cssClass: 'alert-log',
              buttons: [
                {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {
                    console.log('取消');
                  }
                },
                {
                  text: '更新',
                  handler: () => {
                    let isOut = false;
                    let path = '';
                    if (res["data"].outDownUrl && res["data"].outDownUrl != '') {
                      isOut = true;
                      path = res["data"].outDownUrl;
                    } else {
                      path = me.config.UCENTER_SERVICE + "/ucenter/VerMgr/download?sysId=" + res["data"].id;
                    }
                    me.loadAPP(path, isOut);
                  }
                }
              ]
            }).then(alertCtrl => {
              alertCtrl.present();
            });
          }
        } else {
          if (isShowTip) {
            this.util.showAlert("提示", "当前已是最新版本!");
          }
        }
      } else {
        if (isShowTip) {
          this.util.showAlert("提示", "当前已是最新版本!");
        }
      }
    }, error => {
      if (isShowTip) {
        this.util.showAlert("提示", "当前已是最新版本!");
      }
    })
  }

  // 版本更新
  public UpdateVersion(isShowTip: boolean = false) {

    var me = this;
    var optSystem = this.platform.is('ios') ? "vkds-ios" : "vkds-apk";
    this.httpProvider.checkAgentVersion(optSystem, false).subscribe(res => {

      if (res["code"] == 0) {
        if (res["data"].versionNum != this.appConstants.VERSION) {
          if (this.platform.is('ios')) {
            me.alertCtrl.create({
              header: '版本过低，请更新！',
              message: res['data'].verDesc,
              cssClass: 'alert-log',
              buttons: [
                {
                  text: '前往下载',
                  handler: () => {
                    window.open(this.appConstants.APP_STORE_URL);
                  }
                }
              ]
            }).then(alertCtrl => {
              alertCtrl.present();
            });

          } else {
            me.alertCtrl.create({
              header: '版本过低，请更新！',
              message: res['data'].verDesc,
              cssClass: 'alert-log',
              buttons: [
                {
                  text: '更新',
                  handler: () => {
                    let isOut = false;
                    let path = '';
                    if (res["data"].outDownUrl && res["data"].outDownUrl != '') {
                      isOut = true;
                      path = res["data"].outDownUrl;
                    } else {
                      path = me.config.UCENTER_SERVICE + "/ucenter/VerMgr/download?sysId=" + res["data"].id;
                    }
                    me.loadAPP(path, isOut);
                  }
                }
              ]
            }).then(alertCtrl => {
              alertCtrl.present();
            });

          }
        } else {
          if (isShowTip) {
            this.util.showAlert("提示", "版本过低，请等待新版本发布！");
          }
        }
      } else {
        if (isShowTip) {
          this.util.showAlert("提示", "版本过低，请等待新版本发布！");
        }
      }
    }, error => {
      if (isShowTip) {
        this.util.showAlert("提示", "版本过低，请等待新版本发布！");
      }
    })
  }

  // 下载app
  public loadAPP(path: string, isOut: boolean = false) {
    if (!this.fileTransfer) {
      // this.fileTransfer = this.transfer.create();
    }
    // let alertCtrl:any;

    this.alertCtrl.create({
      header: '下载进度：0%',
      backdropDismiss: false
      //buttons: ['后台下载']
    }).then(alertCtrl => {
      alertCtrl.present();
      // 进度
      this.fileTransfer.onProgress((event) => {
        if (event.lengthComputable) {
          //进度，这里使用文字显示下载百分比
          var downloadProgress = (event.loaded / event.total) * 100;
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + Math.floor(downloadProgress) + '%');

          if (downloadProgress > 99) {
            alertCtrl.dismiss();
          }
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '安装文件下载中，请稍后......');
        }
      });
      if (isOut) {

      } else {
        path += "&t=" + new Date().getTime();
      }

      console.log(path)

      let targetPath = File.externalApplicationStorageDirectory + "aibaoapp.apk";
      // 下载
      this.fileTransfer.download(path, targetPath, true).then((entry) => {
        alertCtrl.dismiss();
        FileOpener.open(targetPath, 'application/vnd.android.package-archive').then(() => {
          //this.platform.exitApp()
        }, (error) => {
          this.util.showAlert("提示", "打开文件失败, 文件可能不完整!");
        });
      }, (error) => {
        console.log(error);
        //alert(error.code)
        if (error.code == 1) {
          this.util.showAlert("提示", "请开启手机的储存权限[设置->应用管理->爱宝智能餐厅->权限->打开储存]");
        } else if (error.code == 3) {
          this.util.showAlert("提示", "储存空间不足，更新失败!");
        } else {
          this.util.showAlert("提示", "更新失败!");
        }
        alertCtrl.dismiss();
      });

    });

  }

  isWindows() {
    var isAndroid = this.platform.is("android");
    var isIos = this.platform.is("ios");
    if (!isAndroid && !isIos) {
      return true;
    }
    return false;
  }
}
