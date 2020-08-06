import { IBaseEntity } from "./iBaseEntity";

export interface ILog extends IBaseEntity {
  id: string;
  versions: string;
  value: string;
  storeId: string;
  salesId: string;
  salesTableId: string;
  operationStaff: string;
  operationType: string;
  logTime: string;
  isShow: boolean;
}

export class Log implements ILog {
  id: string;
  versions: string;
  beforeData: string;
  nowData: string;
  value: string;
  storeId: string;
  salesId: string;
  salesTableId: string;
  operationStaff: string;
  operationType: string;
  logTime: string;
  isShow: boolean;

  static tableName: string = 'tb_log';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_log] (' +
    '[id] VARCHAR2(50) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[versions] VARCHAR2(50),' +
    '[storeId] VARCHAR2(50),' +
    '[salesId] VARCHAR2(50),' +
    '[salesTableId] VARCHAR2(50),' +
    '[operationStaff] VARCHAR2(50),' +
    '[operationType] VARCHAR2(50),' +
    '[value] VARCHAR2,' +
    '[beforeData] VARCHAR2,' +
    '[nowData] VARCHAR2,' +
    '[logTime] VARCHAR2 , ' +
    '[isShow]  BOOLEAN' +
    ')';

  static toJson() {
    return {
      id: null,
      versions: null,
      beforeData: null,
      nowData: null,
      value: null,
      storeId: null,
      salesId: null,
      salesTableId: null,
      operationStaff: null,
      operationType: null,
      logTime: null,
      isShow: null,
    }
  }
}
