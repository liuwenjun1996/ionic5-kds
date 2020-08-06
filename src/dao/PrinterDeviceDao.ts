import { IPrinterDevice, PrinterDevice } from "../domain/printerDevice";
import { GenericDAO } from "./genericDAO";
import { Injectable } from "@angular/core";
import { AppCache } from "../app/app.cache";


@Injectable({
  providedIn: 'root',
})
export class PrinterDeviceDao extends GenericDAO<IPrinterDevice> {
  readonly tableName: string = PrinterDevice.tableName;

  // queryByPrinterSellerId(sellerId: string){
  //   return this.queryAsListByWhere('where sellerId=?', [sellerId])
  // }

  queryByPrinterType(printerType: string, sellerId: string) {
    return this.queryAsListByWhere('where printerType=? and sellerId=? ORDER BY createTime ASC', [printerType, sellerId])
  }

  queryByNameOrAddress(data: IPrinterDevice) {
    if (data.id == null) {
      return this.queryAsListByWhere("where (name=? or address=?) and printerType=? and sellerId=?",
        [data.name, data.address, data.printerType, data.sellerId])
    } else {
      return this.queryAsListByWhere("where id!=? and (name=? or address=?) and printerType=? and sellerId=?",
        [data.id, data.name, data.address, data.printerType, data.sellerId])
    }
  }

  clearKtPrint(sellerId: string) {
    sellerId = this.appCache.seller.id;
    return this.removeByWhere('where printerType="0" and sellerId=?', [sellerId])
  }
  clearPrintByPrinterType(printerType: string) {
    let sellerId = this.appCache.seller.id;
    return this.removeByWhere('where printerType=? and sellerId=?', [printerType, sellerId])
  }

}
