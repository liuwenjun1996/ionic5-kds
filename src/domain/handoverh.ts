import { IBaseEntity } from "./iBaseEntity";


export interface Handoverh extends IBaseEntity {
  id,
  /**交班编号 */
  handoverCode,
  /**收银机编号 */
  posId,
  /**当班员工ID */
  staffId,
  /**当班员工编号 */
  staffCode,
  /**当班员工姓名 */
  staffName,
  /**当班开始时间 */
  startTime,
  /**当班结束时间 */
  endTime,
  /**提交交班时间 */
  postingTime,
  /**当班财务日期 */
  handoverDate,
  /**结束当班员工id */
  postingStaffId,
  /**结束当班员工编号 */
  postingStaffCode,
  /**结束当班员工姓名 */
  postingStaffName,
  /**备用金金额 */
  pettyCash,
  /**总金额 */
  ttlAmt,
  /**销售总金额 */
  ttlSalesAmt,
  /**销售退货总金额 */
  ttlReturntAmt,
  /**充值总金额 */
  ttlRechargeAmt,
  /**充值赠送金额 */
  ttlFreeAmt,
  /**销售取消总金额 */
  ttlVoidAmt,
  /**交班状态 0未交班, 1已交班 */
  status,
  /**是否删除 0 否，1 是 */
  isDelete,
  /**创建时间 */
  createdTime,
  /**创建者 */
  createdBy,
  /**最后修改者 */
  lastUpdateBy,
  /**备用字段1 */
  define1,
  /**备用字段2 */
  define2,
  /**备用字段3 */
  define3,
  /**备用字段4 */
  define4,
  /**店铺ID */
  storeId,
  /**系统更新时间 */
  sysUpdateTime,
  /**最后修改时间 yyyy-MM-dd HH:mm:ss */
  lastUpdateTime,
  /**坐实金额 */
  inputAmt,
  /**销售单数 */
  ttlSalesTicket,
  /**退货单数 */
  ttlReturntTicket,
  /**取消单数 */
  ttlVoidTicket,
  /**充值单数 */
  ttlRechargeTicket,
  /**现金总金额 */
  ttlCash,
  /**店铺名称 */
  storeName,
  /**次卡购买金额 */
  ttlTimesAmt,
  /**次卡单据数(包含购买,消费) */
  ttlTimesTicket,
  /**次卡消费金额 */
  ttlTimesConsumeAmt,
  /**次卡消费次数 */
  ttlTimesConsumeTicket,
  /**营业额 */
  ttlTurnoverAmt,
  /**预付款 */
  ttlAdvanceAmt,
  /**收支总金额 */
  ttlIncAmt,
  /**收支总单数 */
  ttlIncTicket,
  /**交班赊帐金额 */
  ttlChargeAmt,
  /**交班赊帐单据数 */
  ttlChargeTicket,
  /**交班还款金额 */
  ttlRepayAmt,
  /**销售总优惠 */
  ttlDiscoutAmt,
  /**储值卡支付总金额 */
  ttlAdAmt,
  /**店铺系统编号 */
  storeSysCode,
}
