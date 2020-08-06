import { SysMsg } from "../domain/sysMsg";
import { Injectable } from "@angular/core";
import { HttpProvider } from "../providers/http";
import { AppShopping } from "./app.shopping";

@Injectable({
  providedIn: 'root',
})

export class AppPermission {
    constructor(
        public http: HttpProvider,
        public appShopping: AppShopping,

    ) {
        this.staff = this.appShopping.staff;
    }

    readonly ITEM_PRESENT = "1506";  // 商品赠送权限

    roleCheckId: {} = {};//按钮权限
    isBoss: boolean = true;//是否是老板登陆
    isManager: boolean = false;//是否是管理员
    staff: any = {};
    staffPermissionArray: any = {};
    storeParam: any = [];
    storeParamArray: any = {};
    resetData() {
        this.roleCheckId = {};
        this.isBoss = true;
        this.isManager = false;
        this.staff = {};
        this.staffPermissionArray = {};
        this.storeParam = [];
        this.storeParamArray = {};
    }
    storeParamPermission(key) {
        if (this.storeParamArray[key]) {
            return true;
        } else {
            return false;
        }

    }
    findByParamKey(key) {
        for (let pi = 0, plen = this.storeParam.length; pi < plen; pi++) {
            if (this.storeParam[pi].paramKey === key) return this.storeParam[pi];
        }
        return null;
    }
    /**配置对象 */
    buildstoreParamArray(storeParam) {
        if (storeParam && storeParam.length > 0) {
            storeParam.forEach(element => {
                if (element.paramValue == 'Y') {
                    this.storeParamArray[element.paramKey] = true;
                } else {
                    this.storeParamArray[element.paramKey] = false;
                }

            });
        }
        // console.log('asddddddddddddddddd');

        console.log(this.storeParamArray);

    }
    /**权限对象 */
    buildStaffPermissionArray(staff) {
        let cashierCommission: string = staff.cashierCommission || '';
        this.staffPermissionArray = {};
        if (cashierCommission && cashierCommission.length > 0) {
            let list = cashierCommission.split(',');
            list.forEach(element => {
                this.staffPermissionArray[element] = true;
            });
        }
    }
    staffPermission(val: string) {
        if (this.staffPermissionArray[val]) {
            return true;
        } else {
            return false;
        }
    }



    buttonPermission(Key: string, isShow: boolean = false) {
        if (this.isBoss) {
            return true;
        }
        else if (this.roleCheckId[Key]) {
            return true;
        } else {
            // let con = {};
            let msg = '';
            if (Key == "2274") {
                msg = '无【新增】权限';
            } else if (Key == "2275") {
                msg = '无【删除】权限';
            } else if (Key == "2276") {
                msg = '无【编辑】权限';
            } else if (Key == "2273") {
                msg = '无【按钮】权限';
            } else if (Key == "2311") {
                msg = '无【审核】权限';
            } else if (Key == "2289") {
                msg = '无【会员重置密码】权限';
            } else if (Key == "2338") {
                msg = '无【次卡新建/编辑】权限';
            } else if (Key == "2339") {
                msg = '无【会员冲减积分】权限';
            } else if (Key == "2348") {
                msg = '无【新建储值卡规则】权限';
            } else if (Key == "2364") {
                msg = '无【新建报损原因】权限';
            } else if (Key == "2365") {
                msg = '无【删除储值卡规则】权限';
            } else if (Key == "2401") {
                msg = '无【显示主页概况】权限';
            } else if (Key == "2370") {
                msg = '无【复制】权限';
            }

            if (isShow) {
                this.http.showToast(msg);
            }

        }
    }
}