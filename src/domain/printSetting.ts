import {IBaseEntity} from "./iBaseEntity";

export interface IPrintSetting extends IBaseEntity{
  id: number
  printType: string
  printTypeDesc: string
  kitchenPrint: string
  receiptPrint: string
  receiptPrint_kaitai: string
  tablePrint: string  //台单 无用字段
  tagPrint: string
  sellerId: string
  receiptPrintNum:number
  receiptPrintkaitaiNum:number
  kitchenPrintNum:number
  tagPrintNum:number
}

export class PrintSetting implements IPrintSetting {
  id: number;
  printType: string;
  printTypeDesc: string;
  kitchenPrint: string;
  receiptPrint: string;
  receiptPrint_kaitai: string;
  tablePrint: string;
  sellerId: string;
  receiptPrintNum:number;
  receiptPrintkaitaiNum:number;
  kitchenPrintNum:number;
  tagPrint: string
  tagPrintNum:number
  static tableName: string = 'tb_kds_print_setting';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_kds_print_setting] (' +
    '[id] INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, ' +
    '[printType] VARCHAR2(2), ' +
    '[printTypeDesc] VARCHAR2(20), ' +
    '[kitchenPrint] VARCHAR2(2), ' +
    '[kitchenPrintNum] INTEGER, ' +
    '[receiptPrint] VARCHAR2(2), ' +
    '[receiptPrintNum] INTEGER, ' +
    '[receiptPrint_kaitai] VARCHAR2(2), ' +
    '[receiptPrintkaitaiNum] INTEGER, ' +
    '[tagPrint] VARCHAR2(2), ' +
    '[tagPrintNum] INTEGER, ' +
    '[tablePrint] VARCHAR2(2), ' +
    '[sellerId] VARCHAR2(32) ' +
    ')';

  /**
   * 新增字段 最新的字段放在index = 0的位置提高效率
   * @type {{name: string; alter: string}[]}
   */
  static newColumns = [
    {name: 'receiptPrint_kaitai', alter: 'ALTER TABLE tb_kds_print_setting ADD COLUMN receiptPrint_kaitai VARCHAR2(2)'},
    {name: 'receiptPrintkaitaiNum', alter: 'ALTER TABLE tb_kds_print_setting ADD COLUMN receiptPrintkaitaiNum INTEGER'},
    {name: 'tagPrint', alter: 'ALTER TABLE tb_kds_print_setting ADD COLUMN tagPrint VARCHAR2(2)'},
    {name: 'tagPrintNum', alter: 'ALTER TABLE tb_kds_print_setting ADD COLUMN tagPrintNum INTEGER'}
  ];

  static toJson() {
    return {
      id: null,
      printType: null,
      printTypeDesc: null,
      kitchenPrint: null,
      receiptPrint: null,
      receiptPrint_kaitai: null,
      tablePrint: null,
      sellerId: null,
      receiptPrintNum:1,
      receiptPrintkaitaiNum:1,
      kitchenPrintNum:1,
      tagPrint: null,
      tagPrintNum:1
    }
  }
}
