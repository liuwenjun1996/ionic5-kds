import { Injectable } from '@angular/core';

/*
  Generated class for the CommonStatusenumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class CommonStatusEnum {

  constructor() { };

    //系统类型 CSY：超市云  ：美超云  ：美食云
    static SysType: any = {
        L: 'CSY',
        MCY: 'MCY',
        MSY: 'MSY'
    }
}
