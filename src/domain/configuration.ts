import { IBaseEntity } from "./iBaseEntity";

export interface IConfiguration extends IBaseEntity {
  id: string;
  value: string;
  storeId: string;
  salesId: string;
}

export class Configuration implements IConfiguration {
  id: string;
  value: string;
  storeId: string;
  salesId: string;

  static tableName: string = 'tb_kds_configuration';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_kds_configuration] (' +
    '[id] VARCHAR2(50) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[storeId] VARCHAR2(50),' +
    '[salesId] VARCHAR2(50),' +
    '[value] VARCHAR2' +
    ')';

  static toJson() {
    return {
      id: null,
      value: null,
      storeId: null,
      salesId: null,
    }
  }
}