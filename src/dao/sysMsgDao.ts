import {Injectable} from '@angular/core';
import {SysMsg, ISysMsg, MSG_KEY_DEF} from "../domain/sysMsg"
import {GenericDAO} from "./genericDAO";
@Injectable({
  providedIn: 'root',
})
export class SysMsgDao extends GenericDAO<ISysMsg> {
  readonly tableName: string = SysMsg.tableName;

  queryById(id: string) {
    return this.queryAsListByWhere('where id = ?', [id])
  }

  queryFirstByPage(storeId:string, page: number, limit: number, single:boolean=false) {
    if(single) {
      return this.queryAsListByWhere("where (storeId = ? or storeId = '10000') order by pushTime desc LIMIT ? OFFSET ?", [storeId, limit, (page - 1) * limit]);
    } else {
      return this.queryAsListByWhere("where storeId = ? order by pushTime desc LIMIT ? OFFSET ?", [storeId, limit, (page - 1) * limit]);
    }
  }

  queryNextByPage(storeId:string, timestamp:number, page: number, limit: number, single:boolean=false) {
    if(single) {
      return this.queryAsListByWhere("where (storeId = ? or storeId = '10000') and pushTime <= ? order by pushTime desc LIMIT ? OFFSET ?", [storeId, timestamp, limit, (page - 1) * limit]);
    } else {
      return this.queryAsListByWhere("where storeId = ? and pushTime <= ? order by pushTime desc LIMIT ? OFFSET ?", [storeId, timestamp, limit, (page - 1) * limit]);
    }
  }

  removeByStoreId(storeId:string) {
    return this.removeByWhere("where storeId = ?", [storeId]);
  }

  //详情列表
  // getMsgDetailList(appCache:AppCache, appConstants:AppConstants, single:boolean=false): Observable<any> {
    // appCache.sysMsgs=[];
    // appCache.isLasMsg = false;
    // appCache.msgCurrPage = 1;
    // return Observable.create(observer => {
    //   this.queryFirstByPage(appCache.selSeller.id, appCache.msgCurrPage, appConstants.MSG_PAGE_SIZE).then((data) => {
    //     appCache.findMsgTime = null;
    //     let hasSys = false;
    //     for (let item of data) {
    //       appCache.sysMsgs.push(item);
    //       if (appCache.findMsgTime == null || appCache.findMsgTime < item.pushTime) {
    //         appCache.findMsgTime = item.pushTime;
    //       }
    //       if(item.id == appConstants.SYS_SELLER_ID) {
    //         hasSys = true;
    //       }
    //     }
    //     if (data.length < appConstants.MSG_PAGE_SIZE || appCache.sysMsgs.length >= 1000) {
    //       appCache.isLasMsg = true;
    //       if(hasSys == false && (appCache.selSeller.id ==appConstants.SYS_SELLER_ID || appCache.subSellers.length == 1)) {
    //         let sysMsg = new SysMsg();
    //         sysMsg.id = appConstants.SYS_SELLER_ID;
    //         sysMsg.bizType = MSG_KEY_DEF;
    //         sysMsg.storeId = appConstants.SYS_SELLER_ID;
    //         sysMsg.title = '爱宝团队';
    //         sysMsg.content = '欢迎使用爱宝点菜宝';
    //         sysMsg.subcontent = '智能爱宝 连锁未来';
    //         sysMsg.transImg = 'assets/imgs/logo.png';
    //         appCache.sysMsgs.push(sysMsg);
    //       }
    //     }
    //     observer.next(true);
    //   }, error => {
    //     console.log(error);
    //     observer.next(false);
    //   });
    // });
  // } 
}