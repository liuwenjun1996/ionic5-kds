import { IBaseEntity } from "./iBaseEntity";
// salesDetail
export interface ISalesDetail extends IBaseEntity {
  // id: string;
  // versions: string;
  // logTime: number;
  // isShow: boolean;

  id: string;
  salesId: string; // '销售id',
  salesNo: string;// '销售编号',
  lineNo: number;  // '序号',
  salesDate: string;// '销售日期 yyyy-MM-dd',
  parentId: string;// '所属销售明细ID',
  groupId: string; // '组合商品分组ID',
  parentSpuId: string; // '所属父商品SPUID',
  parentSpuName: string; // '所属父商品名称',
  spuId: string; // '商品spuId',
  spuType: string; // 'N:normall普通商品, G: Group组合商品,套餐, S:Service服务',
  spuCode: string; // '商品主编号',
  itemId: string; //'商品id',
  itemCode: string; // '商品编号',
  itemType: string; // 'N:normall普通商品, G: Group组合商品,套餐, S:Service服务, A: 配菜',
  itemName: string; // '商品名称',
  itemAttr: string; // '商品属性',
  status: number; // '销售单状态:  0：下单，1：完成，2：作废',
  itemStatus: number; // '商品状态：0-正常 1-加菜 2-退菜',
  specs1: string; // '规格1',
  specs2: string; // '规格2',
  specs3: string; // '规格3',
  specs4: string; // '规格4',
  specs5: string; // '规格5',
  measureFlag: string; // 'P:普通, Z 计重, S 计数',
  retailPrice: number; //  '零售价',
  vipPrice: number; //  '会员价',
  salesPrice: number; //  '销售价',
  salesQty: number; //  '销售数量',
  salesAmt: number; //  '销售金额',
  ttlDiscAmt: number; //  '总折扣',
  deductType: string; //'提成方式 N:No不提成, R:Rate百分比,M: Money金额 ',
  deductValue: number; //  '提成参数',
  salespersonId: string; // '导购员id',
  salespersonCode: string; //  '导购员编号',
  salespersonName: string; // '导购员名称',
  cateId: string; // '商品分类ID',
  cateCode: string; // '商品分类编码',
  cateName: string; // '商品分类名称',
  brandId: string; // '品牌ID',
  brandCode: string; // '品牌编码',
  brandName: string; // '品牌名称',
  vendorId: string; // '供应商ID',
  vendorCode: string; // '供应商编码',
  vendorName: string; // '供应商名称',
  costPrice: number; //  '成本价',
  unitName: string; //  '单位',
  isDelete: number; // '是否删除 0 否，1 是',
  returnSalesId: string; // '退货单销售单id',
  returnSalesNo: string; //  '退货单销售单编号',
  returnSalesItemId: string; // '退货单明细id',
  createdTime: string; // '创建时间',
  createdBy: string; // '创建者',
  lastUpdateTime: string; //  '最后修改时间',
  lastUpdateBy: string; // '最后修改人',
  sysUpdateTime: string; // '系统更新时间',
  storeId: string; // '店铺ID',
  storeSysCode: string; // '店铺系统编号',
  salesYear: string; // '销售年 yyyy',
  salesMonth: string; // '销售月 yyyy-MM',
  salesTime: string; // '销售时间',
  salesType: string; //'单据类型 S-销售 O-外带 T-外卖',
  orderType: string; // 'N:normal: 正常单据, V: void取消单据, R;return退货单',
  isLabelPrint: string; // '是否标签打印  0：否，1：是（默认0）',
  storeName: string; // '店铺名称',
  pyCode: string; // '拼音码',
  handoverId: string; // '交接班ID',
  originIp: string; // '下单用户IP',
  channel: string; //'订单来源: EL 饿了么 MT 美团 AB 爱宝 SL 自助 CS 收银员  WX 微信',
  minCount: number;//起售
  attrGroupName: string;//配料组名
  isFree: string;
  itemDiscSalesPrice: number;// decimal(18,4) DEFAULT '0.0000' COMMENT '单价（单品优惠价）',
  itemDiscSalesAmt: number;// decimal(18,4) DEFAULT '0.0000' COMMENT '单价合计',
  itemDiscAmt: number;//  decimal(18,4) DEFAULT '0.0000' COMMENT '单品优惠合计',
  itemWholeDiscAmt: number;// decimal(18,4) DEFAULT '0.0000' COMMENT '整单优惠合计',

}
/**
* 加入购物车的数据结构
*/
export class SalesDetail implements ISalesDetail {
  /**
  * '加入购物车生成id',
  */
  id: string;
  /**
  * '销售id',
  */
  salesId: string;
  /**'原销售id',*/
  originSalesId;
  /** '商品关联关系: M:main 主商品,  G: 套餐明细,  A: 加料明细' AFTER `spuId`
   */
  relatedType;
  /**
* '销售编号',
*/
  salesNo: string;
  /**
* '序号'
*/
  lineNo: number;
  /**
* '销售日期 yyyy-MM-dd',
*/
  salesDate: string;
  /**
* 所属销售明细ID
*/
  parentId: string;
  /**
* 组合商品分组ID
*/
  groupId: string;
  /**
* 所属父商品SPUID
*/
  parentSpuId: string;
  /**
* 所属父商品名称
*/
  parentSpuName: string;
  /**
* 商品spuId
*/
  spuId: string;
  /**
* N:normall普通商品, G: Group组合商品,套餐, S:Service服务
*/
  spuType: string;
  /**
* 商品主编号
*/
  spuCode: string;
  /**
* '商品id',
*/
  itemId: string;
  /**
* 商品编号
*/
  itemCode: string;
  /**
* N:normall普通商品, G: Group组合商品,套餐, S:Service服务, A: 配菜
*/
  itemType: string;
  /**
* 商品名称
*/
  itemName: string;
  /**
* 商品属性
*/
  itemAttr: string;
  /**
* 销售单状态:  0：下单，1：完成，2：作废
*/
  status: number;
  /**
* 商品状态：0-正常 1-加菜 2-退菜
*/
  itemStatus: number;
  /**
* 规格1
*/
  specs1: string;
  /**
* 规格2
*/
  specs2: string;
  /**
* 规格3
*/
  specs3: string;
  /**
* 规格4
*/
  specs4: string;
  /**
* 规格5
*/
  specs5: string;
  /**
* P:普通, Z 计重, S 计数
*/
  measureFlag: string;
  /**
* 零售价
*/
  retailPrice: number;
  /**
* 会员价
*/
  vipPrice: number;

  /**
* 原销售价
*/
  orgSalesPrice: number;
  /**
* 销售价
*/
  salesPrice: number;
  /**
* 销售数量
*/
  salesQty: number;
  /**
* 销售金额
*/
  salesAmt: number;
  /**
* 总折扣
*/
  ttlDiscAmt: number;
  /**
* 提成方式 N:No不提成, R:Rate百分比,M: Money金额
*/
  deductType: string;
  /**
* 提成参数
*/
  deductValue: number;
  /**
* 导购员id
*/
  salespersonId: string;
  /**
* 导购员编号
*/
  salespersonCode: string;
  /**
* 导购员名称
*/
  salespersonName: string;
  /**
* 商品分类ID
*/
  cateId: string;
  /**
* 商品分类编码
*/
  cateCode: string;
  /**
* 商品分类名称
*/
  cateName: string;
  /**
* 品牌ID
*/
  brandId: string;
  /**
* 品牌编码
*/
  brandCode: string;
  /**
* 品牌名称
*/
  brandName: string;
  /**
* 供应商ID
*/
  vendorId: string;
  /**
* 供应商编码
*/
  vendorCode: string;
  /**
* 供应商名称
*/
  vendorName: string;
  /**
* 成本价
*/
  costPrice: number;
  /**
* 单位
*/
  unitName: string;
  /**
* 是否删除 0 否，1 是
*/
  isDelete: number;
  /**
* 退货单销售单id
*/
  returnSalesId: string;
  /**
* 退货单销售单编号
*/
  returnSalesNo: string;
  /**
* 退货单明细id
*/
  returnSalesItemId: string;
  /**
* 创建时间
*/
  createdTime: string;
  /**
* 创建者
*/
  createdBy: string;
  /**
* 最后修改时间
*/
  lastUpdateTime: string;
  /**
* 最后修改人
*/
  lastUpdateBy: string;
  /**
* 系统更新时间
*/
  sysUpdateTime: string;
  /**
* 店铺ID
*/
  storeId: string;
  /**
* 店铺系统编号
*/
  storeSysCode: string;
  /**
* 销售年 yyyy'
*/
  salesYear: string;
  /**
* 销售月 yyyy-MM
*/
  salesMonth: string;
  /**
* 销售时间
*/
  salesTime: string;
  /**
* 单据类型 S-销售 O-外带 T-外卖
*/
  salesType: string;
  /**
* N:normal: 正常单据, V: void取消单据, R;return退货单
*/
  orderType: string;
  /**
* 是否标签打印  0：否，1：是（默认0）
*/
  isLabelPrint: string;
  /**
* 店铺名称
*/
  storeName: string;
  /**
* 拼音码
*/
  pyCode: string;
  /**
* 交接班ID
*/
  handoverId: string;
  /**
* 下单用户IP
*/
  originIp: string;
  /**
* 订单来源: EL 饿了么 MT 美团 AB 爱宝 SL 自助 CS 收银员  WX 微信 MB 点菜宝 AM 安卓手机 AR  安卓PC版
*/
  channel: string;
  /**前端排序 */
  orderLevel: number = 0;
  /** 叫起 等叫  Y为等叫，N为叫起*/
  isWaitingDish: string;
  /**起售数量 */
  minCount: number;
  attrGroupName;
  spuName;
  isFree;

  isStock: any; // 商品管库存
  isPoint: any; // 商品是否积分
  /**商品积分值 */
  pointValue: any;//
  /**decimal(18,4) DEFAULT '0.0000' COMMENT '单价（单品优惠价） */
  itemDiscSalesPrice: number;
  /**decimal(18,4) DEFAULT '0.0000' COMMENT '单价合计', */
  itemDiscSalesAmt: number;
  /**decimal(18,4) DEFAULT '0.0000' COMMENT '单品优惠合计', */
  itemDiscAmt: number;
  /**decimal(18,4) DEFAULT '0.0000' COMMENT '整单优惠合计' */
  itemWholeDiscAmt: number;

  static tableName: string = 'tb_salesDetail';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_salesDetail] (' +
    '[id] VARCHAR2(50) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[salesId] VARCHAR2(50),' +
    '[originSalesId] VARCHAR2(50),' +
    '[relatedType] VARCHAR2(2),' +
    '[salesNo] VARCHAR2(30),' +
    '[lineNo] NUMBER , ' +
    '[salesDate] VARCHAR2(10),' +
    '[parentId] VARCHAR2(50),' +
    '[groupId] VARCHAR2(50),' +
    '[parentSpuId] VARCHAR2(50),' +
    '[parentSpuName] VARCHAR2(100),' +
    '[spuId] VARCHAR2(50),' +
    '[spuType] VARCHAR2(2),' +
    '[spuCode] VARCHAR2(100),' +
    '[itemId] VARCHAR2(50),' +
    '[itemCode] VARCHAR2(100),' +
    '[itemType] VARCHAR2(2),' +
    '[itemName] VARCHAR2(100),' +
    '[spuName] VARCHAR2(100),' +
    '[itemAttr] VARCHAR2(500),' +
    '[status] NUMBER , ' +
    '[itemStatus] NUMBER , ' +
    '[specs1] VARCHAR2(50),' +
    '[specs2] VARCHAR2(50),' +
    '[specs3] VARCHAR2(50),' +
    '[specs4] VARCHAR2(50),' +
    '[specs5] VARCHAR2(50),' +
    '[measureFlag] VARCHAR2(1),' +
    '[retailPrice] NUMBER , ' +
    '[vipPrice] NUMBER , ' +
    '[salesPrice] NUMBER , ' +
    '[salesQty] NUMBER , ' +
    '[salesAmt] NUMBER , ' +
    '[ttlDiscAmt] NUMBER , ' +
    '[deductType] VARCHAR2(1),' +
    '[deductValue]  NUMBER , ' +
    '[salespersonId] VARCHAR2(50),' +
    '[salespersonCode] VARCHAR2(30),' +
    '[salespersonName] VARCHAR2(50),' +
    '[cateId] VARCHAR2(50),' +
    '[cateCode] VARCHAR2(50),' +
    '[cateName] VARCHAR2(50),' +
    '[brandId] VARCHAR2(50),' +
    '[brandCode] VARCHAR2(50),' +
    '[brandName] VARCHAR2(50),' +
    '[vendorId] VARCHAR2(50),' +
    '[vendorCode] VARCHAR2(50),' +
    '[vendorName] VARCHAR2(50),' +
    '[costPrice] NUMBER , ' +
    '[unitName] VARCHAR2(30),' +
    '[isDelete] NUMBER , ' +
    '[returnSalesId] VARCHAR2(50),' +
    '[returnSalesNo] VARCHAR2(30),' +
    '[returnSalesItemId] VARCHAR2(50),' +
    '[createdTime] VARCHAR2(19),' +
    '[createdBy] VARCHAR2(50),' +
    '[lastUpdateTime] VARCHAR2(19),' +
    '[lastUpdateBy] VARCHAR2(50),' +
    '[sysUpdateTime] VARCHAR2(50),' +
    '[storeId] VARCHAR2(50),' +
    '[storeSysCode] VARCHAR2(15),' +
    '[salesYear] VARCHAR2(4),' +
    '[salesMonth] VARCHAR2(7),' +
    '[salesTime] VARCHAR2(19),' +
    '[salesType] VARCHAR2(1),' +
    '[orderType] VARCHAR2(1),' +
    '[isLabelPrint] VARCHAR2(1),' +
    '[storeName] VARCHAR2(100),' +
    '[pyCode] VARCHAR2(100),' +
    '[handoverId] VARCHAR2(50),' +
    '[originIp] VARCHAR2(50),' +
    '[attrGroupName] VARCHAR2(50),' +
    '[orderLevel] NUMBER , ' +
    '[pointValue] NUMBER , ' +
    '[isWaitingDish] VARCHAR2(2),' +
    '[minCount] NUMBER , ' +
    '[channel]  VARCHAR2(2)' +
    '[isStock] int(1)' +
    '[isPoint] int(1)' +
    ')';
  soldoutNum: any;
  soldoutStatus: string;

  static toJson() {
    return {
      id: null,
      salesId: null,
      originSalesId: null,
      relatedType: null,
      salesNo: null,
      lineNo: null,
      salesDate: null,
      parentId: null,
      groupId: null,
      parentSpuId: null,
      parentSpuName: null,
      spuId: null,
      spuType: null,
      spuCode: null,
      itemId: null,
      itemCode: null,
      itemType: null,
      itemName: null,
      spuName: null,
      itemAttr: null,
      status: null,
      itemStatus: null,
      specs1: null,
      specs2: null,
      specs3: null,
      specs4: null,
      specs5: null,
      measureFlag: null,
      retailPrice: null,
      vipPrice: null,
      salesPrice: null,
      salesQty: null,
      salesAmt: null,
      ttlDiscAmt: null,
      deductType: null,
      deductValue: null,
      salespersonId: null,
      salespersonCode: null,
      salespersonName: null,
      cateId: null,
      cateCode: null,
      cateName: null,
      brandId: null,
      brandCode: null,
      brandName: null,
      vendorId: null,
      vendorCode: null,
      vendorName: null,
      costPrice: null,
      unitName: null,
      isDelete: null,
      returnSalesId: null,
      returnSalesNo: null,
      returnSalesItemId: null,
      createdTime: null,
      createdBy: null,
      lastUpdateTime: null,
      lastUpdateBy: null,
      sysUpdateTime: null,
      storeId: null,
      storeSysCode: null,
      salesYear: null,
      salesMonth: null,
      salesTime: null,
      salesType: null,
      orderType: null,
      isLabelPrint: null,
      storeName: null,
      pyCode: null,
      handoverId: null,
      originIp: null,
      orderLevel: null,
      minCount: null,
      attrGroupName: null,
      channel: null,
      pointValue: null,
      isFree: null,
    }
  }
}
