import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';



/**
 * 全局的事件通知、订阅、回调服务。
 *   - 通知的内容可以是数字、字符串、json对象等，只要订阅者和发布者约定好格式即可。
 *   - 发布者和订阅者，通常是component (组件)，均需要在构造函数中注入
 *       ① import { GlobalState } from '../../app/global.state'; （路径视情况调整）
 *       ② constructor(public _state: GlobalState, ...){}
 *   - 发布例: 语言修改为英语
 *       this._state.notifyDataChanged('settings.lang.systemLang', 'en');
 *   - 订阅者: 语言修改后，会立即收到通知
 *      this._state.subscribe('settings.lang.systemLang', systemLang =>{
          this.systemLang =  systemLang;
          this.setLanguage();
        });
 *
 * @export
 * @class GlobalState
 */
@Injectable({
  providedIn: 'root',
})
export class EventsProvider {

  public secondTabState: any;

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this.secondTabState = {
      display: true,
      text: '仓储',
      tab: 'store'
    };
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {
    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
    }
    this._data.next({
      event: event,
      data: this._data[event]
    });
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);

    const current = this._data[event];
    if (current !== undefined) {
      setTimeout(() => {
        callback.call(null, current);
      });
    }
  }

  unsubscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    const nSubs = [];
    subscribers.forEach(element => {
      if (element !== callback) {
        nSubs.push(element);
      }
    });
    this._subscriptions.set(event, nSubs);
  }

  unsubscribeAll(event: string) {
    this._data[event] = undefined;
    this._subscriptions.set(event, []);
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
