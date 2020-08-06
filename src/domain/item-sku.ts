import { IBaseEntity } from "./iBaseEntity";


export interface IItemSku extends IBaseEntity {
  /**VARCHAR(50) NOT NULL */
  id,
  /**VARCHAR(50) NOT NULL COMMENT '店铺ID' */
  storeId,
  /**VARCHAR(15) NOT NULL COMMENT '店铺SysCode' */
  storeSysCode,
  /**VARCHAR(50) NOT NULL COMMENT '商品spuId' */
  spuId,
  /**VARCHAR(50) NOT NULL COMMENT '商品名称' */
  itemName,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '商品编号  条码' */
  itemCode,
  /**VARCHAR(2) NOT NULL COMMENT 'N:normall普通商品, G: Group组合商品,套餐, S:Service服务' */
  itemType,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否原料：0 商品 1 原料' */
  useType,
  /**VARCHAR(1) NOT NULL DEFAULT '0' COMMENT '是否停售： 0 正常 1 停售' */
  status,
  /** VARCHAR(30) NOT NULL COMMENT '商品拼音码' */
  pyCode,
  /**INT(1) NOT NULL DEFAULT '1' COMMENT '是否默认商品： 0-否 1-是' */
  isDefault,
  /** VARCHAR(30) NULL DEFAULT NULL COMMENT '规格1' */
  specs1,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '规格2' */
  specs2,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '规格3' */
  specs3,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '规格4' */
  specs4,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '规格5' */
  specs5,
  /**INT(5) NULL DEFAULT '1' COMMENT '多规格产品排序' */
  lineNo,
  /**DECIMAL(15,2) NOT NULL COMMENT '进货价' */
  purchasePrice,
  /**DECIMAL(15,2) NOT NULL COMMENT '销售价' */
  retailPrice,
  /**DECIMAL(15,2) NULL DEFAULT '0.00' COMMENT '加价' */
  increasePrice,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '批发价1' */
  wholePrice1,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '批发价2' */
  wholePrice2,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '批发价3' */
  wholePrice3,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '批发价4' */
  wholePrice4,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '批发价5' */
  wholePrice5,
  /**DECIMAL(15,2) NOT NULL COMMENT '会员价1' */
  vipPrice1,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '会员价2' */
  vipPrice2,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '会员价3' */
  vipPrice3,
  /** DECIMAL(15,2) NULL DEFAULT NULL COMMENT '会员价4' */
  vipPrice4,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '会员价5' */
  vipPrice5 ,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '初始库存 ' */
  initStock,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '最小库存' */
  minStock,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '最大库存' */
  maxStock,
  /**DECIMAL(15,2) NULL DEFAULT NULL COMMENT '包装价格（比如餐盒）' */
  boxPrice,
  /**INT(11) NULL DEFAULT NULL COMMENT '积分' */
  pointValue,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否系统产品： 0 正常 1 系统产品' */
  isSys,
  /** INT(1) NOT NULL DEFAULT '0' COMMENT '删除标识' */
  isDelete,
  /**VARCHAR(50) NOT NULL COMMENT '创建人' */
  createdBy,
  /**VARCHAR(19) NOT NULL COMMENT '创建时间' */
  createdTime,
  /**VARCHAR(50) NOT NULL COMMENT '最后更新人' */
  lastUpdateBy,
  /** VARCHAR(19) NOT NULL COMMENT '最后更新时间' */
  lastUpdateTime,
  /** TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '系统更新时间' */
	sysUpdateTime,
}

export class ItemSku implements IItemSku {
   id;
   storeId;
   storeSysCode;
   spuId;
   itemName;
   itemCode;
   itemType;
   useType;
   status;
   pyCode;
   isDefault;
   specs1;
   specs2;
   specs3;
   specs4;
   specs5;
   lineNo;
   purchasePrice;
   retailPrice;
   increasePrice;
   wholePrice1;
   wholePrice2;
   wholePrice3;
   wholePrice4;
   wholePrice5;
   vipPrice1;
   vipPrice2;
   vipPrice3;
   vipPrice4;
   vipPrice5 ;
   initStock;
   minStock;
   maxStock;
   boxPrice;
   pointValue;
   isSys;
   isDelete;
   createdBy;
   createdTime;
   lastUpdateBy;
   lastUpdateTime;
   sysUpdateTime;
}