import { IBaseEntity } from "./iBaseEntity";


export interface ISalesCampaign extends IBaseEntity {
  /**VARCHAR(50) NOT NULL */
  id,
  /**VARCHAR(50) NOT NULL COMMENT '店铺ID' */
  storeId,
  /**VARCHAR(50) NOT NULL COMMENT '店铺名称' */
  storeName,
  /**VARCHAR(50) NOT NULL COMMENT '店铺系统编号' */
  storeSysCode,
  /**VARCHAR(50) NOT NULL COMMENT '订单ID' */
  salesId,
  /**INT(3) NOT NULL COMMENT '打折顺序' */
  lineNo,
  /**INT(3) NOT NULL DEFAULT '0' COMMENT '销售单状态:  0：下单，1：完成，2：作废' */
  status,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '活动ID' */
  campaignId,
  /**VARCHAR(50) NOT NULL COMMENT '活动名称 （<活动名称>/赠送/自定义折扣/改价/会员优惠/套餐名称)' */
  campaignName,
  /**INT(2) NOT NULL COMMENT '活动类型 （1活动 2 赠送 3 自定义折扣 4 改价 5 会员优惠 （整单表示会员折扣，单品表示会员价） 6 套餐）' */
  campaignType,
  /**DECIMAL(10,2) NOT NULL COMMENT '折扣规则' */
  discountRule,
  /**INT(1) NOT NULL COMMENT '折扣类型：0，整单 1，单品' */
  discountType,
  /**DECIMAL(15,2) NOT NULL COMMENT '折扣金额' */
  discountAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '折前金额' */
  originalAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '零售金额' */
  retailAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '优惠商品零售金额' */
  itemRetailAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '订单销售金额' */
  salesAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '优惠商品销售金额' */
  itemSalesAmt,
  /**DECIMAL(15,2) NOT NULL COMMENT '订单商品数量' */
  salesQty,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '订单明细ID' */
  salesDetailId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品spuId' */
  spuId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品skuId' */
  itemId,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '参与本折扣商品数据' */
  itemQty,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品编码' */
  itemCode,
  /**VARCHAR(1) NULL DEFAULT NULL COMMENT '商品类型 N,普通 S,服务 G,组合 A，加料' */
  itemType,
  /**VARCHAR(50) '商品名称' */
  itemName,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '交接班ID' */
  handoverId,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '交班财务日期' */
  handoverDate,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '折扣员工ID' */
  discountById,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '折扣员工CODE' */
  discountByCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '折扣员工名字' */
  discountByName,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员ID' */
  custId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员编号' */
  custCode,
  /**VARCHAR(100) NULL DEFAULT NULL COMMENT '会员名称' */
  custName,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否删除  0 正常 1 删除' */
  isDelete,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '创建人' */
  createdBy,
  /**VARCHAR(19) NULL DEFAULT NULL COMMENT '创建时间' */
  createdTime,
  /**VARCHAR(15) NULL DEFAULT NULL COMMENT '会员系统编号' */
  custSysCode,
}

export class SalesCampaign implements ISalesCampaign {
  id;
  storeId;
  storeName;
  storeSysCode;
  salesId;
  lineNo;
  status;
  campaignId;
  campaignName;
  campaignType;
  discountRule;
  discountType;
  discountAmt;
  originalAmt;
  retailAmt;
  itemRetailAmt;
  salesAmt;
  itemSalesAmt;
  salesQty;
  salesDetailId;
  spuId;
  itemId;
  itemQty;
  itemCode;
  itemType;
  itemName;
  handoverId;
  handoverDate;
  discountById;
  discountByCode;
  discountByName;
  custId;
  custCode;
  custName;
  isDelete;
  createdBy;
  createdTime;
  custSysCode;
}