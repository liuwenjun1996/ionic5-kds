import {IBaseEntity} from "./iBaseEntity";

export interface IEmail extends IBaseEntity{
  id: string
  email: string
  sellerId: string
}

export class Email implements IEmail {
  id: string;
  email: string;
  sellerId: string;

  static tableName: string = 'tb_email';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_email] (' +
    '[id] INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, ' +
    '[email] VARCHAR2(50), ' +
    '[sellerId] VARCHAR2(32) ' +
    ')';

  static toJson() {
    return {
      id: null,
      email: null,
      sellerId: null
    }
  }
}
