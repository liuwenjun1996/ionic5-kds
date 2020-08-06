import { IBaseEntity } from "./iBaseEntity";


export interface ISpuExt extends IBaseEntity {
  /**VARCHAR(50) NOT NULL COMMENT '商品SPUID' */
  id,
  /**VARCHAR(2000) NULL DEFAULT NULL COMMENT '动态属性' */
  dynamicAttr,
  /**VARCHAR(2000) NULL DEFAULT NULL COMMENT '静态属性' */
  staticAttr,
  /**VARCHAR(2000) NULL DEFAULT NULL COMMENT '自定义属性' */
  customAttr,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '售卖开始日期' */
  fromDate,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '售卖结束日期' */
  toDate,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '售卖星期范围' */
  specialDay,
  /** VARCHAR(5) NULL DEFAULT NULL COMMENT '售卖开始时间' */
  fromTime,
  /**VARCHAR(5) NULL DEFAULT NULL COMMENT '售卖结束时间' */
  toTime,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '供应商ID' */
  vendorId,
  /**VARCHAR(100) NULL DEFAULT '' COMMENT '供应商名称' */
  vendorName,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '生产日期' */
  productionDate,
  /**DECIMAL(8,2) NULL DEFAULT NULL COMMENT '有效期' */
  validityDays,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '产地' */
  placeOrigin,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '品牌ID' */
  brandId,
  /**VARCHAR(50) NULL DEFAULT '' COMMENT '品牌名称' */
  brandName,
  /**VARCHAR(250) NULL DEFAULT NULL COMMENT '商品描述' */
  remark,
  /**VARCHAR(50) NOT NULL COMMENT '店铺ID' */
  storeId,
  /**VARCHAR(50) NOT NULL COMMENT '店铺系统编码' */
  storeSysCode,
  /** TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP */
  sysUpdateTime,
  /**VARCHAR(100) NULL DEFAULT NULL COMMENT '商品logo' */
  logoPath,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否删除' */
  isDelete,
}

export class SpuExt implements ISpuExt {
  id;
  dynamicAttr;
  staticAttr;
  customAttr;
  fromDate;
  toDate;
  specialDay;
  fromTime;
  toTime;
  vendorId;
  vendorName;
  productionDate;
  validityDays;
  placeOrigin;
  brandId;
  brandName;
  remark;
  storeId;
  storeSysCode;
  sysUpdateTime;
  logoPath;
  isDelete;
}