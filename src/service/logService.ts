import { Injectable } from '@angular/core';
import { UtilProvider } from '../providers/util/util';
import { AppCache } from '../app/app.cache';
import { AppShopping } from '../app/app.shopping';
import { Log } from '../domain/log';
import { AppConstants } from '../app/app.constants';
import { LogDao } from '../dao/logDao';
import { Subscriber } from 'rxjs';

/*
  Generated class for the WoOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class LogService {

	constructor(
		public utilProvider: UtilProvider,
		public appCache: AppCache,
		public appShopping: AppShopping,
		public appConstants: AppConstants,
		public logDao: LogDao,
		// public print:PrintService,
		// public webSocketService: WebSocketService,
	) {
		console.log('Hello WoOrderProvider Provider');
	}

	/**写入日志 */
	setLog(value, operationType, id?) {
		let data = new Log();
		data.storeId = this.appCache.store.id;
		data.logTime = this.utilProvider.getNowTime();
		data.id = id ? id : this.utilProvider.getUUID();
		data.versions = this.appConstants.VERSION;
		data.operationStaff = this.appShopping.staff.id;
		data.operationType = operationType;
		data.value = value;
		this.logDao.set(data);
	}

	/**清除所有日志 */
	clearLog() {
		this.logDao.clear();
	}
	/**清除指定店铺日志 */
	clearLogBystoreId(storeId) {
		this.logDao.removeByWhere('storeId', storeId);
	}

	/**查询日志 */
	selectLogList(data: {}): Subscriber<any> {
		return Subscriber.create(subscriber => {
			this.logDao.queryAll().then(dataList => {
				subscriber.next(dataList);
			})
		}
		);
	}

	upLogData(msg) {
		// this.webSocketService.upLogData({ DCBLOG: msg }).subscribe(res => {
		// })
	}


}
