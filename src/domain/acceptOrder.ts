import {IBaseEntity} from "./iBaseEntity";

export interface IAcceptOrder extends IBaseEntity{
  id: string
  type: string
  typeDesc: string
  active: string
  sellerId: string
}

export class AcceptOrder implements IAcceptOrder {
  id: string;
  type: string;
  typeDesc: string;
  active: string;
  notify: string;
  sellerId: string;

  static tableName: string = 'tb_accept_order';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_accept_order] (' +
    '[id] INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, ' +
    '[type] VARCHAR2(16), ' +
    '[typeDesc] VARCHAR2(20), ' +
    '[active] VARCHAR2(20), '  +
    '[notify] VARCHAR2(20), '  +
    '[sellerId] VARCHAR2(32) '  +
    ')';

  static toJson() {
    return {
      id: null,
      type: null,
      typeDesc: null,
      active: null,
      notify: null,
      sellerId: null
    }
  }
}
