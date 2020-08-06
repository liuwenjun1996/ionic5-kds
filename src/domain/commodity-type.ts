import {IBaseEntity} from "./iBaseEntity";

export interface ICommodityType extends IBaseEntity {
  id: string
  name: string
  sequence: number
  productNum: number
  sellerId: string
  status: string
  isKitchenPrint: string
  kprinterId: string
  kprinterName: string
  parentId: number
  levelNo: number
  lastUpdateTime: number
}

export class CommodityType implements ICommodityType {
  id: string;
  name: string;
  sequence: number;
  productNum: number;
  sellerId: string;
  status: string;
  isKitchenPrint: string;
  kprinterId: string;
  kprinterName: string;
  parentId: number;
  levelNo: number;
  lastUpdateTime: number;

  static tableName: string = 'tb_commodity_type';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_commodity_type] (' +
    '[id] VARCHAR2(32) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[name] VARCHAR2(50), ' +
    '[sequence] INTEGER, ' +
    '[productNum] INTEGER, ' +
    '[sellerId] VARCHAR2(32), ' +
    '[status] VARCHAR2(32), ' +
    '[isKitchenPrint] VARCHAR2(2), ' +
    '[kprinterId] VARCHAR2(32), ' +
    '[kprinterName] VARCHAR2(32), ' +
    '[parentId] INTEGER, ' +
    '[levelNo] INTEGER, ' +
    '[lastUpdateTime] INTEGER' +
    ')';

  /**
   * 新增字段 最新的字段放在index = 0的位置提高效率
   * @type {{name: string; alter: string}[]}
   */
  static newColumns = [
    {name: 'isKitchenPrint', alter: 'ALTER TABLE tb_commodity_type ADD COLUMN isKitchenPrint VARCHAR2(2)'},
    {name: 'kprinterId', alter: 'ALTER TABLE tb_commodity_type ADD COLUMN kprinterId VARCHAR2(32)'},
    {name: 'kprinterName', alter: 'ALTER TABLE tb_commodity_type ADD COLUMN kprinterName VARCHAR2(32)'},
  ];

  static toJson() {
    return {
      id: null,
      name: null,
      sequence: null,
      productNum: null,
      sellerId: null,
      status: null,
      parentId: null,
      levelNo: null,
      lastUpdateTime: null,
      isKitchenPrint: null,
      kprinterId: null,
      kprinterName: null,
    }
  }
}
