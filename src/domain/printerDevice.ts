import {IBaseEntity} from "./iBaseEntity";

export interface IPrinterDevice extends IBaseEntity {
  id: string
  name: string
  address: string 
  printerType: string //厨房打印机 小票打印机
  printerTypeDesc: string
  linkType: string  //蓝牙 or wifi
  linkTypeDesc: string
  printerModel: string //分单 合并
  printerModelDesc: string
  sellerId: string
  createTime: number
  normsType: string
  left:number
  size:number//打印机规格
}

export class PrinterDevice implements IPrinterDevice {
  id: string;
  name: string;
  address: string;
  printerType: string;
  printerTypeDesc: string;
  linkType: string;
  linkTypeDesc: string;
  printerModel: string;
  printerModelDesc: string;
  sellerId: string;
  createTime: number;
  normsType: string
  left:number;
  size:number;
  static tableName: string = 'tb_kds_printer_device';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_kds_printer_device] (' +
    '[id] VARCHAR2(32) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[name] VARCHAR2(20), ' +
    '[address] VARCHAR2(20), ' +
    '[printerType] VARCHAR2(2), ' +
    '[printerTypeDesc] VARCHAR2(20), ' +
    '[linkType] VARCHAR2(2), ' +
    '[linkTypeDesc] VARCHAR2(20), ' +
    '[printerModel] VARCHAR2(2), ' +
    '[printerModelDesc] VARCHAR2(20), ' +
    '[normsType] VARCHAR2(2), ' +
    '[left] INTEGER, ' +
    '[createTime] TIMESTAMP, ' +
    '[sellerId] VARCHAR2(32), ' +
    '[size] INTEGER ' +   //打印机规格，1：58mm 2:80mm
    ')';

  /**
   * 新增字段 最新的字段放在index = 0的位置提高效率
   * @type {{name: string; alter: string}[]}
   */
  static newColumns = [
    {name: 'createTime', alter: 'ALTER TABLE tb_kds_printer_device ADD COLUMN createTime TIMESTAMP'},
    {name: 'normsType', alter: 'ALTER TABLE tb_kds_printer_device ADD COLUMN normsType VARCHAR2(2)'},
    {name: 'left', alter: 'ALTER TABLE tb_kds_printer_device ADD COLUMN left INTEGER'},
    {name: 'size', alter: 'ALTER TABLE tb_kds_printer_device ADD COLUMN size INTEGER'}
  ];

  static toJson() {
    return {
      id: null,
      name: null,
      address: null,
      printerType: null,
      printerTypeDesc: null,
      linkType: null,
      linkTypeDesc: null,
      printerModel: null,
      printerModelDesc: null,
      sellerId: null,
      createTime: null,
      normsType:"1",
      left:0,
      size:1,
    }
  }
}
