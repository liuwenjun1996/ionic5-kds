import { IBaseEntity } from "./iBaseEntity";


export interface IItemAddition extends IBaseEntity {
  /**VARCHAR(50) NOT NULL */
  id,
  /**VARCHAR(50) NOT NULL COMMENT '所属店铺' */
  storeId,
  /**VARCHAR(50) NOT NULL COMMENT '商品附加商品分组' */
  groupId,
  /**VARCHAR(50) NOT NULL COMMENT '主商品spuId' */
  refSpuId,
  /**VARCHAR(50) NOT NULL COMMENT '商品附加商品名称' */
  additionName,
  /** DECIMAL(15,4) NOT NULL COMMENT '商品附加商品价格' */
  price,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品spuId' */
  spuId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品skuId' */
  itemId,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '商品SKU itemCode' */
  itemCode,
  /**INT(3) NOT NULL DEFAULT '999' COMMENT '默认排序' */
  lineNo,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否删除' */
  isDelete,
  /**VARCHAR(50) NOT NULL COMMENT '店铺系统编号' */
  storeSysCode,
  /**VARCHAR(50) NOT NULL COMMENT '创建人' */
  createdBy,
  /**VARCHAR(50) NOT NULL COMMENT '创建时间' */
  createdTime,
  /** TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP*/
  sysUpdateTime,
}

export class ItemAddition implements IItemAddition {
  id;
  storeId;
  groupId;
  refSpuId;
  additionName;
  price;
  spuId;
  itemId;
  itemCode;
  lineNo;
  isDelete;
  storeSysCode;
  createdBy;
  createdTime;
  sysUpdateTime;
}