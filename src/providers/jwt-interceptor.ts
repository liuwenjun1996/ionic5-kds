import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DatePipe } from '@angular/common';
import { AppConstants } from '../app/app.constants';
import { AppCache } from '../app/app.cache';

/*
  Generated class for the JwtInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private datePipe: DatePipe, public appCache: AppCache, public appConstants: AppConstants) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = {};

    if (req.headers && req.headers.has('isJson')) {
      req.headers.delete('isJson');
      headers["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if (req.headers && req.headers.has('isAuth')) {
      req.headers.delete('isAuth');
      let storeCode = this.appCache.userToken.username;
      if (this.appCache.seller && this.appCache.seller) {
        storeCode = this.appCache.seller.storeSysCode;
      }
      headers["Authorization"] = `Bearer ${this.appCache.userToken.accessToken}`;
      headers["jktranstionid"] = `${this.appConstants.SYSCODE}-${storeCode}-${this.datePipe.transform(new Date(), 'yyyyMMddhhmmsss')}-${Math.ceil(Math.random() * 10000)}`;
    } else {
      let storeCode = "000000";
      if (this.appCache.user && this.appCache.user.username) {
        storeCode = this.appCache.user.username;
      }
      //'Basic cGlnOmY3NGM2YWY0NmE3OGJlY2IyZjFiZDNmOTViYmQ1ODU4';
      headers["Authorization"] = 'Basic YXBvczpnaXA2NjY2';
      headers["jktranstionid"] = `${this.appConstants.SYSCODE}-${storeCode}-${this.datePipe.transform(new Date(), 'yyyyMMddhhmmsss')}-${Math.ceil(Math.random() * 10000)}`;
    }

    headers["sysversion"] = this.appConstants.VERSION;
    headers["sysname"] = this.appConstants.SYSCODE;

    req = req.clone({ setHeaders: headers });

    return next.handle(req)
  }

}
