import { IBaseEntity } from "./iBaseEntity";


export interface ITable extends IBaseEntity {
  id,
  /**VARCHAR(50) NOT NULL COMMENT '店铺名称' */
  storeId,
  /**VARCHAR(50) NOT NULL COMMENT '系统店铺编号' */
  storeSysCode,
  /**VARCHAR(50) NOT NULL COMMENT '订单ID' */
  salesId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '原订单ID (并台、联台)' */
  originSalesId,
  /**VARCHAR(50) NOT NULL COMMENT '桌台ID' */
  tableId,
  /**VARCHAR(10) NOT NULL COMMENT '桌台编号' */
  tableCode,
  /**INT(1) NULL DEFAULT '0' COMMENT '桌台虚拟ID (用于搭台)' */
  virtualId,
  /**VARCHAR(50) NOT NULL COMMENT '桌台名称' */
  tableName,
  /**VARCHAR(10) NOT NULL COMMENT '区域ID' */
  areaId,
  /**VARCHAR(10) NOT NULL COMMENT '区域Code' */
  areaCode,
  /**VARCHAR(10) NOT NULL COMMENT '区域名字' */
  areaName,
  /**ARCHAR(50) NOT NULL COMMENT '交接班ID' */
  handoverId,
  /**VARCHAR(10) NOT NULL COMMENT '交班财务日期' */
  handoverDate,
  /**VARCHAR(50) NOT NULL COMMENT '创建人' */
  createdBy,
  /**VARCHAR(19) NOT NULL COMMENT '创建时间' */
  createdTime,
  /**DECIMAL(15,4) NOT NULL COMMENT '本桌消费金额' */
  salesAmt,
  /**INT(2) NOT NULL COMMENT '人数' */
  personNum,
  /**DECIMAL(15,4) NOT NULL COMMENT '茶位费' */
  teaAmt,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '销售单状态:  0：下单，1：完成，2：作废' */
  status,
}

export class SalesTable implements ITable {
  id;
  storeId;
  storeSysCode;
  salesId;
  originSalesId;
  tableId;
  tableCode;
  virtualId;
  tableName;
  areaId;
  areaCode;
  areaName;
  handoverId;
  handoverDate;
  createdBy;
  createdTime;
  salesAmt;
  personNum;
  teaAmt;
  ttlTeaAmt;
  status;
	remark: any;
}