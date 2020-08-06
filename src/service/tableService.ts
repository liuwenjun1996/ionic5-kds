import { Injectable } from '@angular/core';
import { UtilProvider } from '../providers/util/util';
import { AppCache } from '../app/app.cache';
import { AppShopping } from '../app/app.shopping';
import { AlertController } from '@ionic/angular';
// import { WO_SHOP_DETAIL_PAGE } from '../pages/pages.constants';
import { WebSocketService } from './webSocketService';
import { HttpProvider } from '../providers/http';
import { AppPermission } from '../app/app.permission';

// import { WoShopDetailPage } from '../pages/wxdc/shop/wo-shop-detail/wo-shop-detail';

/*
  Generated class for the WoOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
	providedIn: 'root',
  })
export class TableService {
	alertCtrlShow: boolean = false;
	constructor(
		public utilProvider: UtilProvider,
		public appCache: AppCache,
		public appShopping: AppShopping,
		public webSocketService: WebSocketService,
		public http: HttpProvider,
		public alertCtrl: AlertController,
		public appPer: AppPermission,
		// public events: Events,
		// public navContr:NavController,
		// public app: App,

	) {
		console.log('Hello WoOrderProvider Provider');

	}



	refreshSpuDataForSoudout(dataName?) {
		// console.log('qqqqqqqqqqqqq');
		dataName = ['pos_item_spu'];
		let me = this;
		me.webSocketService.sendObserveMessage("LOADDATA", dataName, { content: '正在刷新数据...', isShowing: false }).subscribe(function (retData) {
			if (retData && retData.success) {
				// me.woShopService.assignmentData(retData);
			}
		});
	}
}
