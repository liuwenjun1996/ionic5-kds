import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController, ModalController, } from '@ionic/angular';
/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class HelperService {

  readonly IsMobile: boolean = false;
  // private AlertIsExist = false;
  // private LoadingIsExist = false;
  // private loading: Loading;
  private loading: any;
  constructor(public platform: Platform,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalController: ModalController,
  ) {
    this.IsMobile = this.platform.is('cordova');
  }

  /**
  * 是否真机环境
  */
  isMobile(): boolean {
    return this.IsMobile;
  }

  /**
   * 是否真机环境
   */
  isNotMobile(): boolean {
    return !this.isMobile();
  }

  /**
   * alert弹框，默认只有确定按钮，当存在取消回调函数则会显示取消按钮
   * 注：如果存在打开的alert则不再打开
   * @param header 需要显示的title
   * @param message 需要显示的内容
   * @param okBackFun 成功回调
   * @param cancelBtnFun 失败回调
   */
  alert = (() => {
    // this.AlertIsExist = false;
    let AlertIsExist = false;
    return (title = '', message = '', okBackFun = null, cancelBtnFun = null): void => {
      if (!AlertIsExist) {
        AlertIsExist = true;
        const buttons = [{
          text: '确定', handler: () => {
            AlertIsExist = false;
            okBackFun && okBackFun();
          }
        }];
        if (cancelBtnFun) {
          const cancelBtn = {
            text: '取消',
            role: 'cancel',
            handler: () => {
              AlertIsExist = false;
              cancelBtnFun();
            }
          };
          buttons.unshift(cancelBtn);
        }


        this.alertController.create({
          header: '',
          message,
          cssClass: 'alert-zIndex-highest',
          buttons,
          backdropDismiss: false
        }).then(al => {
          al.present();
        })

      }
    }
  })();



  // alert1(header = '', message = '', okBackFun = null, cancelBtnFun = null): void {
  //   if (this.AlertIsExist) { // alertController.create是异步方法，所以使用AlertIsExist标志是否打开
  //     setTimeout(() => { // alert关闭的可能性比较多，不止点击确定或取消按钮
  //       this.AlertIsExist = false;
  //     }, 10000);
  //     return;
  //   }
  //   this.AlertIsExist = true;
  //   const buttons = [{
  //     text: '确定', handler: () => {
  //       this.AlertIsExist = false;
  //       okBackFun && okBackFun();
  //     }
  //   }];
  //   if (cancelBtnFun) {
  //     const cancelBtn = {
  //       text: '取消',
  //       role: 'cancel',
  //       handler: () => {
  //         this.AlertIsExist = false;
  //         cancelBtnFun();
  //       }
  //     };
  //     buttons.unshift(cancelBtn);
  //   }
  //   this.alertController.create({
  //     header,
  //     message,
  //     buttons
  //   }).then(alert => alert.present());

  /**
   * 显示提示信息
   */
  toast(message: string = '操作成功', duration: number = 2500, position: 'top' | 'bottom' | 'middle' = 'top'): void {
    const opts = { message, duration, color: 'primary', position, showCloseButton: true, closeButtonText: '✖' };
    this.toastController.create(opts).then(al => {
      al.present();
    })
  }

  /**
   * 统一调用此方法显示loading
   */
  showLoading(content: string = '', duration: number = 2000): void {
    if (this.loading) {// 如果loading已经存在则不再打开
      return;
    }
    this.loadingController.create({
      message: content
    }).then(loading => {
      loading.present();
      this.loading = loading;
    });

  }

  /**
   * 关闭loading
   */
  hideLoading(): void {
    this.loading && this.loading.dismiss();
    this.loading = null;
  }


}
