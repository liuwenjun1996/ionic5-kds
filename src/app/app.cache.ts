import { SysMsg } from "../domain/sysMsg";
import { Injectable } from "@angular/core";
// import { SimpleStockingDao } from "../dao/simpleStockingDao";
// import { SimpleStocking } from "../domain/simpleStocking";


@Injectable({
  providedIn: 'root',
})
export class AppCache {

    user: any = null;
    store: any = null;
    macId: string = '';

    startRight: number = 20;
    startBottom: number = 30;
    userToken: any = {};
    selSeller: any = {};
    seller: any;
    processing_table: boolean;
    processing_waimai: any;
    badgeNum: any;
    totalMsgNum: any;
    sysMsg0: any;
    subSellers: any;
    sysMsgs: any;
    processing_cash: any;
    sysMsg1: any;
    msgShowed: any;
    rootPage: string = '';
    // 显示图片模式
    showNoImgMode: boolean = false;
    isBackgroundMode: boolean = false; //记录设备是否进入后台

    //配置信息
    Configuration: any = {
        DY_CPD: true,
        DY_GKD: true,
        DY_TD: true,
        DY_YJD: true,
        DY_JZD: true,
        DY_JCD: true,
        DY_TCD: true,
        DY_SPMS: 0,

        /**商品分类定位 不显示 id:1 */
        DW_CATEGORY_MAP: null,
        /**商品餐桌定位 不显示 id:1 */
        DW_TABLE_ISSHOW_MAP: null,

        /**出品模式 N:普通 S:分串 */
        OUT_MODEL_TYPE: 'N',
        NEW_GET_FOOT_NOT: false,
        /**是否第一次打开应用 */
        IS_FIRST_OPEN: false,
        /**应用模式 KDS:出品 ADS：配菜 TV:广告/叫号 */
        SYS_MODEL_TYPE: 'KDS',


        /**广告图片地址 */
        TV_AD_IMAG_LIST: null,

    };


    //切换店铺须清除缓存
    changStoreResetData() {


    }
    resetData() {
        this.user = null;
        this.store = null;
        this.macId = null;
        this.rootPage = '';
        this.Configuration = {
            DY_CPD: true,
            DY_GKD: true,//顾客单
            DY_TD: true,//台单
            DY_YJD: true,//预结单
            DY_JZD: true,//结账单
            DY_JCD: true,//加菜单
            DY_TCD: true,//退菜单
            DY_SPMS: 0,//品名字体大小

            DW_CATEGORY_ISSHOW_MAP: null,
            DW_TABLE_ISSHOW_MAP: null,
            OUT_MODEL_TYPE: 'N',
            NEW_GET_FOOT_NOT: false,
            IS_FIRST_OPEN: false,
            SYS_MODEL_TYPE: 'KDS',
            TV_AD_IMAG_LIST: null,
        };
    };

}