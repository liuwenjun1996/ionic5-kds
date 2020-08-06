import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { WebSocketService } from '../../service/webSocketService';

/**
 * 全局异常处理
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, public WebsocketService: WebSocketService) { }
  handleError(error) {
    console.log(error);
    if (typeof error == 'object') {
      let errMessage = error.stack || error.message;
      this.WebsocketService.upLogData({ KDSERR: errMessage }).subscribe(res => {
      })
    }
    // console.log('111111111111111111111111111111111111111111111111111111111111111111111111111111');
    // let loggingService = this.injector.get(this.nGXLogger);
    // let location = this.injector.get(this.locationStrategy);
    // let message = error.message ? error.message : error.toString();
    // let url = location instanceof PathLocationStrategy ? location.path() : '';
    // // get the stack trace, lets grab the last 10 stacks only
    // StackTrace.fromError(error).then(stackframes => {
    //   let stackString = stackframes
    //     .splice(0, 20)
    //     .map(function (sf) {
    //       return sf.toString();
    //     }).join('\n');
    //   console.log(stackString);
    //   loggingService.error('error', { message: message, stack: stackString });
    // });
    // throw error;
  }
}