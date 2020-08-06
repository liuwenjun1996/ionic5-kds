import { InjectionToken } from "@angular/core";

/**
 * Created by Vince on 2017/7/18.
 */

export interface AppConfig {
	APPL_SERVICE?: string
	// APPL_2_SERVICE?: string
	PUSH_URL?: string//推送地址
	IMAGE_UPLOAD?: string
	IMAGE_DOWNLOAD?: string

	ORDER_SERVICE?: string
	PAY_SERVICE?: string
	WEIXIN_SERVICE?: string

	readonly UCENTER_SERVICE: string
	readonly IMAGE_BASEURL: string  //图片上传根目录

	readonly PRINTER_TYPE_SOCKET: string  //socket 打印机
	readonly PRINTER_TYPE_BLUETOOTH: string  //蓝牙打印机
	readonly PRINTER_CHECK_INTERVAL: number //打印机状态查询时间周期
	readonly PRINTER_MODEL_SPLIT: string  //分单
	readonly PRINTER_MODEL_MERGE: string  //合并
	readonly WAIMAICOUNT_INTERVAL: number //外卖订单查询时间周期
	readonly WAIMAICOUNT_PERIOD: number //外卖订单查询间隔
	readonly TABLECOUNT_INTERVAL: number //桌台订单查询时间周期
	readonly TABLECOUNT_PERIOD: number //桌台订单查询间隔
}

/** 开发环境 */
export const APP_SIT_CONFIG: AppConfig = {
	UCENTER_SERVICE: "http://192.168.1.234",
	IMAGE_BASEURL: '',  //图片上传根目录  

	PRINTER_TYPE_SOCKET: '0', //socket 打印机
	PRINTER_TYPE_BLUETOOTH: '1', //蓝牙打印机
	PRINTER_MODEL_SPLIT: '0', //分单
	PRINTER_MODEL_MERGE: '1', //合并
	PRINTER_CHECK_INTERVAL: 600000,//打印机状态查询时间周期
	WAIMAICOUNT_INTERVAL: 1000, //外卖订单查询时间周期
	WAIMAICOUNT_PERIOD: 30000,  //外卖订单查询间隔
	TABLECOUNT_INTERVAL: 1000,  //桌台订单查询时间周期
	TABLECOUNT_PERIOD: 30000, //桌台订单查询间隔
};

/** 准生产环境 */
export const APP_UAT_CONFIG: AppConfig = {
	//APPL_SERVICE:  'http://localhost:9999/',
	//IMAGE_DOWNLOAD: 'http://120.24.101.19:10006', 
	//IMAGE_UPLOAD: 'http://120.24.101.19:9595/image/upload',
	//PUSH_URL: 'ws://localhost:4995/aposWs',  


	UCENTER_SERVICE: "https://uatmsy.aibaocloud.com",
	IMAGE_BASEURL: '/miniImg',  //图片上传根目录
	PRINTER_TYPE_SOCKET: '0', //socket 打印机
	PRINTER_TYPE_BLUETOOTH: '1', //蓝牙打印机
	PRINTER_MODEL_SPLIT: '0', //分单
	PRINTER_MODEL_MERGE: '1', //合并
	PRINTER_CHECK_INTERVAL: 600000,//打印机状态查询时间周期
	WAIMAICOUNT_INTERVAL: 1000, //外卖订单查询时间周期
	WAIMAICOUNT_PERIOD: 30000,  //外卖订单查询间隔
	TABLECOUNT_INTERVAL: 1000,  //桌台订单查询时间周期
	TABLECOUNT_PERIOD: 30000, //桌台订单查询间隔
};

/** 生产环境 */
export const APP_PRD_CONFIG: AppConfig = {
	UCENTER_SERVICE: 'https://h.aibaocloud.com',
	IMAGE_BASEURL: '',  //图片上传根目录

	PRINTER_TYPE_SOCKET: '0', //socket 打印机
	PRINTER_TYPE_BLUETOOTH: '1', //蓝牙打印机
	PRINTER_MODEL_SPLIT: '0', //分单
	PRINTER_MODEL_MERGE: '1', //合并
	PRINTER_CHECK_INTERVAL: 600000,//打印机状态查询时间周期
	WAIMAICOUNT_INTERVAL: 1000, //外卖订单查询时间周期
	WAIMAICOUNT_PERIOD: 30000,  //外卖订单查询间隔
	TABLECOUNT_INTERVAL: 1000,  //桌台订单查询时间周期
	TABLECOUNT_PERIOD: 30000, //桌台订单查询间隔
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// 事件类型
export let EVENT_TYPE = {
	'LOGIN': 'LOGIN',
	'LOADCOMMODITY': 'LOADCOMMODITY',
	'LOADCOMMODITYTYPE': 'LOADCOMMODITYTYPE',
	'LOADPLACETYPE': 'LOADPLACETYPE',
	'LOADPLACE': 'LOADPLACE',
	'LOADSELLINFO': 'LOADSELLINFO',
	'GETSELLINFOBYID': 'GETSELLINFOBYID',
	'GETSELLINFOBYPLACEID': 'GETSELLINFOBYPLACEID',
	'OPENPLACE': 'OPENPLACE',
	'CLEARPLACE': 'CLEARPLACE',
	'ADDSELLDETAIL': 'ADDSELLDETAIL',
	'UPDATESELLDETAIL': 'UPDATESELLDETAIL',
	'PUSHUPDATESELLNOTICE': 'PUSHUPDATESELLNOTICE',
	'PUSHUPDATEPLACENOTICE': 'PUSHUPDATEPLACENOTICE',
	'CHANGEPLACE': 'CHANGEPLACE',
	'STOPPLACE': 'STOPPLACE',
	'MESSAGECENTER': 'MESSAGECENTER',
	'LOADMESSAGE': 'LOADMESSAGE',
	'CONSUMEMESSAGE': 'CONSUMEMESSAGE',
	'LOADREMARK': 'LOADREMARK',
	'VBOOKERCONNECT': 'VBOOKERCONNECT',
	'LOADORDER': 'LOADORDER',
	'DEALORDER': 'DEALORDER',
	'GETORDERBYID': 'GETORDERBYID',
	'REFRESHORDER': 'REFRESHORDER',
	'SUBMITSELLINFO': 'SUBMITSELLINFO',
	'GETTEAPRICE': 'GETTEAPRICE',
	'IPADRESS': 'IPADRESS',
	'GETSELLDETAILS': 'GETSELLDETAILS',
	'VBOOKERDISCONNECT': 'VBOOKERDISCONNECT',
	'ERROR': 'ERROR',
	'REFRESHMESSAGE': 'REFRESHMESSAGE',
	'LOADQRCODE': 'LOADQRCODE',
	'UPDATEQRCODE': 'UPDATEQRCODE',
	'LOADDISCOUNT': 'LOADDISCOUNT',
	'PUSHCOMMODITYNOTICE': 'PUSHCOMMODITYNOTICE',
	'PUSHUPDATEPLACETYPENOTICE': 'PUSHUPDATEPLACETYPENOTICE',
	'PUSHCOMMODITYTYPENOTICE': 'PUSHCOMMODITYTYPENOTICE',
	'SYNCDATANOTICE': 'SYNCDATANOTICE',
	'UPDATEREMARK': 'UPDATEREMARK',
	'PUSHOPENPLACESETTING': 'PUSHOPENPLACESETTING',
	'LOADOPENPLACESETTING': 'LOADOPENPLACESETTING',
	'PAYSETTINGUPDATE': 'PAYSETTINGUPDATE',
	'LOADPAYSETTING': 'LOADPAYSETTING',
	'GETPAYURL': 'GETPAYURL',
	'FINISHPAY': 'FINISHPAY',
	'CANCELPAY': 'CANCELPAY',
	'CHANGEEMPLOYEE': 'CHANGEEMPLOYEE',
	'PUSHUPDATESELLNOTICEOTHER': 'PUSHUPDATESELLNOTICEOTHER',
	'COUPONCOMPUTE': 'COUPONCOMPUTE',
	'REVERSEORDER': 'REVERSEORDER',
	'FAILEDPAY': 'FAILEDPAY',
	'TIMEPRICEALERT': 'TIMEPRICEALERT',
	'IMMEDIATEPAYOFF': 'IMMEDIATEPAYOFF',
	'SHARETABLE': 'SHARETABLE',
	'RECEIVEMTORDER': 'RECEIVEMTORDER',
	'REJECTMTORDER': 'REJECTMTORDER',
	'CANCELMTORDER': 'CANCELMTORDER',
	'DELIVERMTORDER': 'DELIVERMTORDER',
	'PAYOFFMTORDER': 'PAYOFFMTORDER',
	"CANCELCONFIRMORDER": "CANCELCONFIRMORDER", // 取消确认
	'LOADMTORDER': 'LOADMTORDER',
	'REFRESHMTORDER': 'REFRESHMTORDER',
	'LOADCOURIERS': 'LOADCOURIERS',
	"LOADMTWAITORDER": "LOADMTWAITORDER",  // 加载待接单
	"LOADMTWAITDELIVER": "LOADMTWAITDELIVER", // 加载待配送
	"LOADMTWAITPAYOFF": "LOADMTWAITPAYOFF",  // 加载待收银
	"LOADMTCANCELCONFIRM": "LOADMTCANCELCONFIRM", // 加载取消待确认
	"LOADMTCANCELED": "LOADMTCANCELED", // 加载已取消
	"LOADORDERSFORSTATUS": "LOADORDERSFORSTATUS",
	"LOADMTORDERCOUNT": "LOADMTORDERCOUNT",
	"PRINTPREPAYOFF": "PRINTPREPAYOFF",
	"WINCLOSE": "WINCLOSE",
	"GETORDERCOUNT": "GETORDERCOUNT",
	"OPENPLACEHASSELLINFO": "OPENPLACEHASSELLINFO",
	"SHARETABLEHASSELLINFO": "SHARETABLEHASSELLINFO",
	"REFRESHCASHIERPERMISSIONS": "REFRESHCASHIERPERMISSIONS"   // 刷新收银权限

};
// 服务端口
//	exports.PORT = 9527;
export let PORT = 10001;      //2.0
// 服务端口//收银台IP
export let HOST = "192.168.1.254";
    //exports.HOST = "120.25.92.213";
	//exports.HOST = "localhost";


