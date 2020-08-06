import { ModalController, Platform, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { HttpProvider } from '../providers/http';
import { Observable } from 'rxjs';
import { AppCache } from '../app/app.cache';
import { WebSocketService } from './webSocketService';
import { AppShopping } from '../app/app.shopping';
import { UtilProvider } from '../providers/util/util';
import { ShoppingUtilProvider } from '../providers/util/shoppingUtil';
import { HelperService } from '../providers/Helper';
import { PrintService } from './printService';


@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
	deviceType: string;
	constructor(
		public http: HttpProvider,
		public appCache: AppCache,
		public modalCtrl: ModalController,
		public webSocketService: WebSocketService,
		public appShopping: AppShopping,
		public util: UtilProvider,
		public shoppingUtilProvider: ShoppingUtilProvider,
		public help: HelperService,
		public platform: Platform,
		public printService: PrintService,
		public navController: NavController,
	) {
		setInterval(() => {
			this.getShowData();
		}, 15000);
		if (this.platform.is('ios')) {
			this.deviceType = 'ios';
		} else {
			this.deviceType = 'MD';
		}

	}
	startTime: Date = new Date();
	endTime: Date = new Date();
	currPage: number = 1;
	pageSize: number = 20;
	last: boolean;




	getSalesBody() {

	}
	openSellInfoModal(item) {
		this.modalCtrl.create({
			showBackdrop: true,
			component: '',
			componentProps: { value: item }
		}).then(myModal => {
			myModal.present();
		});
	}
	setRootPage() {
		if (this.appCache.Configuration.SYS_MODEL_TYPE == "KDS") {
			if (this.appCache.Configuration.OUT_MODEL_TYPE == "N") {
				// this.app.getActiveNav().setRoot('NormalModeHomePage');
			} else {
				// this.app.getActiveNav().setRoot('SplitModeHomePage');
			}
		} else if (this.appCache.Configuration.SYS_MODEL_TYPE == "TN") {
			// this.app.getActiveNav().setRoot('TakeNumberHomePage');
		} else if (this.appCache.Configuration.SYS_MODEL_TYPE == "TV") {
			// this.app.getActiveNav().setRoot('CallNumberHomePage');
		}

	}

	//login加载数据
	loginLoddata() {
		let me = this;
		return Observable.create(obs => {
			me.webSocketService.sendObserveMessage("LOADDATA", "*", { timeOut: 5000 }).subscribe(function (retData) {
				if (retData && retData.success) {
					if (me.shoppingUtilProvider.assignmentData(retData)) {
						obs.next();
					} else {
						obs.error();
					}
				}
			});
		})
	}

	getSalesData() {
		this.webSocketService.sendObserveMessage("LOADDATA", ["pos_salesh"]).subscribe(res => {
			console.log('res', res);
			if (res.success) {
				this.shoppingUtilProvider.assignmentSalesData(res);
			} else {
				// this.help.toast('获取数据失败');
			}

		})
	}

	getShowData() {
		if (this.appCache.Configuration.SYS_MODEL_TYPE == 'KDS') {
			this.shoppingUtilProvider.getShowData();
			console.log('appdata', this.appShopping);
		}
	}

	getShowCategoryData() {
		return this.shoppingUtilProvider.getShowCategoresBySplit();
	}

	/**
	 *
	 *显示商品详情页面
	 * @param {*} item
	 * @param {{ isOutModel }} [param]
	 * @memberof ShoppingService
	 */
	showSalesDetailPage(item, param?: { isOutModel }) {
		console.log('详情页', item)
		this.modalCtrl.create(
			{
				showBackdrop: true,
				component: 'SalesDetailPage',
				componentProps: { salesDetail: item, isOutModel: param ? param.isOutModel : false },
				// enterAnimation: 'modal-scale-enter',
				// leaveAnimation: 'modal-scale-leave',
				cssClass: 'custom-center-modal',
			}
		).then(mod => {
			mod.present();
		});


	}
	/**
	 * 显示退菜页面
	 * @param param 
	 * @memberof showRetreatFoodPage
	 */
	showRetreatFoodPage(param?: { isOutModel }) {
		this.modalCtrl.create(
			{
				showBackdrop: true,
				component: 'RetreatFoodPage',
				componentProps: { isOutModel: param ? param.isOutModel : false },
				// enterAnimation: 'modal-scale-enter',
				// leaveAnimation: 'modal-scale-leave',
				cssClass: 'custom-center-modal',
			}).then(mod => {
				mod.present();
			});

	}
	/**
	 * @member ShoppingService
	 * @method {Function} skuItemSetSocket SKU菜品明细设置
	 * @param item 
	 */
	skuItemSetSocket(item: any) {
		let me = this;
		let deviceInfo = {
			// deviceId:this.appCache.macId,
			deviceIP: this.appCache.macId,
			deviceName: this.deviceType + this.appCache.macId,
			deviceMac: this.appCache.macId,
			deviceUniqueCode: this.appCache.macId,
			deviceType: 'K',
			createdTime: this.util.getNowTime(),
			createdBy: this.appShopping.cashier.id,
			lastUpdateBy: this.appShopping.cashier.id,
			lastUpdateTime: this.util.getNowTime(),
		}
		// deviceInfo 刚开始进来时初始化 
		return Observable.create(obs => {
			me.webSocketService.sendObserveMessage("KDSITEMSET", { kdsItems: item, deviceInfo: deviceInfo }, { timeout: 5000, content: "正在处理中..." }).subscribe(function (retData) {
				if (retData && retData.success) {
					me.help.toast("商品设置成功!");
					obs.next();
				} else {
					obs.error();
					me.help.toast("商品设置失败!");
				}
			});
		});
	}
	/**
	 *菜品出品  */
	crossoutItem(items: any, isPrint: boolean = true) {
		let me = this;
		let crossItems: any = [];
		if (items instanceof Array) crossItems = crossItems.concat(items);
		else crossItems.push(items);
		//  crossItems=items
		return Observable.create(obs => {
			let printList = JSON.parse(JSON.stringify(crossItems));
			console.log('crossItems', crossItems)

			me.webSocketService.sendObserveMessage("UPDATECROSSITEM", { salesDetail: crossItems }, { timeout: 5000, content: '正在出品中...' }).subscribe(function (retData) {
				if (retData && retData.success) {
					console.log('retData', retData)
					me.shoppingUtilProvider.updateLocalSalesDetail(retData.data);/* 更新SalesDetail */
					obs.next();
					if (isPrint) {
						// me.printService.printOutSalesDetail(items);
						me.printService.printOutSalesDetail(printList);
					}
				} else {
					obs.error(retData);
					me.help.toast('出品失败');
				}
			});
		});
	}

	/* 菜品退菜 */
	retreatFoodItem(items: any, isPrint: boolean = true) {
		console.log('items', items)
		let me = this;
		let retreatFoodItem: any = [];
		if (items instanceof Array) retreatFoodItem = retreatFoodItem.concat(items);
		else retreatFoodItem.push(items);
		return Observable.create(obs => {
			let printList = JSON.parse(JSON.stringify(retreatFoodItem))
			// let { salesId, salesDetailId, lastUpdateBy, returnQty } = retreatFoodItem
			// let data={ salesId, salesDetailId, lastUpdateBy, returnQty }
			// console.log('retreatFoodItem',retreatFoodItem);
			if (!retreatFoodItem || retreatFoodItem.length <= 0) {
				obs.error({});
				me.help.toast('参数错误!');
				return
			}
			var returnFoodItem: any = {};
			returnFoodItem.salesId = retreatFoodItem[0].salesId;
			returnFoodItem.salesDetailId = retreatFoodItem[0].id;
			returnFoodItem.lastUpdateTime = retreatFoodItem[0].lastUpdateTime;
			returnFoodItem.returnQty = retreatFoodItem[0].returnQty;
			me.webSocketService.doRetreatFood(returnFoodItem).subscribe(function (retData) {
				// console.log(retData)
				if (retData && retData.success) {
					// console.log('items.returnQty', items.returnQty)				
					// retData.data[0].returnQty = items.returnQty;
					console.log('retData', retData)
					me.shoppingUtilProvider.updateLocalSalesDetail(retData.data.salesDetail);/* 更新SalesDetail */
					obs.next();
					if (isPrint) {
						// me.printService.printOutSalesDetail(items);
						me.printService.printOutSalesDetail(printList);
					}
				} else {
					obs.error(retData);
					me.help.toast('退菜失败');
				}
			});
		})

	}
	// 菜品恢复出品
	resumeCrossoutItem(items: any) {
		let me = this;
		let crossItems: any = [];
		if (items instanceof Array) crossItems = crossItems.concat(items);
		else crossItems.push(items);
		return Observable.create(obs => {
			me.webSocketService.sendObserveMessage("RESUMECROSSITEM", { salesDetail: crossItems }, { timeout: 5000, content: '取消出品中...' }).subscribe(function (retData) {
				if (retData && retData.success) {
					me.shoppingUtilProvider.updateLocalSalesDetail(retData.data);
					obs.next();
					me.help.toast('取消成功');
				} else {
					obs.error();
					me.help.toast('取消出品失败');
				}
			});
		});
	}

	loadCurrSalesDetail(item: any) {

	}
	/* 搜索 */
	onInputSearch(e) {
		console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

		this.shoppingUtilProvider.getShowData();

	}
	/* 退菜页面搜索 */
	onInputSearchRetreatFood(value) {
		let salesDetailList = this.shoppingUtilProvider.getRetreatFoodList(this.appShopping.salesDetailList, value)
		this.appShopping.showRetreatFoodList[0] = salesDetailList
		console.log('appShopping', this.appShopping.showRetreatFoodList)
	}

	changeNeedOutNum(item, call?) {
		let havePoint = false;
		if (item.measureFlag == 'Z') {
			havePoint = true;
		}
		this.modalCtrl.create(
			{
				showBackdrop: true,
				component: 'InputNumberKeyboardPage',
				componentProps: { top: { title: '出品数量', }, number: { number: item.currCrossoutNum }, havePoint: havePoint },
				// enterAnimation: 'modal-scale-enter',
				// leaveAnimation: 'modal-scale-leave',
				cssClass: 'custom-modal2',
			}).then(myModal => {
				myModal.present();
				myModal.onDidDismiss().then(res => {
					if (res && res['flag'] && res.data && res.data > 0) {
						item.currCrossoutNum = res.data;
					}
					call && call();
				})
			});

	}
}
