import { IBaseEntity } from "./iBaseEntity";

export interface IUser extends IBaseEntity {
  id: string;
  username: string;
  password: string;
  ip: string;
  lastMasageTime: number;//获取到最后一条信息的时间戳
  loginTime: number;
}

export class User implements IUser {
  id: string;
  username: string;
  password: string;
  ip: string;
  lastMasageTime: number;
  loginTime: number;
  static newColumns = [
    // { name: 'lastMasageTime', alter: 'ALTER TABLE tb_kds_user ADD COLUMN lastMasageTime NUMBER' }
  ];
  static tableName: string = 'tb_kds_user';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_kds_user] (' +
    '[id] VARCHAR2(50) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[username] VARCHAR2(50),' +
    '[password] VARCHAR2(50), ' +
    '[ip] VARCHAR2(50), ' +
    '[lastMasageTime] NUMBER, ' +
    '[loginTime] NUMBER ' +
    ')';

  static toJson() {
    return {
      id: null,
      username: null,
      password: null,
      ip: null,
      lastMasageTime: null,
      loginTime: null,
    }
  }
}
