import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class AppConstants {
    readonly SYSCODE: string = 'VB';
    //readonly VERSION:string = '1.02';
    readonly VERSION: string = '0.0.02';
    readonly SYS_SELLER_ID: string = '10000';
    readonly ID_UESR_TB: string = "eaece0f2f50b4714b5676356e6b633db";

    readonly MSG_SOUND: string = 'assets/sounds/new_msg.mp3';
    readonly MSG_SOUND_NUMBER_0: string = 'assets/sounds/num/0.wav';
    readonly MSG_SOUND_NUMBER_1: string = 'assets/sounds/num/1.wav';
    readonly MSG_SOUND_NUMBER_2: string = 'assets/sounds/num/2.wav';
    readonly MSG_SOUND_NUMBER_3: string = 'assets/sounds/num/3.wav';
    readonly MSG_SOUND_NUMBER_4: string = 'assets/sounds/num/4.wav';
    readonly MSG_SOUND_NUMBER_5: string = 'assets/sounds/num/5.wav';
    readonly MSG_SOUND_NUMBER_6: string = 'assets/sounds/num/6.wav';
    readonly MSG_SOUND_NUMBER_7: string = 'assets/sounds/num/7.wav';
    readonly MSG_SOUND_NUMBER_8: string = 'assets/sounds/num/8.wav';
    readonly MSG_SOUND_NUMBER_9: string = 'assets/sounds/num/9.wav';


    readonly PRINTER_TYPE_SOCKET: string = '0'; //socket 打印机
    readonly PRINTER_TYPE_BLUETOOTH: string = '1'; //蓝牙打印机

    readonly PRINTER_MODEL_SPLIT: string = '0'; //分单
    readonly PRINTER_MODEL_MERGE: string = '1'; //合并
    readonly PRINTER_CHECK_INTERVAL: number = 600000;//打印机状态查询时间周期
    readonly WAIMAICOUNT_INTERVAL: number = 1000; //外卖订单查询时间周期
    readonly WAIMAICOUNT_PERIOD: number = 30000;  //外卖订单查询间隔
    readonly TABLECOUNT_INTERVAL: number = 1000; //桌台订单查询时间周期
    readonly TABLECOUNT_PERIOD: number = 30000; //桌台订单查询间隔
    readonly REQ_TIMEOUT: number = 30000;  //请求超时时间

    readonly APP_STORE_URL: string = 'https://itunes.apple.com/us/app/爱宝智能餐厅(旗舰版)/id1476232182?l=zh&ls=1&mt=8';

    readonly MULT_REPORT_CACHE: string = "MULT_REPORT_CACHE";
    readonly MULT_REPORT_KEY_CACHE: string = "MULT_REPORT_KEY_CACHE";
    readonly SINGLE_REPORT_CACHE: string = "SINGLE_REPORT_CACHE";

    readonly MSG_PAGE_SIZE: number = 20;

    /**日志类型 */
    readonly OPERATION_TYPE = { 'YH': '优惠', 'TC': '退菜', 'JC': '加菜', 'QD': '取单', 'XD': '下单', 'CT': '撤台', 'ZT': '转台', 'ZF': '支付', 'JZ': '结账' };
    readonly OPERATION_TYPE_KEY = ['YH', 'TC', 'JC', 'QD', 'XD', 'CT', 'ZT', 'ZF', 'JZ'];

    //更新日志
    readonly LOG = '1，新增支持总店管理分店功能<br/>2，新增管理商品调价单功能<br/>3，新增连锁商品资料，单位，品牌，分类，供应商复制功能<br/>4，新增商品批量操作功能<br/>5，配合后台修改部分页面';

    readonly NUM_MAX_LENGTH = 99999.99;
    readonly NUM_LENGHT_ERROR_HINT = '请输入0~99999.99之间的数值';

    readonly FOOD_OUT_MODEL = { 'N': '普通', 'S': '分串' };

    /**应用模式 */
    readonly SYS_MODEL_TYPE_LIST = [
        { topImag: 'assets/imgs/sign/manufacture.png', text: '出品模式(KDS)', synopsis: '介绍aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa***', model: 'KDS' },
        { topImag: 'assets/imgs/sign/takeNum.png', text: '取号模式(TN)', synopsis: '******', model: 'TN' },
        { topImag: 'assets/imgs/sign/call.png', text: '排队/叫号模式(TV)', synopsis: '******', model: 'TV' }];
    readonly SYS_MODEL_TYPE_MAP = { 'KDS': '出品模式(KDS)', 'TN': '取号模式(TN)', 'TV': '排队/叫号模式(TV)' }


    getKeys(obj: {}): any[] {
        let keys: any[] = [];
        for (let key in obj) {
            keys.push(key);
        }
        return keys;
    }

    stringCutOut(st: string, start, end) {
        return st.substring(start, end)
    }
    // getArray(obj:{}):any[] {
    //     let Array:any[] = [];
    //     for(let key in obj) {
    //         Array.push(key);
    //     }
    //     return Array;
    // }
}