import { IBaseEntity } from "./iBaseEntity";


export interface IItemSpu extends IBaseEntity {
  id,
  /**店铺ID */
  storeId,
  /**VARCHAR(15) NOT NULL COMMENT '店铺SysCode' */
  storeSysCode,
  /** VARCHAR(50) NOT NULL COMMENT '商品名称' */
  itemName,
  /**VARCHAR(50) NOT NULL COMMENT '商品编码' */
  itemCode,
  /**VARCHAR(2) NOT NULL DEFAULT '2' COMMENT '所属行业' */
  tradeType,
  /**VARCHAR(50) NOT NULL DEFAULT '0' COMMENT '所属品类' */
  storeCateId,
  /**VARCHAR(1000) NULL DEFAULT NULL COMMENT '所有规格' */
  specs,
  /**INT(1) NOT NULL COMMENT '是否有配菜： 0-没有 1-有' */
  hasAddition,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '收藏夹编号' */
  favoriteId,
  /**INT(3) NULL DEFAULT NULL COMMENT '收藏夹编号' */
  favoriteLineNo,
  /**INT(1) NULL DEFAULT '0' COMMENT '配菜是否参与打折  0 否，1 是' */
  isAdditionDiscount,
  /**INT(1) NOT NULL COMMENT '是否统一价： 0-不统一 1-统一' */
  isSamePrice,
  /**VARCHAR(30) NULL DEFAULT NULL COMMENT '拼音码' */
  pyCode,
  /**VARCHAR(10) NULL DEFAULT NULL COMMENT '单位名称' */
  unitName,
  /**INT(5) NULL DEFAULT '0' COMMENT '起售份数' */
  minCount,
  /**VARCHAR(20) NULL DEFAULT NULL COMMENT '内部编号' */
  internalCode,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '分类Id' */
  cateId,
  /**VARCHAR(100) NULL DEFAULT '' COMMENT '商品分类名称' */
  cateName,
  /**VARCHAR(1) NOT NULL DEFAULT 'N' COMMENT 'N:normall普通商品, G: Group组合商品,套餐, S:Service服务' */
  itemType,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '是否原料：0 商品 1 原料' */
  useType,
  /**VARCHAR(1) NULL DEFAULT 'N' COMMENT 'N:No不提成, R:Rate百分比,M: Money金额' */
  deductType,
  /**DECIMAL(8,2) NULL DEFAULT NULL COMMENT '提成参数值' */
  deductValue,
  /**VARCHAR(1) NOT NULL DEFAULT '0' COMMENT '商品状态 0:正常, 1: 停售' */
  status,
  /**VARCHAR(1) NOT NULL DEFAULT 'P' COMMENT '计价方式 P:普通, Z 计重, S 计数' */
  measureFlag,
  /**INT(11) NULL DEFAULT NULL COMMENT '商品排序Id' */
  lineNo,
  /**INT(11) NULL DEFAULT '0' COMMENT '是否标签打印  0：否，1：是（默认0） 收银完成后会自动打印对应数量的标签数' */
  isLabelPrint,
  /**VARCHAR(5) NULL DEFAULT NULL COMMENT '电子称PLU' */
  elecPLU,
  /**INT(1) NULL DEFAULT '1' COMMENT '是否允许打折  0 否，1 是' */
  isDiscount,
  /**INT(1) NULL DEFAULT '0' COMMENT '是否积分 0:否 1：是' */
  isPoint,
  /** INT(1) NOT NULL DEFAULT '0' COMMENT '是否系统产品： 0 正常 1 系统产品' */
  isSys,
  /**INT(1) NULL DEFAULT '0' COMMENT '不定价 0 :定价, 1 : 不定价' */
  unPrice,
  /**INT(1) NULL DEFAULT '0' COMMENT '不定重 0，定重  1, 不定重' */
  unQuantity,
  /**INT(1) NULL DEFAULT '1' COMMENT '是否在前端显示 0 :否, 1 : 是' */
  isShowFront,
  /**INT(11) NOT NULL DEFAULT '0' COMMENT '管理库存 0 :否, 1 : 是' */
  isStock,
  /**INT(1) NOT NULL DEFAULT '0' COMMENT '删除标识 0 否, 1 是' */
  isDelete,
  /**VARCHAR(19) NULL DEFAULT NULL COMMENT '创建时间' */
  createdTime,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '创建者' */
  createdBy,
  /**VARCHAR(19) NULL DEFAULT NULL COMMENT '最后更新时间' */
  lastUpdateTime,
  /**VARCHAR(50) NULL DEFAULT NULL COMMENT '最后更新者' */
  lastUpdateBy,
  /** TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '系统更新时间' */
  sysUpdateTime,
  isFree,
}

export class ItemSpu implements IItemSpu {
  id;
  storeId;
  storeSysCode;
  itemName;
  itemCode;
  tradeType;
  storeCateId;
  specs;
  hasAddition;
  favoriteId;
  favoriteLineNo;
  isAdditionDiscount;
  isSamePrice;
  pyCode;
  unitName;
  minCount;
  internalCode;
  cateId;
  cateName;
  itemType;
  useType;
  deductType;
  deductValue;
  status;
  measureFlag;
  lineNo;
  isLabelPrint;
  elecPLU;
  isDiscount;
  isPoint;
  isSys;
  unPrice;
  unQuantity;
  isShowFront;
  isStock;
  isDelete;
  createdTime;
  createdBy;
  lastUpdateTime;
  lastUpdateBy;
  sysUpdateTime;
  isFree;

 
}