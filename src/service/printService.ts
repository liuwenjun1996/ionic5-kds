import { Injectable } from '@angular/core';
import { PrinterDeviceDao } from '../dao/PrinterDeviceDao';
import { PrintProvider } from '../providers/print';
// import { PRINTER_DEVICE_SELECT_PAGE } from '../pages/pages.constants';
import { UtilProvider } from '../providers/util/util';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HttpProvider } from '../providers/http';
import { AppCache } from '../app/app.cache';
import { AppShopping } from '../app/app.shopping';
import { OrderProvider } from '../providers/order/order';



/*
  Generated class for the WoOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
	providedIn: 'root',
})
export class PrintService {
	device: any;
	retry: boolean = false;
	interval: any;
	timeCount: number = 3;

	constructor(
		public printerDeviceDao: PrinterDeviceDao, public print: PrintProvider, public util: UtilProvider, public printProvider: PrintProvider,
		public http: HttpProvider, public appCache: AppCache, public appShopping: AppShopping, public orderProvider: OrderProvider,
	) {
		console.log('Hello WoOrderProvider Provider');
	}
	//得到蓝牙打印的驱动
	queryDeviceByPrinterType() {
		// let device=
		let type = '1';//小票打印机
		let device = Object.assign({}, this.print.receiptPrinter);
		if (device.id) {
			return
		} else {
			this.printerDeviceDao.queryByPrinterType(type, this.appCache.seller.id).then(data => {
				console.log('数据库查询出的打印驱动————————————————————————————————————————————————————————————————————————————————————————————————————');
				console.log(JSON.stringify(data));
				if (data.length > 0) {
					device = data[0];
					this.print.receiptPrinter = device;
					// this.device = Object.assign({}, this.printProvider.receiptPrinter);
					this.orderProvider.receiptPrintStatus = true;
				} else {
					this.orderProvider.receiptPrintStatus = false;
				}
			})
		}
	}
	printOutSalesDetail(salesDetailList: any[], isReprint: boolean = false) {
		if (!this.appCache.Configuration.DY_CPD) {
			return;
		}
		this.device = this.print.receiptPrinter;
		let list = [];
		let topAndLeg;
		list = JSON.parse(JSON.stringify(salesDetailList));

		let doList = [];
		list.forEach(item => {
			// debugger
			if (isReprint) {
				item.currCrossoutNum = item.crossoutNum || 0;
			}
			doList.push(item);
			if (item.addList && item.addList.length > 0) {
				item.addList.forEach(add => {
					doList.push(add);
				})
			}


		})

		let oneItem = salesDetailList[0];
		topAndLeg = {
			topName: isReprint ? '重印出品单' : '出品单',
			storeName: this.appCache.store.storeName,
			tabNameOrMealNo: oneItem.showTableName,
			salesNo: oneItem.salesNo,
			user: this.appShopping.staff.staffName,
			doPrintTime: this.util.getNowTime(),

		}
		if (!this.device || !this.device.address) {
			this.http.showToast('请设置打印机!');
			// this.navCtrl.push(PRINTER_DEVICE_SELECT_PAGE, { printerType: String(1) })
			return;
		}
		this.printProvider.closeBLSPrinter().then(res => {
			setTimeout(res => {
				this.printProvider.stockingReceiptPrint(topAndLeg, doList, this.device, 'out');
			}, 200)
		}, err => {
			this.http.showToast('打印机连接失败，请检查!');
		})

	}






	printStocking(item, navCtrl,) {

		// stockQty: item['stockQty'],//商品云库存
		// stkQty: item['stockQty'],//实际商品库存
		BluetoothSerial.isEnabled().then(data => {
			let list = [];
			let topAndLeg;

			topAndLeg = {
				time: new Date(Date.parse(item.createdTime)),
				user: item.createdByName,
				stkNo: item.stkNo,

			}
			let device = Object.assign({}, this.printProvider.receiptPrinter);
			if (!device || !device.address) {
				this.http.showToast('请选择打印机!');
				navCtrl.push('', { printerType: String(1) })
				return;
			}
			// 3秒倒计时
			this.retry = true;
			this.interval = setInterval(() => {
				this.timeCount = this.timeCount - 1;

				if (this.timeCount <= 0) {
					clearInterval(this.interval);
					this.retry = false;
					this.timeCount = 3;
				}
			}, 1000);

			console.log(device);
			this.printProvider.closeBLSPrinter().then(res => {
				setTimeout(res => {
					this.printProvider.stockingReceiptPrint(topAndLeg, list, device);
				}, 200)
			}, err => {
				this.http.showToast('打印机连接失败，请检查!');
			})
		}, error => {
			this.http.showToast('蓝牙已关闭，请打开蓝牙');
		})

	}

	/**
	 * @author wenjun
	 * 打印销售相关单据
	 * @param salesData 
	 * @param navCtrl 
	 */
	printSales(salesData, navCtrl, type?) {
		let isContent: boolean = true;
		if (type) {
			isContent = this.appCache.Configuration[type]
		}

		if (this.print.receiptPrinter && this.print.receiptPrinter.address && isContent) {
			BluetoothSerial.isEnabled().then(data => {
				let list = [];
				let topAndLeg;
				list = salesData.salesDetailList;
				topAndLeg = {
					topName: salesData.topName,
					storeName: this.appCache.store.storeName,
					tabNameOrMealNo: (salesData.salesTable && salesData.salesTable.tableName) ? salesData.salesTable.tableName : salesData.salesH.mealNo,
					salesNo: salesData.salesH.salesNo,
					createdName: this.appShopping.staff.staffName + '(' + this.appShopping.staff.staffCode + ')',
					salesTime: salesData.salesH.salesTime,
					itemQty: salesData.salesH.itemQty,
					salesQty: salesData.salesH.salesQty,
					retailAmt: salesData.salesH.retailAmt,
					salesAmt: salesData.salesH.salesAmt,
					changeAmt: salesData.salesH.changeAmt,
					ttlDiscAmt: salesData.salesH.ttlDiscAmt,
					ttlTeaAmt: salesData.salesH.ttlTeaAmt,
					statusName: salesData.salesH.status == '1' ? '已结账' : '未结账',
					remark: salesData.salesH.remark || null,
					personNum: salesData.salesH.personNum,
					totalOneCampaignPrice: this.getTotalOneCampaignPrice(salesData.salesCampaign),
					allCampaignPrice: this.getAllCampaignPrice(salesData.salesCampaign),
				}
				if (type == 'DY_JCD' || type == 'DY_TCD') {
					topAndLeg.itemQty = null;
					topAndLeg.salesQty = null;
					topAndLeg.retailAmt = null;
					topAndLeg.salesAmt = null;
					topAndLeg.ttlTeaAmt = null;
					topAndLeg.statusName = null;
					topAndLeg.personNum = null;
				}
				if (salesData.salesTable && salesData.salesTable.virtualId) {
					topAndLeg.tabNameOrMealNo = topAndLeg.tabNameOrMealNo + '(' + salesData.salesTable.virtualId + ')';
				}
				// if (salesData.customer) {
				// 	topAndLeg['customer'] = salesData.customer.custName;
				// }
				if (salesData.salesPayList) {
					topAndLeg['salesPayList'] = salesData.salesPayList;
				}
				if (type == 'DY_YJD') {
					topAndLeg['expectedAmount'] = this.util.accAdd(topAndLeg.salesAmt, topAndLeg.ttlTeaAmt);
				}
				if (type == 'DY_JZD') {
					topAndLeg['retailPrice'] = salesData.salesH.payAmt;
				}
				// if (salesData.salesTable&&salesData.salesTable.virtualId) {
				// 	topAndLeg.tabNameOrMealNo = topAndLeg.tabNameOrMealNo + "-" + salesData.salesTable.virtualId;
				// }
				salesData.salesDetailList = this.buildPrintSalesDetail(salesData.salesDetailList, type);
				let device = Object.assign({}, this.printProvider.receiptPrinter);
				if (!device || !device.address) {
					this.http.showToast('请选择打印机!');
					navCtrl.push('', { printerType: String(1) })
					return;
				}
				// 3秒倒计时
				this.retry = true;
				this.interval = setInterval(() => {
					this.timeCount = this.timeCount - 1;

					if (this.timeCount <= 0) {
						clearInterval(this.interval);
						this.retry = false;
						this.timeCount = 3;
					}
				}, 1000);

				console.log(device);
				this.printProvider.closeBLSPrinter().then(res => {
					setTimeout(res => {
						this.printProvider.stockingReceiptPrint(topAndLeg, list, device, 'sales');
					}, 500)
				}, err => {
					this.http.showToast('打印机连接失败，请检查!');
				})
			}, error => {
				this.http.showToast('蓝牙已关闭，请打开蓝牙');
			})
		}


	}

	buildPrintSalesDetail(salesDetailList, type) {
		if (type == "DY_JCD") {
			if (salesDetailList && salesDetailList.length > 0) {
				salesDetailList.forEach(e1 => {
					if (e1.relatedType == "M") {
						let list = [];
						salesDetailList.forEach(e2 => {
							if (e1.id == e2.parentId && e2.relatedType == 'A') {
								let data = JSON.parse(JSON.stringify(e2))
								list.push(data)
							}
						});
						e1.tmpAdditionList = list;
					}
				});
			}
		}

		if (salesDetailList && salesDetailList.length > 0) {
			salesDetailList.forEach(element => {
				let list = element.tmpAdditionList;
				if (list && list.length > 0) {
					list.forEach(com => {
						if (com.salesAmt && com.salesAmt != 0) {
							element.salesAmt = this.util.accAdd(element.salesAmt, com.salesAmt);
							element.retailPrice = this.util.accAdd(element.retailPrice, this.util.accDiv(com.salesAmt, element.salesQty));
						} else {
							let salesAmt = this.util.accMul(com.salesQty, com.salesPrice)
							element.salesAmt = this.util.accAdd(element.salesAmt, salesAmt);
							element.retailPrice = this.util.accAdd(element.retailPrice, this.util.accDiv(salesAmt, element.salesQty));
						}

						element.salesPrice = this.util.accDiv(element.salesAmt, element.salesQty, 10);
						com.salesQty = -this.util.accMul(com.salesQty, this.util.accDiv(element.returnQty, element.salesQty, 10));
						if (type == 'DY_TCD') {
							if (com.salesQty && com.salesQty != 0) {
								salesDetailList.push(com);
							}
						}
						// price = this.utilProvider.accAdd(price, this.utilProvider.accMul(com.salesQty, com.salesPrice));
					});
				}
				if (type == "DY_JCD") {
					element.itemName = '【加】' + element.itemName;
				}
				if (type == "DY_TCD") {
					element.salesAmt = this.util.accMul(element.salesAmt, this.util.accDiv(element.returnQty, element.salesQty, 10))
					element.salesAmt = 0 - element.salesAmt;
					element.salesQty = 0 - element.returnQty;
					element.itemName = '【退】' + element.itemName;
				}


			});
		}
	}

	//单优惠金额
	getTotalOneCampaignPrice(list) {
		if (list && list.length > 0) {
			let price = 0;
			list.forEach(salesCampaign => {
				if (salesCampaign.discountType == '0' || salesCampaign.isDelete == '1') {
					return;
				}
				price = this.util.accAdd(price, salesCampaign.discountAmt);
			});
			return price;
		} else {
			return 0;
		}

	}

	//整单优惠金额
	getAllCampaignPrice(list) {
		if (list && list.length > 0) {
			let price = 0;
			list.forEach(salesCampaign => {
				if (salesCampaign.discountType == '1' || salesCampaign.isDelete == '1') {
					return;
				}
				price = this.util.accAdd(price, salesCampaign.discountAmt);
			});
			return price;
		} else {
			return 0;
		}
	}
}
