import { Injectable } from '@angular/core';
/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class EventsUtilProvider {
    onObj: {};
    oneObj: {};
    constructor() {
    }
    /**
     *  监听事件
     * @param key 
     * @param fun 
     */
    on(key, fun) {
        if (this.onObj[key] === undefined) {
            this.onObj[key] = [];
        } else {
            this.onObj[key].push(fun);
        }
    }
    /**
     * 
     * @param key 
     * @param fn 
     */
    one(key, fn) {
        if (this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        } else {
            this.oneObj[key][0] = (fn);
        }
    }
    /**
     * 
     * @param key 
     */
    off(key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    }
    /**
     * 发布事件
     */
    trigger() {
        let key, args;
        if (arguments.length == 0) {
            return false;
        }
        key = arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));

        if (this.onObj[key] !== undefined
            && this.onObj[key].length > 0) {
            for (let i in this.onObj[key]) {
                this.onObj[key][i].apply(null, args);
            }
        }
        if (this.oneObj[key] !== undefined
            && this.oneObj[key].length > 0) {
            for (let i in this.oneObj[key]) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }

}
