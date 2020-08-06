
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { HttpProvider } from '../providers/http';
import { AppCache } from '../app/app.cache';
import { Observable } from 'rxjs';
import { ConfigurationDao } from '../dao/configurationDao';


@Injectable({
  providedIn: 'root',
})
export class SystemService {
    deviceType: string;
    constructor(
        public http: HttpProvider,
        public appCache: AppCache,
        public configurationDao: ConfigurationDao,

    ) {


    }


    //获取配置信息
    getConfiguration(storeId) {
        return Observable.create(obs => {
            this.configurationDao.queryByStoreId(storeId).then(res => {
                console.log('121212121');
                console.log(res);
                if (res && res.length > 0) {
                    res.forEach(data => {
                        if (data.value == 'false') {
                            let key = data.id;
                            this.appCache.Configuration[key] = false;
                        } else {
                            let key = data.id;
                            if (key == 'TV_AD_IMAG_LIST') {
                                this.appCache.Configuration[key] = JSON.parse(data.value);
                            } else {
                                this.appCache.Configuration[key] = data.value;
                            }
                        }
                    })
                }

                obs.next();

            }, err => {
                this.http.showToast('获取配置信息出错,请重试！');
                obs.error();
            })
        })

    }

    /**所有店铺/账号公用设置 */
    setConfigurationByAll(parm) {
        parm.storeId = 'all';
        return this.configurationDao.set(parm);
        // return this.getConfiguration('all');
    }

    getConfigurationByAll() {
        return this.getConfiguration('all');
    }
}
