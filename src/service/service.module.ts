import { NgModule } from '@angular/core';
import { ShoppingService } from './shoppingService';
import { WebSocketService } from './webSocketService';
import { TableService } from './tableService';
import { MessageServiceBase } from './MessageServiceBase';
import { MobileMessageService } from './mobile/MobileMessageService';
import { LogService } from './logService';
import { PrintService } from './printService';
import { SystemService } from './systemService';
import { CallOrTakeNumberService } from './callOrTakeNumberService';
import { NetSocketReqService } from './netSocketReqService';


@NgModule({
  providers: [WebSocketService, ShoppingService, LogService, PrintService,
    TableService, MessageServiceBase, MobileMessageService, SystemService, CallOrTakeNumberService, NetSocketReqService]
})
export class ServiceModule { }
