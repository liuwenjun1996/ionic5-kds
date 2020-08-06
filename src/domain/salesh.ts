import { IBaseEntity } from "./iBaseEntity";


export interface ISalesh extends IBaseEntity {
  id,
  /** '店铺id'*/
  storeId,
  /**店铺系统编号 */
  storeSysCode,
  /**店铺名称 */
  storeName,
  /**销售单号 */
  salesNo,
  /**销售流水号 */
  serialNum,
  /**用餐牌号 */
  mealNo,
  /**S:Sales 堂食,  O, 外带,  T, 外卖 */
  salesType,
  /**N:normal: 正常单据, V: void取消单据, R;return退货单 */
  orderType,
  /**销售日期 yyyy-MM-dd */
  salesDate,
  /**销售时间 yyyy-MM-dd HH:mm:ss */
  salesTime,
  /**商品总成本 */
  costAmt,
  /**零售总价 */
  retailAmt,
  /**销售总价 */
  salesAmt,
  /**销售数量 */
  salesQty,
  /**预付款（餐饮押金） */
  preAmt,
  /**总折扣金额 */
  ttlDiscAmt,
  /**总积分 */
  ttlPointValue,
  /**实付金额 */
  payAmt,
  /**找零金额 */
  changeAmt,
  /**服务费 */
  serviceAmt,
  /**茶位费 */
  // teaAmt,
  /**顾客id */
  custId,
  /**顾客编号 */
  custCode,
  /**顾客名称 */
  custName,
  /**收银机编号 */
  posId,
  /**A:Auto 自动收银, M: manual 有人值守收银 */
  posType,
  /**0:未提醒, 1:已提醒 */
  autoSalesRemind,
  /**备注 */
  remark,
  /**收银员id */
  cashierId,
  /**收银员编号 */
  cashierCode,
  /**收银员姓名 */
  cashierName,
  /**导购员1id */
  salesmanId1,
  /**导购员1编号 */
  salesmanCode1,
  /**导购员1姓名 */
  salesmanName1,
  /**导购员2id */
  salesmanId2,
  /**导购员2编号 */
  salesmanCode2,
  /**导购员2姓名 */
  salesmanName2,
  /**是否删除 0 否，1 是 */
  isDelete,
  /**被退货单id / 被取消单id */
  originSalesId,
  /**被退货单编号 / 被取消单编号 */
  originSalesNo,
  /**销售年 yyyy */
  salesYear,
  /**销售月 yyyy-MM */
  salesMonth,
  /**销售单状态:  0：下单，1：完成，2：作废 */
  status,
  /**支付状态  0—未支付  1--用户支付中  3—支付成功 3—已关闭  4-支付失败(其他原因，如银行返回失败) */
  payStatus,
  /**支付信息 */
  payInfo,
  /**交接班ID */
  handoverId,
  /**下单人IP */
  originIp,
  /**收银机mac地址 */
  macAddr,
  /**创建者 */
  createdBy,
  /**创建时间 */
  createdTime,
  /**最近更新人 */
  lastUpdateBy,
  /**最近更新时间 */
  lastUpdateTime,
  /**系统更新时间 */
  sysUpdateTime,
  /**外卖订单ID */
  waimaiSalesId,
  /**订单来源: EL 饿了么 MT 美团 AB 爱宝 SL 自助 CS 收银员  WX 微信 MB 点菜宝 */
  channel,
  /**会员系统编号 */
  custSysCode,
}

export class Salesh implements ISalesh {
  id;
  storeId;
  storeSysCode;
  storeName;
  salesNo;
  serialNum;
  mealNo;
  salesType;
  orderType;
  salesDate;
  salesTime;
  costAmt;
  retailAmt;
  salesAmt;
  salesQty;
  preAmt;
  ttlDiscAmt;
  ttlPointValue;
  payAmt;
  changeAmt;
  serviceAmt;
  // teaAmt;
  ttlTeaAmt;
  custId;
  custCode;
  custName;
  posId;
  posType;
  autoSalesRemind;
  remark;
  cashierId;
  cashierCode;
  cashierName;
  salesmanId1;
  salesmanCode1;
  salesmanName1;
  salesmanId2;
  salesmanCode2;
  salesmanName2;
  isDelete;
  originSalesId;
  originSalesNo;
  salesYear;
  salesMonth;
  status;
  payStatus;
  payInfo;
  handoverId;
  originIp;
  macAddr;
  createdBy;
  createdTime;
  lastUpdateBy;
  lastUpdateTime;
  sysUpdateTime;
  waimaiSalesId;
  channel: string;
  custSysCode: string;
  personNum:number;
  itemDiscSalesAmt;
  itemDiscAmt;
  itemWholeDiscAmt;


  static toJson() {
    return {
      id: null,
      storeId: null,
      storeSysCode: null,
      storeName: null,
      salesNo: null,
      serialNum: null,
      mealNo: null,
      salesType: null,
      orderType: null,
      salesDate: null,
      salesTime: null,
      costAmt: null,
      retailAmt: null,
      salesAmt: null,
      salesQty: null,
      preAmt: null,
      ttlDiscAmt: null,
      ttlPointValue: null,
      payAmt: null,
      changeAmt: null,
      serviceAmt: null,
      // teaAmt: null,
      custId: null,
      custCode: null,
      custName: null,
      posId: null,
      posType: null,
      autoSalesRemind: null,
      remark: null,
      cashierId: null,
      cashierCode: null,
      cashierName: null,
      salesmanId1: null,
      salesmanCode1: null,
      salesmanName1: null,
      salesmanId2: null,
      salesmanCode2: null,
      salesmanName2: null,
      isDelete: null,
      originSalesId: null,
      originSalesNo: null,
      salesYear: null,
      salesMonth: null,
      status: null,
      payStatus: null,
      payInfo: null,
      handoverId: null,
      originIp: null,
      macAddr: null,
      createdBy: null,
      createdTime: null,
      lastUpdateBy: null,
      lastUpdateTime: null,
      sysUpdateTime: null,
      waimaiSalesId: null,
      channel: null,
      custSysCode: null,
      personNum:null,
    }
  }
}