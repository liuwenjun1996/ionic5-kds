import {IBaseEntity} from "./iBaseEntity";

export interface ISeller extends IBaseEntity {
  id: string;  
  mobile: string;
  username: string;
  password: string;
  storeName: string;
  logoPath: string;
  lastMsg: string;
  lastMsgTime: number;
  msgNum: number;
  secMsg: string;
  secMsgTime: number;

  // wxTradeId: string
  // logo: string
  // wxStatus: string
  // wxQrCode: string
  // image1: string
  // image2: string
  // image3: string
  // notice: string
  // perCapita: string
  // location: string
  // address: string
  // phone: string
  // businessHoursStart0: string
  // businessHoursEnd0: string
  // businessHoursStart1: string;
  // businessHoursEnd1: string;
  // businessHoursStart2: string;
  // businessHoursEnd2: string;
  // serviceRange: string;
  // lowOrderAmount: string;
  // sendAmount: string;
  // freeAmount: string;
  // accountType: string;
  // depositBankName: string;
  // cardNo: string;
  // accountName: string;
  // bankMobile: string;
  // idNumber: string;
  // wxApplyStatus: string;
  // expirationDate: number;
  // applyProxyId: string;
  // applyCircleId: string;
  // type: string;
  // isSendOut: string;
}

export class Seller implements ISeller {
  id: string;  
  mobile: string;
  username: string;
  password: string;
  storeName: string;
  logoPath: string;
  lastMsg: string;
  lastMsgTime: number;
  msgNum: number;
  secMsg: string;
  secMsgTime: number;

  // wxTradeId: string;
  // logo: string;
  // wxStatus: string;
  // wxQrCode: string;
  // image1: string;
  // image2: string;
  // image3: string;
  // notice: string;
  // perCapita: string;
  // location: string;
  // address: string;
  // phone: string;
  // businessHoursStart0: string;
  // businessHoursEnd0: string;
  // businessHoursStart1: string;
  // businessHoursEnd1: string;
  // businessHoursStart2: string;
  // businessHoursEnd2: string;
  // serviceRange: string;
  // lowOrderAmount: string;
  // sendAmount: string;
  // freeAmount: string;
  // accountType: string;
  // depositBankName: string;
  // cardNo: string;
  // accountName: string;
  // bankMobile: string;
  // idNumber: string;
  // wxApplyStatus: string;
  // expirationDate: number;
  // applyProxyId: string;
  // applyCircleId: string;
  // applyProxyName: string;
  // applyCircleName: string;
  // applyTime: number; 
  // type: string;
  // isSendOut: string;

  static tableName: string = 'tb_seller';
  static create: string = 'CREATE TABLE IF NOT EXISTS [tb_seller] (' +
    '[id] VARCHAR2(32) PRIMARY KEY UNIQUE NOT NULL, ' +
    '[mobile] VARCHAR2(16), ' +
    '[username] VARCHAR2(50),' +
    '[password] VARCHAR2(50), ' +
    '[storeName] VARCHAR2(50), ' +
    '[logoPath] VARCHAR2(50), ' + 
    '[lastMsg] VARCHAR2(100), ' + 
    '[lastMsgTime] NUMBER, ' + 
    '[secMsg] VARCHAR2(100), ' + 
    '[secMsgTime] NUMBER, ' + 
    '[msgNum] NUMBER ' + 


    // '[wxTradeId] VARCHAR2(32), ' +
    // '[logo] VARCHAR2(100), ' +
    // '[wxStatus] VARCHAR2(2), ' +
    // '[type] VARCHAR2(2), ' +
    // '[wxQrCode] VARCHAR2(200), ' +
    // '[image1] VARCHAR2(100), ' +
    // '[image2] VARCHAR2(100), ' +
    // '[image3] VARCHAR2(100), ' +
    // '[notice] VARCHAR2(1000), ' +
    // '[perCapita] VARCHAR2(50), ' +
    // '[location] VARCHAR2(500), ' +
    // '[address] VARCHAR2(500), ' +
    // '[phone] VARCHAR2(30), ' +
    // '[accountType] VARCHAR2(30), ' +
    // '[depositBankName] VARCHAR2(30), ' +
    // '[expirationDate] NUMBER, ' +
    // '[cardNo] VARCHAR2(30), ' +
    // '[accountName] VARCHAR2(30), ' +
    // '[bankMobile] VARCHAR2(30), ' +
    // '[idNumber] VARCHAR2(30), ' +
    // '[applyProxyId] VARCHAR2(32), ' +
    // '[applyCircleId] VARCHAR2(32), ' +
    // '[businessHoursStart0] VARCHAR2(20), ' +
    // '[businessHoursEnd0] VARCHAR2(20), ' +
    // '[businessHoursStart1] VARCHAR2(20), ' +
    // '[businessHoursEnd1] VARCHAR2(20), ' +
    // '[businessHoursStart2] VARCHAR2(20), ' +
    // '[businessHoursEnd2] VARCHAR2(20), ' +
    // '[isSendOut] VARCHAR2(2), ' +
    // '[wxApplyStatus] VARCHAR2(1), ' +
    // '[serviceRange] VARCHAR2(32), ' +
    // '[applyProxyName] VARCHAR2(32), ' +
    // '[applyCircleName] VARCHAR2(32), ' +
    // '[applyTime] NUMBER, ' +
    // '[lowOrderAmount] NUMERIC(12,2), ' +
    // '[sendAmount] NUMERIC(12,2), ' +
    // '[freeAmount] NUMERIC(12,2) ' +
    ')';

  /**
   * 新增字段 最新的字段放在index = 0的位置提高效率
   * @type {{name: string; alter: string}[]}
   */
  // static newColumns = [
  //   {name: 'isSendOut', alter: 'ALTER TABLE tb_seller ADD COLUMN isSendOut VARCHAR2(2)'}
  // ];

  static toJson() {
    return {
      id: null,
      mobile: null,
      username: null,
      password: null,
      storeName: null,
      logoPath: null,  
      lastMsg: null,
      lastMsgTime: null,
      msgNum: null,
      secMsg: null,
      secMsgTime: null,

      // wxTradeId: null,
      // logo: null,
      // wxStatus: null,
      // wxQrCode: null,
      // image1: null,
      // image2: null,
      // image3: null,
      // notice: null,
      // perCapita: null,
      // location: null,
      // address: null,
      // phone: null,
      // businessHoursStart0: null,
      // businessHoursEnd0: null,
      // businessHoursStart1: null,
      // businessHoursEnd1: null,
      // businessHoursStart2: null,
      // businessHoursEnd2: null,
      // serviceRange: null,
      // lowOrderAmount: null,
      // sendAmount: null,
      // freeAmount: null,
      // accountType: null,
      // depositBankName: null,
      // cardNo: null,
      // accountName: null,
      // bankMobile: null,
      // idNumber: null,
      // expirationDate: null,
      // wxApplyStatus: null,
      // applyProxyId: null,
      // applyCircleId: null,
      // applyProxyName: null,
      // applyCircleName: null,
      // applyTime: null,
      // type: null,
      // isSendOut: null,
    }
  }
}
