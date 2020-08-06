import { Injectable } from "@angular/core";
import { SalesDetail } from "../domain/salesDetail";

@Injectable({
  providedIn: 'root',
})
//点餐相关数据缓存
export class AppShopping {
    dataCache: any;

    /**
   * 商品分类
    */
    public categoryList: Array<any> = [];

    /**
      * 商品spu
      * hasAddition 0-没有 1-有
      * itemType  N:normall普通商品, G: Group组合商品,套餐, S:Service服务
      */
    public comSpuList: Array<any> = [];

    /**
      * 商品sku
      */
    public comSkuList: Array<any> = [];


    /**餐桌*/
    public tableList: any = [];

    public areaList: any = [];


    /** 全部下单商品*/
    salesDetailList: SalesDetail[] = [];

    /**
    * 分类对应的购物车商品数量Map
    * cateId:num
    */
    typeOfCarComMap: {} = {};

    /**
    * spu商品对应的购物车商品数量Map
    * cateId:num
    */
    spuOfCarComMap: {} = {};

    /**
    * 单个spu商品对应的购物车商品数量Map
    * spuId:num
    */
    ComOfCarComMap: {} = {};


    /**当登录员  Staff*/
    staff: any = null;

    /**  值班收银员*/
    cashier: any = null;

    /**下单桌台 */
    salesTableList: any = [];
    /**取单桌台 如果不为空就是取单单据 */
    salesTable: any = {};
    table: any = {};


    /**用于显示的数据 */

    /**未出品 */
    showSalesDetailList: any = [[]];
    /**已出品 */
    showOutSalesDetailList: any = [[]];
    /**未出品 */
    showSalesTableList: any = [[]];
    /**已出品 */
    showOutSalesTableList: any = [[]];
    /* 退菜 */
    showRetreatFoodList : any=[[]];
    /* 退菜value值 */
    returnQtyValue:any='0'
    /**分串模式 */
    showSplitCateList: any = [];
    showSplitAreaList: any = [];

    showItemMode: any = '0';
    showRetreatFoodItemMode:any='0';
    /**历史出品的模式 */
    showItemOutMode: any = '0';
    /* 输入框的值 */
    searchText: any = null;
    /* 退菜输入框的值 */
    retreatFoodSearchText:any=null;
    queueOrderList: any = [];
    queueOrderDetailList: any = [];
    showQueueOrderList:any=[[]];

    initData() {

    }

    //切换店铺须清除缓存
    changStoreResetData() {
        this.salesDetailList = [];
        this.typeOfCarComMap = {};
        this.cashier = null;

    }

    /**
    * 下单清除缓存
    */
    clearOdear() {
        this.salesDetailList = [];
        this.typeOfCarComMap = {};
        this.spuOfCarComMap = {};
        this.salesTable = {};
        this.table = {};

    }
    /**清除商品数据 */
    resetItemData() {

        this.typeOfCarComMap = {};
        this.spuOfCarComMap = {};
        this.categoryList = [];
        this.comSpuList = [];
        this.comSkuList = [];
        this.salesDetailList = [];
        this.tableList = [];
        this.salesTableList = [];
        this.cashier = null;
        this.areaList = [];
        this.showSalesDetailList = [[]];
        this.showOutSalesDetailList = [[]];
        this.showSalesTableList = [[]];
        this.showOutSalesTableList = [[]];
        this.showRetreatFoodList=[[]];
        this.showSplitCateList = [];
        this.showSplitAreaList = [];
        this.searchText = null;
        this.queueOrderList = [];
        this.queueOrderDetailList = [];
    };

    /**
    * 清除所有缓存
    */
    resetData() {

        this.typeOfCarComMap = {};
        this.spuOfCarComMap = {};
        this.categoryList = [];
        this.comSpuList = [];
        this.comSkuList = [];
        this.salesDetailList = [];
        this.typeOfCarComMap = {};
        this.ComOfCarComMap = {};
        this.staff = null;
        this.salesTable = {};
        this.table = {};
        this.cashier = null;
        this.areaList = [];

        this.showSalesDetailList = [[]];
        this.showOutSalesDetailList = [[]];
        this.showSalesTableList = [[]];
        this.showOutSalesTableList = [[]];
        this.showRetreatFoodList=[[]];
        this.showSplitCateList = [];
        this.showSplitAreaList = [];
        this.searchText = null;
        this.queueOrderList = [];
        this.queueOrderDetailList = [];
    };




    addDataCache(key: string, value: any) {
        let createdTime = new Date().getTime();
        let data = { data: value, createdTime: createdTime };
        this.dataCache.set(key, data);
    }

    getDataCache(key: string): any {
        let data = this.dataCache.get(key);
        let expireTime = new Date().getTime() - 1 * 60 * 60 * 1000;
        if (data) {
            let value = data.data;
            if (value.createdTime < expireTime) {
                this.dataCache.delete(key);
                return null;
            } else {
                return value;
            }
        } else {
            return data;
        }
    }

    delDataCache(key: string) {
        this.dataCache.delete(key);
    }


}