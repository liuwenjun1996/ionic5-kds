import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { AppCache } from './app.cache';
// import { Badge } from '@ionic-native/badge';
import { JPush } from '@jiguang-ionic/jpush';
// import { HttpProvider } from 'src/providers/http';
// import { DbProvider } from 'src/providers/db';
// import { PushProvider } from 'src/providers/push';
import { NativeProvider } from 'src/providers/native';
// import { BackgroundModeOriginal } from '@ionic-native/background-mode';
import { Device } from '@ionic-native/device';
// import { WebSocketService } from 'src/service/webSocketService';
// import { ConfigurationDao } from 'src/dao/configurationDao';
// import { SystemService } from 'src/service/systemService';
import { BackgroundMode, } from '@ionic-native/background-mode';
import { AppCache } from './app.cache';
import { HttpProvider } from 'src/providers/http';
import { DbProvider } from 'src/providers/db';
import { PushProvider } from 'src/providers/push';
import { WebSocketService } from 'src/service/webSocketService';
import { ConfigurationDao } from 'src/dao/configurationDao';
import { SystemService } from 'src/service/systemService';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform, NavController, } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { ScreenOrientation } from "@ionic-native/screen-orientation";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public appCache: AppCache,//printProvider: PrintProvider, 
    public db: DbProvider,
    // public screenOrientation: ScreenOrientation,
    public pushProvider: PushProvider,
    public native: NativeProvider,
    private http: HttpProvider,
    public webSocketService: WebSocketService,
    public configurationDao: ConfigurationDao,
    public systemService: SystemService,
    public appMinimize: AppMinimize,
    public routerLink: RouterLink,
    public navController: NavController,
  ) {
    this.initializeApp();
  }

  rootPage: any = '';
  flag: boolean = true;
  initializeApp() {
    debugger
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    debugger
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    // /sing-in
    this.navController.navigateRoot('/sing-in');
  }

  init() {
    this.platform.ready().then(() => {
      JPush.init();
      this.statusBar.styleDefault();
      if (this.platform.is('ios')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('orange');
        this.statusBar.styleLightContent();
      } else {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('orange');
      }

      // keyboard.disableScroll(true);
      //初始化数据库
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqq');

      // this.db.initTables();

      //真机环境
      if (this.http.isMobileDevice()) {
        this.doMobileDevice();
      }

      if (this.platform.is('android')) {
        this.doPlatformAndroid();
      }
      //监听网络状态
      this.native.listenNewworkChange();
      // this.native.setErr();
      this.native.initSound();
      this.getMacId();
    });
  }
  doMobileDevice() {
    // this.localNotifications.requestPermission();

    //屏幕横屏
    // this.screenOrientation.lock(this.screenOrientation);

    //socket 监听
    //printProvider.addReceiveListeners();
    BackgroundMode.setDefaults({ title: "爱宝智能餐厅", text: "智能爱宝，连锁未来" });

    BackgroundMode.on("activate").subscribe(() => {
      // this.getPushList();
      // this.appCache.badgeNum = this.appCache.totalMsgNum;
      console.log("websocket reconnect");
      // this.webSocketService.reconnect(true);
      // this.appCache.isBackgroundMode = true;
    });

    BackgroundMode.on("deactivate").subscribe(() => {
      // this.appCache.badgeNum = this.appCache.totalMsgNum;
      this.native.msgBadge();
      // this.appCache.isBackgroundMode = false;
    });
    BackgroundMode.enable();

    BackgroundMode.isScreenOff(off => {
      if (off) {
        BackgroundMode.wakeUp()
      }
    });

    window.addEventListener('native.keyboardshow', function (e) {
      // todo 进行键盘可用时操作
      //e.keyboardHeight 表示软件盘显示的时候的高度
      //this.http.showToast('软件盘弹出了');
      this.app.getActiveNav()._views[0].getContent().scrollTo(0, e['keyboardHeight']);
    });
  }
  doPlatformAndroid() {
    this.platform.backButton.subscribe(() => {
      // let loadingPortal = this.ionicApp._loadingPortal.getActive();
      // if (loadingPortal) {
      //   if (!loadingPortal["exitFlag"]) { //loading的话，返回键无效
      //     return;
      //   } else {
      //     loadingPortal.dismiss().catch((error) => { console.error(error) });
      //   }
      // }

      // let overlayPortal = this.ionicApp._overlayPortal.getActive();
      // if (overlayPortal) {
      //   //其他的关闭      
      //   overlayPortal.dismiss('backdrop').catch((error) => { console.error(error) });
      //   return;
      // }

      // let activePortal = this.ionicApp._modalPortal.getActive();
      // if (activePortal) {
      //   //其他的关闭
      //   activePortal.dismiss().catch((error) => { console.error(error) });
      //   //activePortal.onDidDismiss(() => {});
      //   return;
      // }
      // if (this.routes.length <= 1) {
      //   this.flag = !this.flag;

      //   setTimeout(() => {
      //     this.flag = true
      //   }, 3000);

      //   if (this.flag) {
      //     // platform.exitApp()
      //     this.appMinimize.minimize();
      //   } else {
      //     this.http.showToast('再按一次退出', true);
      //   }
      // } else {
      //   Routes.pop();
      //   return;
      // }
    })
  }

  getMacId() {
    if (this.platform.is('mobile')) {
      this.appCache.macId = Device.uuid;
    } else {
      this.appCache.macId = '123456789';
    }
  }
}
