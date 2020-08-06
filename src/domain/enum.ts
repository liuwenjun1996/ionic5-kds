/**
 * 打印设置类型
 */

/*export enum PrintType {
  default,  //开单
  waimai,  //外卖
  table //台单
}*/
export class PrintType {
  public static default = 0;  //厨房
  public static waimai = 1; //外卖
  public static table = 2; //桌台
  public static shoukuan = 3; //收款
  public static kaitai = 4; //开台
}

/**
 * 打印机类型
 */

/*export const enum PrinterType {
  kitchenPrinter,  //厨房打印机
  receiptPrinter, //小票打印机
  tablePrinter,  //台单打印机
  imgPrinter  //图片打印机
}*/

export class PrinterType {
  public static kitchenPrinter = 0;  //厨房打印机
  public static receiptPrinter = 1; //小票打印机
  public static tablePrinter = 2; //台单打印机
  public static imgPrinter = 3  //图片打印机
  public static tagPrinter = 4  //标签打印机
}

/*export const enum linkType {
  wifi,
  bluetooth
}*/

export class linkType {
  public static wifi = 0;
  public static bluetooth = 1;
}

/*export const enum SourceType {
  shoukuan, //收款
  kaidan, //开单
}*/
export class SourceType {
  public static shoukuan = 0; //收款
  public static kaidan = 1; //开单
}

/*export const enum BookType {
  waimai = 1, //外卖
  zhuotai = 2//桌台
}*/

export class BookType {
  public static waimai = 1; //外卖
  public static zhuotai = 2; //桌台
  public static ziti = 3; //自提
}
