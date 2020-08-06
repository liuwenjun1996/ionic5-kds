import { IBaseEntity } from "./iBaseEntity";

/**员工实体类 */
export interface Staff extends IBaseEntity {
  id,
  staffCode,
  staffName,
  password,
  telNo,
  cashierCommission,
  /**0 激活 1 禁用 */
  disabled,
  minDiscount,
  isSys,
  /**0,1:删除 */
  isDelete,
  createdTime,
  createdBy,
  lastUpdateTime,
  lastUpdateBy,
  define1,
  define2,
  /**C : Cashier 收银员 , S:Salesman 导购员 */
  staffTypeNo,
  remark,
  /**0 无权限, 1 有权限 */
  isMangePerm,
  storeId,
  /**系统更新时间 */
  sysUpdateTime,
  /**销售提成（百分比）,取值0-100 */
  salesDeductRate,
  /**充值提成（百分比）,取值0-100 */
  rechargeDeductRate,
  /**次卡提成（百分比）,取值0-100 */
  itemTimesDeductRate,
  /**公共权限 逗号分隔 9000:显示进货价 */
  commonCommission,
}
