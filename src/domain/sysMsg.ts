import {IBaseEntity} from "./iBaseEntity";

export const MSG_KEY_ORDER:string = "ORDER";
export const MSG_KEY_SMS:string = "SMS";
export const MSG_KEY_RECHARGE:string = "RECHARGE";
export const MSG_KEY_SYS:string = "SYS";
export const MSG_KEY_DEF:string = "DEF";
export const MSG_KEY_MEDIA:string = "MEDIA";
export const MSG_KEY_HO:string = "HO";
export const MSG_KEY_TU:string = "TU";
export const MSG_KEY_TP:string = "TP";
export const MSG_KEY_VIBRATION:string = "VIBRATION";

export interface ISysMsg extends IBaseEntity {
  id: string;
  storeId: String;
  bizType: string;
  pushTime: number;
  title: string;
  content: string;
  subcontent: string;
  transTime: string;
  transNo: string;
  transAmt: number;
  transImg: string;
}

export class SysMsg implements ISysMsg {
  id: string;
  storeId: String;
  bizType: string;
  pushTime: number;
  title: string = "没有更多消息";
  content: string;
  subcontent: string;
  transTime: string;
  transNo: string;
  transAmt: number;
  transImg: string;

  static tableName: string = 'tb_sysmsg';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_sysmsg] (' +
    '[id] VARCHAR2(32) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[storeId] VARCHAR2(32), ' +
    '[transNo] VARCHAR2(32), ' +    
    '[transTime] VARCHAR2(12), ' +
    '[bizType] VARCHAR2(10), ' +
    '[transAmt] number, ' +
    '[pushTime] number,' +
    '[title] VARCHAR2(30), ' +
    '[content] VARCHAR2(100), ' +    
    '[subcontent] VARCHAR2(100), '  +   
    '[transImg] VARCHAR2(100) '  +   
    ')';

  /**
   * 新增索引
   * @type {{name: string; alter: string}[]}
   */
  static newIndexes = [
    'CREATE INDEX IF NOT EXISTS USER_PUSHTIME_INDEX  ON tb_sysmsg (pushTime DESC);',
    'CREATE INDEX IF NOT EXISTS USER_STOREID_INDEX  ON tb_sysmsg (storeId DESC);'
  ];

   /**
   * 新增字段 最新的字段放在index = 0的位置提高效率
   * @type {{name: string; alter: string}[]}
   */
  static newColumns = [
    {name: 'transImg', alter: 'ALTER TABLE tb_sysmsg ADD COLUMN transImg VARCHAR2(100)'}
  ];

  static toJson() {
    return {
      id: null,  
      storeId: null,
      transNo: null,
      bizType: null,
      transAmt: null,
      transTime: null,
      transImg: null,
      pushTime: null,
      title: null,
      content: null,
      subcontent: null 
    }
  }
}
