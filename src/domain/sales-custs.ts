import { IBaseEntity } from "./iBaseEntity";


export interface ISalesCusts extends IBaseEntity {
  /**VARCHAR(50) NOT NULL COMMENT '销售单ID' */
  id,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员ID' */
  custId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员编号' */
  custCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员名称' */
  custName,
  /**VARCHAR(200) NULL DEFAULT NULL COMMENT '会员手机 (多个号码用，分割)' */
  custPhone,
  /**VARCHAR(12) NULL DEFAULT NULL COMMENT '会员生日' */
  birthDay,
  /** VARCHAR(50) NULL DEFAULT NULL COMMENT '会员级别' */
  gradeId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员级别编号' */
  gradeCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员级别名称' */
  gradeName,
  /**VARCHAR(10) NOT NULL COMMENT '0:无, 1  会员价, 2: 零售折扣' */
  discountType,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '0 无, 2 零售折扣价,1 会员价' */
  discountTypeName,
  /**INT(11) NULL DEFAULT NULL COMMENT '0 No,1 Yes' */
  isPoint,
  /** DECIMAL(8,2) NULL DEFAULT NULL COMMENT '零售折扣价' */
  discountRate,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '会员销售前积分' */
  beforeTTLPoint,
  /**DECIMAL(15,2) NULL DEFAULT '0.00' COMMENT '会员余额' */
  balance,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '会员地址' */
  custAddr,
  /**VARCHAR(50) NOT NULL COMMENT '店铺编号' */
  storeId,
  /**VARCHAR(50) NOT NULL COMMENT '店铺名称' */
  storeName,
  /**VARCHAR(15) NOT NULL COMMENT '店铺系统编号' */
  storeSysCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '交班ID' */
  handoverId,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '交班财务日期' */
  handoverDate,
  /**VARCHAR(2) NOT NULL DEFAULT 'CS' COMMENT '订单来源: EL 饿了么 MT 美团 AB 爱宝 SL 自助 CS 收银员  WX 微信' */
  channel,
  /**VARCHAR(15) NULL DEFAULT NULL COMMENT '会员系统编号' */
  custSysCode,
}

export class SalesCusts implements ISalesCusts {
  id;
  custId;
  custCode;
  custName;
  custPhone;
  birthDay;
  gradeId;
  gradeCode;
  gradeName;
  discountType;
  discountTypeName;
  isPoint;
  discountRate;
  beforeTTLPoint;
  balance;
  custAddr;
  storeId;
  storeName;
  storeSysCode;
  handoverId;
  handoverDate;
  channel;
  custSysCode;
  custStoreId;
  custStoreName;
  custStoreSysCode;
  isDelete;


}