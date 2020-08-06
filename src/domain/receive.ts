import {IBaseEntity} from "./iBaseEntity";

export interface IReceive extends IBaseEntity{
  id: string
  receive: string
  sellerId: string
}

export class Receive implements IReceive {
  id: string;
  receive: string;
  sellerId: string;

  static tableName: string = 'tb_receive';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_receive] (' +
    '[id] INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, ' +
    '[receive] VARCHAR2(10), ' +
    '[sellerId] VARCHAR2(32) ' +
    ')';

  static toJson() {
    return {
      id: null,
      receive: null,
      sellerId: null
    }
  }
}
