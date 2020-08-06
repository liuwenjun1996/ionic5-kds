import { ErrorHandler, Injectable } from '@angular/core';
import { WebSocketService } from '../service/webSocketService';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
    constructor(public webSocketService: WebSocketService) { }
    handleError(error: any): void {
        console.log('ERROR Occurred.');
        console.log(JSON.stringify(error));
    }
}