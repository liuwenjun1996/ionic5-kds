import { IBaseEntity } from "./iBaseEntity";


export interface ISalesPay extends IBaseEntity {
  id,
  /**VARCHAR(50) NOT NULL COMMENT '销售单id' */
  salesId,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '销售单编号' */
  salesNo,
  /**INT(11) NULL DEFAULT NULL COMMENT '序号' */
  lineNo,
  /**INT(11) NULL DEFAULT NULL COMMENT '0: 否, 1 :是' */
  changeFlag,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '支付方式id' */
  payId,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '支付编号' */
  payCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '支付姓名' */
  payName,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '支付金额' */
  payAmt,
  /**VARCHAR(2) NULL DEFAULT NULL COMMENT '收银机编号' */
  posId,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '财务日期' */
  payDate,
  /**VARCHAR(19) NULL DEFAULT NULL */
  payTime,
  /**INT(1) NULL DEFAULT NULL COMMENT '是否删除 0 否，1 是' */
  isDelete,
  /**VARCHAR(19) NULL DEFAULT NULL COMMENT '创建时间' */
  createdTime,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '创建者' */
  createdBy,
  /** VARCHAR(50) NULL DEFAULT NULL COMMENT '第三方支付流水号  支付宝/微信流水' */
  payTransId,
  /**INT(1) NULL DEFAULT NULL COMMENT '支付状态  0—未支付  1--用户支付中  3—支付成功 3—已关闭  4-支付失败(其他原因，如银行返回失败)' */
  payStatus,
  /**VARCHAR(50) NOT NULL COMMENT '店铺ID' */
  storeId,
  /** '系统更新时间' */
  sysUpdateTime,
  /**VARCHAR(4) NOT NULL COMMENT '年 yyyy' */
  payYear,
  /**VARCHAR(7) NOT NULL COMMENT '年月 yyyy-MM' */
  payMonth,
  /**VARCHAR(1) NOT NULL COMMENT 'S:Sales 销售, W：批发, T: 外带, O: 网购' */
  salesType,
  /**VARCHAR(1) NOT NULL COMMENT 'N:normal: 正常单据, V: void取消单据, R;return退货单' */
  orderType,
  /**VARCHAR(100) NULL DEFAULT NULL COMMENT '店铺名称' */
  storeName,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '备注' */
  remark,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '拉卡拉备注' */
  lklRemark,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '交接班ID' */
  handoverId,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '交班财务日期' */
  handoverDate,
  /** VARCHAR(15) NOT NULL COMMENT '店铺系统编号' */
  storeSysCode,
  /** VARCHAR(50) NULL DEFAULT NULL COMMENT '????ԱID' */
  cashierId,
  /** VARCHAR(50) NULL DEFAULT NULL COMMENT '????Ա???' */
  cashierCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '????Ա???' */
  cashierName,
}

export class SalesPay implements ISalesPay {
  id;
  salesId;
  salesNo;
  lineNo;
  changeFlag;
  payId;
  payCode;
  payName;
  payAmt;
  posId;
  payDate;
  payTime;
  isDelete;
  createdTime;
  createdBy;
  payTransId;
  payStatus;
  storeId;
  sysUpdateTime;
  payYear;
  payMonth;
  salesType;
  orderType;
  storeName;
  remark;
  lklRemark;
  handoverId;
  handoverDate;
  storeSysCode;
  cashierId;
  cashierCode;
  cashierName;
}