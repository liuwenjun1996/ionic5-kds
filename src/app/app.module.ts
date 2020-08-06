import { DbProvider } from 'src/providers/db';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Vibration } from '@ionic-native/vibration';
import { JPush } from '@jiguang-ionic/jpush';
import { QRScanner } from '@ionic-native/qr-scanner';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { NativeAudio } from '@ionic-native/native-audio';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BLE } from '@ionic-native/ble';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpProvider } from 'src/providers/http';
import { PushProvider } from 'src/providers/push';
import { UtilProvider } from 'src/providers/util/util';
import { ShoppingUtilProvider } from 'src/providers/util/shoppingUtil';
import { NativeProvider } from 'src/providers/native';
import { QrScanUtilProvider } from 'src/providers/util/QrScanUtil';
import { GlobalErrorHandler } from 'src/providers/util/globalErrorHandler';
import { Device } from '@ionic-native/device';
import { PrintUtilProvider } from 'src/providers/util/PrintUtil';
import { PrintProvider } from 'src/providers/print';
import { OrderProvider } from 'src/providers/order/order';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileOpener } from '@ionic-native/file-opener';
import { VersionUtil } from 'src/providers/util/VersionUtil';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PinYin } from 'src/providers/pinyin';
import { CommonStatusEnum } from 'src/providers/common.statusenum';
import { ExportProvider } from 'src/providers/export/export';
import { Badge } from '@ionic-native/badge';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/pipes/pipes.module';
import { DaoModule } from 'src/dao/dao.module';
import { ServiceModule } from 'src/service/service.module';
import { IonAffixModule } from 'src/directives/ion-affix.module';
import { DirectivesModule } from 'src/directives/directives.module';
import { ComponentsModule } from 'src/components/components.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, RouterLink, Router, } from '@angular/router';
import { AppConstants } from './app.constants';
import { AppCache } from './app.cache';
import { AppShopping } from './app.shopping';
import { AppPermission } from './app.permission';
import { EventsProvider } from 'src/providers/Events';
import { HelperService } from 'src/providers/Helper';
import { APP_CONFIG, APP_PRD_CONFIG } from './app.config';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

const components = [
];
const provider: any = [DatePipe, DecimalPipe, NativeProvider, SQLite, DbProvider, Toast, Network, Camera, Vibration, JPush, QRScanner, File, NativeAudio, BluetoothSerial, BLE,
  PhotoViewer, HttpProvider, PushProvider, UtilProvider, ShoppingUtilProvider, QrScanUtilProvider, NativeProvider,
  // GlobalErrorHandler,
  Device, PrintUtilProvider, PrintProvider,
  OrderProvider, PhotoLibrary, ScreenOrientation, FileOpener,
  //  Transfer,
  VersionUtil, BackgroundMode, PinYin, CommonStatusEnum,//PushOriginal,
  ExportProvider, Badge, LocalNotifications];

@NgModule({
  declarations: [AppComponent, ...components],
  entryComponents: [],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppConstants,
    AppCache,
    AppShopping,
    AppPermission,
    EventsProvider,
    HelperService,
    ServiceModule,
    CommonModule,
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // { provide: APP_CONFIG, useValue: APP_SIT_CONFIG },
    // {provide: APP_CONFIG, useValue: APP_UAT_CONFIG},
    { provide: APP_CONFIG, useValue: APP_PRD_CONFIG },

    GlobalErrorHandler,
    DatePipe, DecimalPipe, NativeProvider, DbProvider, HttpProvider, PushProvider, UtilProvider, ShoppingUtilProvider, QrScanUtilProvider,
    NativeProvider, PrintUtilProvider, PrintProvider, VersionUtil, PinYin, CommonStatusEnum, ExportProvider, AppMinimize, RouterLink,
  ],

  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,


    HttpClientModule,
    PipesModule,
    DaoModule,
    ServiceModule,
    IonAffixModule,
    DirectivesModule,
    ComponentsModule,


    //ChartsModule,
    IonicModule.forRoot({
      menuType: 'push',
      swipeBackEnabled: true,
      scrollPadding: false,
      scrollAssist: true,
      backButtonText: '',
      mode: 'ios',
    })
  ],

})
export class AppModule {
  // constructor(public config: Config) {
  //   this.setCustomTransitions();
  // }

  // private setCustomTransitions() {
  //   this.config.setTransition('modal-from-right-enter', ModalFromRightEnter);
  //   this.config.setTransition('modal-from-right-leave', ModalFromRightLeave);
  //   this.config.setTransition('modal-scale-enter', ModalScaleEnter);
  //   this.config.setTransition('modal-scale-leave', ModalScaleLeave);
  // }
}
