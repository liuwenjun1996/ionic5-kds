import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController, ModalController, Platform } from '@ionic/angular';
import { HttpProvider } from 'src/providers/http';
import { WebSocketService } from 'src/service/webSocketService';
import { AppShopping } from 'src/app/app.shopping';
import { AppCache } from 'src/app/app.cache';
import { UserDao } from 'src/dao/userDao';
import { AppConstants } from 'src/app/app.constants';
import { AppPermission } from 'src/app/app.permission';
import { ConfigurationDao } from 'src/dao/configurationDao';
import { ShoppingService } from 'src/service/shoppingService';
import { PrintService } from 'src/service/printService';
import { SystemService } from 'src/service/systemService';
import { Observable } from 'rxjs';
import { User } from 'src/domain/user';
import { Device } from '@ionic-native/device';
// import { FirstComponent } from 'src/components/first/first.component';
import { NewPagePage } from '../../new-page/new-page.page';
import { IpInputPage } from './ip-input/ip-input.page';


@Component({
  selector: 'page-sign-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, public http: HttpProvider,
    public webSocketService: WebSocketService,
    public appShopping: AppShopping,
    public appCache: AppCache,
    public modalCtrl: ModalController,
    public userDao: UserDao,
    public appConstants: AppConstants,
    private menuController: MenuController,
    public platform: Platform,
    public appPer: AppPermission,
    public configurationDao: ConfigurationDao,
    public shoppingService: ShoppingService,
    public printService: PrintService,
    public systemService: SystemService,

  ) { }
  username: string;
  password: string;
  ip: string;
  data: any = { workId: "1001", password: "1001" };
  seller: any = {};
  isConnectStatus: string = 'syt_sta_outline.png';
  nav: any;
  isLine: boolean = false;
  list: any = [1, 2]
  ngOnInit() {
    this.menuController.enable(false);
  }


  ionViewWillEnter() {
    // this.ip = '192.168.1.144';
    this.menuController.enable(false);
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

  }
  ionViewWillLoad() {
    // this.versionUtil.openUpdateVersion(false);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignInPage');
    let me = this;
    setTimeout(() => {
      this.userDao.get(this.appConstants.ID_UESR_TB).then(data => {
        if (data && data.username && data.password) {
          this.username = data.username;
          this.password = data.password;
          this.ip = data.ip;
          if (this.ip == null || this.ip == '') {
            return;
          }
          me.doWebConnect().subscribe(res => {
            if (res) {
              this.signIn(true);
            }
          });
        }
      })
    }, 2000);
  }
  text() {
    // this.login();
  }

  ionViewDidEnter() {
    var idInput = document.getElementById("inp");
    idInput.onkeyup = (event) => {
      if (event.keyCode == 13) {
        //执行相应的方法
        this.signIn();
      }
    }
    //me.webSocketService.connect("192.168.0.104",10002, 60000);

  }
  doLog() {

  }
  doWebConnect() {
    this.isLine = false;
    return Observable.create(observable => {
      this.http.loadingPresent(true, '正在连接服务，请稍后...').subscribe(loading => {
        this.webSocketService.connect(this.ip, 10002, 60000).subscribe(retData => {
          loading.dismiss();
          if (retData.success) {
            this.http.showToast(retData.data);
            this.isLine = true;
            observable.next(true);
          } else {
            this.http.showToast(retData.data);
            this.isLine = false;
            observable.next(false);
          }
        });
      });
    });
  }
  getData() {
    if (this.seller['workId']) {
      this.data['isMd5'] = 1;
    } else {
      this.data['isMd5'] = 0;
    }
    this.data['showLoginText'] = "";
    this.data['isLogining'] = false;
  }
  getMacId() {
    if (this.platform.is('mobile')) {
      this.appCache.macId = Device.uuid;
    } else {
      this.appCache.macId = '123456789';
    }
  }
  // 显示IP
  onShowIP() {
    // this.buidAddrData();
    // let errorTest = [];
    // let a = errorTest[0]['name'];
    let me = this;
    //let loading;
    me.http.loadingPresent(true, '正在连接服务，请稍后...').subscribe(loading => {
      //loading = loading;
      me.webSocketService.connect(this.ip, 10002, 60000).subscribe(res => {
        if (res.success) {
          this.isLine = true;
          me.http.showToast('连接成功！');
          loading.dismiss();
        } else {
          this.isLine = false;
          loading.dismiss();
          me.http.showToast('连接失败！请稍后重试');
        }
      }, err => {
        this.isLine = false;
        loading.dismiss();
        me.http.showToast('连接失败！请稍后重试');
      });
    });

    //this.webSocketService.sendSwapMessage({msgType:"Mobile",bizType:"LOGIN",EVENT:"LOGIN",data:{content:{staffCode:"111",password:"111"}}});
  }
  //登录
  signIn(auto: boolean = false) {
    console.log("signIn");
    let me = this;
    let platform = { deviceType: 'MD', version: this.appConstants.VERSION, macId: this.appCache.macId };//this.appConstants.VERSION
    if (this.platform.is('ios')) {
      platform.deviceType = 'IOS';
    }

    // platform: platform 
    me.webSocketService.sendObserveMessage("LOGIN", { staffCode: me.username, password: me.password, platform: platform }, { content: '登陆中，请稍后...' }).subscribe(function (retData) {
      if (retData && retData.success) {
        // if (retData.data.isUpgrade) {
        //   me.versionUtil.UpdateVersion(true);
        //   return;
        // }
        if (retData.data.version && String(retData.data.version).toLowerCase() <= String('V0.00.48').toLowerCase()) {
          me.http.showToast('收银端版本过低，请更新收银端！');
          return;
        }
        // this.menuController.enable(true);
        me.saveUser();
        me.menuController.enable(true);
        console.log(retData);
        try {
          me.appCache.store = retData.data.store; // store店铺赋值
          me.appCache.seller = retData.data.staff;
          me.appShopping.cashier = retData.data.cashier; // staff 员工赋值 
          me.appShopping.staff = retData.data.staff; // staff 员工赋值 
          me.appPer.storeParam = retData.data.storeParam.sysSetting;  // 店铺配置信息
          me.appPer.buildStaffPermissionArray(me.appShopping.staff);
          me.appPer.buildstoreParamArray(retData.data.storeParam.sysSetting);
          // me.shoppingService.loginLoddata().subscribe(() => {
          //   me.systemService.getConfiguration(me.appCache.store.id).subscribe(() => {
          //     // me.printService.queryDeviceByPrinterType();
          //     me.shoppingService.setRootPage();
          //   });
          // }, err => {
          //   console.log('111111111111', err);
          //   me.http.showToast('数据写入异常，请重试！');
          // })

        } catch (error) {
          console.log('22222222222222222222222', error);
          me.http.showToast('数据写入异常，请重试！');
        }

      }
    });
  }


  saveUser() {
    let user = new User();
    user.loginTime = new Date().getTime() - 1000;
    user.lastMasageTime = 0;
    user.id = this.appConstants.ID_UESR_TB;
    user.username = this.username;
    user.password = this.password;
    user.ip = this.ip;
    try {
      this.userDao.set(user, true).then(() => {
        console.log('保存用户成功', user);
        this.userDao.queryAll().then(data => {
          console.log('用户', data);
        })
      }
      );
    } catch (error) {
      console.log('保存用户失败', error);

    }

  }

  inputIp() {
    console.log('this.ip', this.ip);
    this.modalCtrl.create({
      component: IpInputPage,
      componentProps: { adress: this.ip },
      backdropDismiss: true,
      swipeToClose: true,
      showBackdrop: true,
      cssClass: 'custom-modal2',
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(res => {
        console.log('onDidDismiss', res);
        debugger
        if (res.data && res.data['flag']) {
          this.ip = res.data.data;
          console.log('this.ip', this.ip);
          this.doWebConnect().subscribe(res => {
          });
        } else {

          // return;
        }
      })
    });
  }
  goToQr() {
    // this.navCtrl.push('CommodityQrScanPage', { QRcallback: this.QRcallback, })
  }
  QRcallback: (param: any) => Promise<any> = (params) => new Promise(resolve => {
    this.ip = params.code;
    this.doWebConnect().subscribe();
  });
  initItem() {
    this.appShopping.comSpuList.forEach(comSpu => {
      //默认sku
      if (comSpu.tmpSkuList.length == 1) {
        comSpu.tmpIsDefaultSku = comSpu.tmpSkuList[0];
      } else {
        comSpu.tmpSkuList.forEach(sku => {
          if (sku.isDefault == 1) {
            comSpu.tmpIsDefaultSku = sku;
          }
        });
      }
    });
  }

  doConfirm() {
    this.alertCtrl.create({
      header: '过期提示',
      message: '您的APP已到期，请及时续费',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
      ]
    }).then(alert => {
      alert.present();
    });

  }
}
