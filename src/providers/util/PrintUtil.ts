import { Inject, Injectable } from '@angular/core';
import { TextEncoder } from 'text-encoding'
import { DatePipe } from "@angular/common";
import { APP_CONFIG, AppConfig } from "../../app/app.config";
import { IPrinterDevice } from "../../domain/printerDevice";
import { IOrderDetail } from "../../domain/order";
import { Observable, from } from "rxjs";
import { UtilProvider } from "./../util/util";
import { AppCache } from '../../app/app.cache';
// import { jsonStringPipe } from '../../pipes/json-string/json-string';


/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class PrintUtilProvider {
  LINE: number = 48; //48个中文字符
  LEFT_SPLIT: number = 7;  //LEFT_SPLIT 品名 LONG_SPLIT 数量 NORMAL_SPLIT 单价 NORMAL_SPLIT 小计
  LONG_SPLIT: number = 10;
  NORMAL_SPLIT: number = 6;
  LEFT_POSITON: number = 7 + 10 + 4; //this.LEFT_SPLIT + this.LONG_SPLIT + 4
  NORMAL_POSITON: number = 6 + 4;  //this.NORMAL_SPLIT + 4

  // 对齐方式
  ALIGN_LEFT: number = 0;  // 靠左
  ALIGN_CENTER: number = 1;  // 居中
  ALIGN_RIGHT: number = 2; // 靠右

  //字体大小
  FONT_NORMAL: number = 0; // 正常
  FONT_MIDDLE: number = 1; // 中等
  FONT_BIG: number = 2;  // 大

  //加粗模式
  FONT_BOLD: number = 0; // 字体加粗
  FONT_BOLD_CANCEL: number = 1;  // 取消加粗

  constructor(public datePipe: DatePipe,
    @Inject(APP_CONFIG) public config: AppConfig,
    public util: UtilProvider,
    public appCache: AppCache,
  ) {
  }

  /**
   * 初始化打印机
   * @returns {number[]}
   */
  public initPrinter() {
    //0x1B, 0x40
    return [27, 64]
  }

  /**
   * 切纸
   * @return
   */
  public setCutPaperCmd(cutLength?: 21) {
    // 走纸并切纸，最后一个参数控制走纸的长度
    //0x1d, 0x56, 0x42, 0x15
    return [29, 86, 66, cutLength]
  }

  /**
   * 打印并向前走纸 n 行
   * @returns {number[]}
   */
  public setScrollCmd() {
    //十六进制码 1B 64 n
    return [27, 100, 5]
  }

  /**
   * 对齐方式
   * @param alignMode
   * @return
   */
  public setAlignCmd(alignMode: number) {
    // let data = {(byte) 0x1b, (byte) 0x61, (byte) 0x0};
    let data = [27, 97, 0];
    if (alignMode == 0) { //左
      data[2] = 0;
    } else if (alignMode == 1) {  //中
      data[2] = 1;
    } else if (alignMode == 2) {  //右
      data[2] = 2;
    }

    return data;
  }

  /**
   * 字体大小
   * @param fontSize
   * @return
   */
  public setFontSizeCmd(fontSize: number) {
    // byte[] data = {(byte) 0x1d, (byte) 0x21, (byte) 0x0};
    let data = [29, 33, 0];
    if (fontSize == 0) { //FONT_NORMAL
      data[2] = 0;
    } else if (fontSize == 1) {  //FONT_MIDDLE
      data[2] = 1;
    } else if (fontSize == 2) { //FONT_BIG
      data[2] = 17;
    }

    return data;
  }

  public fontSizeSetBig(num: number) {
    let data = [29, 33, 0];
    switch (num) {
      case 1:
        data[2] = 0;
        break;
      case 2:
        data[2] = 17;
        break;
      case 3:
        data[2] = 34;
        break;
      case 4:
        data[2] = 51;
        break;
      case 5:
        data[2] = 68;
        break;
      case 6:
        data[2] = 85;
        break;
      case 7:
        data[2] = 102;
        break;
      case 8:
        data[2] = 119;
        break;
    }
    return data;
  }

  /**
   * 加粗模式
   * @param fontBold
   * @return
   */
  public setFontBoldCmd(fontBold: number) {
    // byte[] data = {(byte) 0x1b, (byte) 0x45, (byte) 0x0};
    let data = [27, 69, 0];

    if (fontBold == this.FONT_BOLD) {
      data[2] = 1;
    } else if (fontBold == this.FONT_BOLD_CANCEL) {
      data[2] = 0;
    }

    return data;
  }

  /**
   * 打开钱箱
   * @return
   */
  public setOpenDrawerCmd() {
    return [16, 20, 0, 0]
  }

  /**
   * 添加换行符 \r\n
   */
  public addLineSeparator() {
    return [13, 10]
  }

  /**
   * 添加空格
   */
  public addSpace(num: number) {
    let data = [];

    for (let i = 0; i < num; i++) {
      data.push(32)
    }

    return data
  }

  /**
   * 添加分割符
   * @param {string} split
   * @param {number} num
   * @returns {any[]}
   */
  public addSplitLine(split: string, num: number): any[] {
    let ascii = split.charCodeAt(0);
    let data = [];
    for (let i = 0; i < num; i++) {
      data.push(ascii)
    }

    return data
  }

  /**
   * 计算厨房打印菜品名称位置
   * @param {any[]} data
   * @param {IOrderDetail} item
   */
  public setkPCommodity(item: IOrderDetail): any[] {
    let data = [];
    let location: number = 0;
    let charCount: number = 0;
    let firstLine: boolean = true;
    let name: string = (item.sellNum < 0 ? '[退菜]' : '') + item.productName;

    if (item.isSku === '1') {
      name = name + `(${item.skuName})`
    }

    if (item.isOut == "1") {
      name = name + "【打包】"
    }

    let length = name.length;
    //菜品
    from(name).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;
      if (location >= 18 || charCount == length) {
        this.push(data, char);
        //第一行
        if (firstLine) {
          // 间隔
          data = this.concatCmd(data, this.addSpace(18 - location + 2));
          //菜品数量
          this.push(data, item.sellNum + item.unitName);
          firstLine = false
        }
        //换行
        data = this.concatCmd(data, this.addLineSeparator());
        //重新计算位置
        location = 0
      } else {
        this.push(data, char)
      }
    });

    return data
  }

  public setRPCommodity(item: IOrderDetail): any[] {
    let data = [];
    let name: string = (item.sellNum < 0 ? '[退]' : '') + item.productName;

    if (item.isSku === '1') {
      name = name + `(${item.skuName})`
    }

    if (item.isOut == "1") {
      name = name + "【打包】"
    }

    let length = name.length;
    let location: number = 0;  //打印位置
    let charCount: number = 0; //字符统计
    let firstLine: boolean = true; //是否第一行

    from(name).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;

      if (location >= 18 || charCount == length) {
        this.push(data, char);

        //第一行
        if (firstLine) {
          data = this.concatCmd(data, this.addSpace(18 - location + 2));
          data = this.concatCmd(data, this.addSplitLine('', 1));

          //菜品数量
          data = this.concatCmd(data, this.addSpace(3 - (item.sellNum + '').length));
          this.push(data, (item.sellNum < 0 ? ' ' : 'x') + item.sellNum);

          //售价
          let price = this.util.accMul(item.sellNum, item.sellPrice);
          data = this.concatCmd(data, this.addSpace(8 - (price + '').length));
          this.push(data, (price) + '');

          firstLine = false
        }

        //换行
        data = this.concatCmd(data, this.addLineSeparator());
        //重新计算位置
        location = 0
      } else {
        this.push(data, char)
      }
    });

    return data
  }


  /**
   * 打印属性
   * @param {string} remark
   * @returns {any[]}
   */
  public addRemark(remark: string, len: number = 18): any[] {
    let data = [];
    let length = remark.length;
    let location: number = 0;  //打印位置
    let charCount: number = 0; //字符统计
    let firstLine: boolean = true; //是否第一行
    this.push(data, "  ");
    from(remark).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;

      if (location >= len || charCount == length) {
        this.push(data, char);
        if (charCount < length) {
          //换行
          data = this.concatCmd(data, this.addLineSeparator());
        }
        //重新计算位置
        location = 0;
        this.push(data, "  ");
      } else {
        this.push(data, char)
      }
    });
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    return data
  }

  /**
   * 打印属性
   * @param {string} remark
   * @returns {any[]}
   */

  /*public addAutoLine(remark: string,len:number=18,spaceNum:number=0): any[] {
    let data = [];
    let length = remark.length;
    let location: number = 0;  //打印位置
    let charCount: number = 0; //字符统计
    let firstLine: boolean = true; //是否第一行
    location=spaceNum;
    from(remark).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;

      if (location == len||(location+2) > len || charCount == length) {
        this.push(data, char);
        if(charCount < length){
          //换行
          data = this.concatCmd(data, this.addLineSeparator());
        }
        //重新计算位置
        location = 0
      } else {
        this.push(data, char)
      }
    });
    //换行
    //data = this.concatCmd(data, this.addLineSeparator());
    return data
  }*/

  getPrintSourceTypeName(sourceType) {
    let name = "";
    if (sourceType == "0") {
      name = "收款";
    } else if (sourceType == "1") {
      name = "开单";
    } else if (sourceType == "2") {
      name = "外卖";
    } else if (sourceType == "3") {
      name = "桌台";
    } else if (sourceType == "4") {
      name = "一键支付";
    } else if (sourceType == "5") {
      name = "收款码收款";
    }
    return name;
  }
  initPrintData(data) {
    data = this.concatCmd(data, [27, 64]);//清空缓冲区
    //data = this.concatCmd(data,[27,32,2]);//设置右间距
    //data = this.concatCmd(data,[27,82,15]);//字符集
    //data = this.concatCmd(data,[27,116,2]);//字符集
    //data = this.concatCmd(data,[28,83,1,1]);//设定全角汉字字间距
    //data = this.concatCmd(data,[28,84,1,1]);//设定全角汉字字间距
    data = this.concatCmd(data, [27, 33, 1]);//行距
    return data;
  }


  //盘点小票打印数据  58mm 80mm
  stockingData(topAndLeg, stockingData, device: IPrinterDevice) {
    let size = device.size
    let num = 32
    if (size != 1) {
      num = 48
    } else {
      num = 32
    }
    let data = [27, 64];
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_CENTER));
    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    // 店名
    this.push(data, `单据`);

    //换两行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addLineSeparator());
    //左对齐
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_LEFT));

    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_NORMAL));
    // data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    this.push(data, `来源: 爱宝智能餐厅`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    //操作人员
    this.push(data, `操作人员: ${(topAndLeg.user)}`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    //时间
    this.push(data, `时间: ${this.datePipe.transform(topAndLeg.time, 'yyyy-MM-dd HH:mm:ss')}`);
    if (topAndLeg.stkNo) {
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      this.push(data, `单号: ${(topAndLeg.stkNo)}`);
    }
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addSplitLine('-', num));
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    if (size && size != 1) {
      //详单头  80mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(data, `商品名称                     数量       金额`);
    } else {
      //详单头  58mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(data, `商品名称         数量      金额`);
    }
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addSplitLine('-', num));
    data = this.concatCmd(data, this.addLineSeparator());
    //详单
    from(stockingData).subscribe(item => {
      if (size && size != 1) {
        //80mmm
        data = this.concatCmd(data, this.setStocking2(item));
      } else {
        //58mm
        data = this.concatCmd(data, this.setStocking(item));
      }

    });
    //分割符
    data = this.concatCmd(data, this.addSplitLine('-', num));
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_LEFT));
    // this.push(data, `已盘点 ${(topAndLeg.normalNum + topAndLeg.unNormalNum)}种商品，其中库存正常有${(topAndLeg.normalNum)}种，库存异常有${(topAndLeg.unNormalNum)}种。`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    console.log(data);
    return data;
  }

  /**ios 数据 */
  stockingBleData(topAndLeg, stockingData, device: IPrinterDevice) {
    let size = device.size
    let num = 32
    if (size != 1) {
      num = 48
    } else {
      num = 32
    }
    let list = [];
    //走纸
    // data = this.concatCmd(data, this.setScrollCmd());
    list[0] = [27, 64];
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    list[0] = this.concatCmd(list[0], this.setAlignCmd(this.ALIGN_CENTER));
    list[0] = this.concatCmd(list[0], this.setFontSizeCmd(this.FONT_BIG));
    // 店名s
    this.push(list[0], `单据`);

    //换两行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    //左对齐
    list[0] = this.concatCmd(list[0], this.setAlignCmd(this.ALIGN_LEFT));

    list[0] = this.concatCmd(list[0], this.setFontSizeCmd(this.FONT_NORMAL));
    // data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    this.push(list[0], `来源: 爱宝智能餐厅`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    //操作人员
    this.push(list[0], `操作人员: ${(topAndLeg.user)}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    //时间
    this.push(list[0], `时间: ${this.datePipe.transform(topAndLeg.time, 'yyyy-MM-dd HH:mm:ss')}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    if (topAndLeg.stkNo) {
      this.push(list[0], `盘点单号: ${(topAndLeg.stkNo)}`);
      //换行
      list[0] = this.concatCmd(list[0], this.addLineSeparator());
    }
    console.log(list[0]);
    list[1] = [];
    list[1] = this.concatCmd(list[1], this.addSplitLine('-', num));
    //换行
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    if (size && size != 1) {
      //详单头  80mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(list[1], `商品名称                     数量       金额`);
    } else {
      //详单头  58mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(list[1], `商品名称         数量      金额`);
    }
    //换行
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    list[1] = this.concatCmd(list[1], this.addSplitLine('-', num));
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    console.log(list[1]);
    //详单
    let number = 1;
    let i = 0;
    from(stockingData).subscribe(item => {
      if (i % 3 == 0) {
        number = number + 1;
        list[number] = [];
      }
      if (size && size != 1) {
        //80mmm
        list[number] = this.concatCmd(list[number], this.setStocking2(item));
        i++;
      } else {
        //58mm
        list[number] = this.concatCmd(list[number], this.setStocking(item));
        i++;
      }

    });
    console.log(list);
    list[number + 1] = [];
    //换行
    // list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addSplitLine('-', num));
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.setAlignCmd(this.ALIGN_LEFT));
    // this.push(list[number + 1], `已盘点 ${(topAndLeg.normalNum + topAndLeg.unNormalNum)}种商品，其中库存正常有${(topAndLeg.normalNum)}种，库存异常有${(topAndLeg.unNormalNum)}种。`);
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    console.log(list);
    return list;
  }

  //盘点详情单data 58mm
  public setStocking(item): any[] {
    let data = [];
    let name: string = item.itemName;

    let length = name.length;
    let location: number = 0;  //打印位置
    let charCount: number = 0; //字符统计
    let firstLine: boolean = true; //是否第一行

    from(name).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;
      // 18
      if (location >= 15 || charCount == length) {
        this.push(data, char);

        //第一行
        if (firstLine) {
          // 18
          data = this.concatCmd(data, this.addSpace(16 - location));
          data = this.concatCmd(data, this.addSplitLine('', 1));

          //云库存
          // 3
          data = this.concatCmd(data, this.addSpace(8 - (item.stockQty + '').length));
          this.push(data, (item.stockQty + ''));

          //实际库存
          // let price = item.stkQty;
          // 8
          data = this.concatCmd(data, this.addSpace(8 - (item.stkQty + '').length));
          this.push(data, (item.stkQty + ''));
          firstLine = false
        }
        //换行
        data = this.concatCmd(data, this.addLineSeparator());
        //重新计算位置
        location = 0
      } else {
        this.push(data, char)
      }
    });

    return data
  }

  //盘点详情单data 80mm
  public setStocking2(item): any[] {
    let data = [];
    let name: string = item.itemName;

    let length = name.length;
    let location: number = 0;  //打印位置
    let charCount: number = 0; //字符统计
    let firstLine: boolean = true; //是否第一行

    from(name).subscribe(char => {
      //中文占2个位置 ascii占1个位置
      char.charCodeAt(0) > 126 ? location += 2 : location += 1;
      //字符位置
      charCount += 1;

      if (location >= 21 || charCount == length) {
        this.push(data, char);

        //第一行
        if (firstLine) {
          data = this.concatCmd(data, this.addSpace(21 - location + 2));
          data = this.concatCmd(data, this.addSplitLine('', 1));

          //云库存
          data = this.concatCmd(data, this.addSpace(12 - (item.stockQty + '').length));
          this.push(data, item.stockQty);

          //实际库存
          // let price = item.stkQty;
          data = this.concatCmd(data, this.addSpace(12 - (item.stkQty + '').length));
          this.push(data, (item.stkQty) + '');
          firstLine = false
        }
        //换行
        data = this.concatCmd(data, this.addLineSeparator());
        //重新计算位置
        location = 0
      } else {
        this.push(data, char)
      }
    });

    return data
  }

  /**
   * 出品小票 58mm 80mm
   * @param topAndLeg 
   * @param stockingData 
   * @param device 
   */
  // 58mm 80mm
  outSalesData(topAndLeg, list, device: IPrinterDevice) {
    let size = device.size
    let num = 32
    if (size != 1) {
      num = 48
    } else {
      num = 32
    }
    let data = [27, 64];
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_CENTER));
    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    // 单头
    this.push(data, `${(topAndLeg.topName)}`);
    //换两行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_NORMAL));
    if (topAndLeg.storeName) {
      this.push(data, topAndLeg.storeName);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    //左对齐
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_LEFT));
    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    if (topAndLeg.tabNameOrMealNo) {
      this.push(data, `桌/牌: ${(topAndLeg.tabNameOrMealNo)}`);
      if (topAndLeg.personNum) {
        data = this.concatCmd(data, this.addSpace(8));
        this.push(data, `人数: ${(topAndLeg.personNum)}`);
      }
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_NORMAL));
    this.push(data, `单号: ${(topAndLeg.salesNo)}`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    this.push(data, `操作人: ${(topAndLeg.user)}`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    this.push(data, `来源: 爱宝智能餐厅`);
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    //时间
    if (topAndLeg.salesTime) {
      this.push(data, `时间: ${(topAndLeg.salesTime)}`);
    }
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    //打印时间
    if (topAndLeg.doPrintTime) {
      this.push(data, `打印时间: ${(topAndLeg.doPrintTime)}`);
    }

    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addSplitLine('-', num));
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    if (size && size != 1) {
      //详单头  80mm
      this.push(data, `商品名称                      出品数量      `);
    } else {
      //详单头  58mm
      this.push(data, `商品名称                出品数量    `);
    }
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.addSplitLine('-', num));
    data = this.concatCmd(data, this.addLineSeparator());
    //详单
    from(list).subscribe(item => {
      if (size && size != 1) {
        //80mmm
        data = this.concatCmd(data, this.setSales2(item));
      } else {
        //58mm
        data = this.concatCmd(data, this.setSales(item));
      }

    });
    //分割符
    data = this.concatCmd(data, this.addSplitLine('-', num));
    //换行
    data = this.concatCmd(data, this.addLineSeparator());
    data = this.concatCmd(data, this.setAlignCmd(this.ALIGN_LEFT));
    if (topAndLeg.remark && topAndLeg.remark.length > 0 && topAndLeg.remark != null && topAndLeg.remark != 'null') {
      this.push(data, `整单备注: ${(topAndLeg.remark)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.salesQty) {
      this.push(data, `合计数量: ${(topAndLeg.salesQty)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.salesAmt) {
      this.push(data, `合计金额: ${(topAndLeg.salesAmt)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.ttlTeaAmt) {
      this.push(data, `茶位费: ${(topAndLeg.ttlTeaAmt)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.retailAmt) {
      this.push(data, `原价金额: ${(topAndLeg.retailAmt)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.totalOneCampaignPrice && topAndLeg.totalOneCampaignPrice != 0) {
      this.push(data, `单品优惠: ${(topAndLeg.totalOneCampaignPrice)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.allCampaignPrice && topAndLeg.allCampaignPrice != 0) {
      this.push(data, `整单优惠: ${(topAndLeg.allCampaignPrice)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.expectedAmount) {
      this.push(data, `预结金额: ${(topAndLeg.expectedAmount)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    if (topAndLeg.retailPrice) {
      this.push(data, `实收金额: ${(topAndLeg.retailPrice)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }

    if (topAndLeg['salesPayList'] && topAndLeg['salesPayList'].length > 0) {
      topAndLeg.salesPayList.forEach(pay => {
        if (pay.changeFlag != '1') {
          this.push(data, pay.payName + '：' + pay.payAmt);
          //换行
          data = this.concatCmd(data, this.addLineSeparator());
        } else {
          pay.payAmt = -pay.payAmt;
          this.push(data, '找零：' + pay.payAmt);
          //换行
          data = this.concatCmd(data, this.addLineSeparator());
        }

      })
    }
    if (topAndLeg.statusName) {
      this.push(data, `${(topAndLeg.statusName)}`);
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    console.log(data);
    return data;
  }
  /**ios 数据 */
  salesBleData(topAndLeg, stockingData, device: IPrinterDevice) {
    let size = device.size
    let num = 32
    if (size != 1) {
      num = 48
    } else {
      num = 32
    }
    let list = [];
    //走纸
    // data = this.concatCmd(data, this.setScrollCmd());
    list[0] = [27, 64];
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    list[0] = this.concatCmd(list[0], this.setAlignCmd(this.ALIGN_CENTER));
    list[0] = this.concatCmd(list[0], this.setFontSizeCmd(this.FONT_BIG));
    // 单头
    this.push(list[0], `${(topAndLeg.topName)}`);
    //换两行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    list[0] = this.concatCmd(list[0], this.setFontSizeCmd(this.FONT_NORMAL));
    if (topAndLeg.customer) {
      this.push(list[0], topAndLeg.customer);
      //换行
      list[0] = this.concatCmd(list[0], this.addLineSeparator());
    }
    //左对齐
    list[0] = this.concatCmd(list[0], this.setAlignCmd(this.ALIGN_LEFT));
    this.push(list[0], `桌/牌: ${(topAndLeg.tabNameOrMealNo)}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    this.push(list[0], `单号: ${(topAndLeg.salesNo)}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    this.push(list[0], `创建者: ${(topAndLeg.createdName)}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    // data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_BIG));
    this.push(list[0], `来源: 爱宝智能餐厅`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    //时间
    this.push(list[0], `时间: ${(topAndLeg.salesTime)}`);
    //换行
    list[0] = this.concatCmd(list[0], this.addLineSeparator());
    console.log(list[0]);
    list[1] = [];
    list[1] = this.concatCmd(list[1], this.addSplitLine('-', num));
    //换行
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    if (size && size != 1) {
      //详单头  80mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(list[1], `品名      原价    单价    数量    小计  `);
    } else {
      //详单头  58mm
      // let top = { itemName: '商品名称', stockQty: '云库存', stkQty: '实际库存' };
      // data = this.concatCmd(data, this.setStocking(top));
      this.push(list[1], `品名    原价  单价  数量   小计 `);
    }
    //换行
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    list[1] = this.concatCmd(list[1], this.addSplitLine('-', num));
    list[1] = this.concatCmd(list[1], this.addLineSeparator());
    console.log(list[1]);
    //详单
    let number = 1;
    let i = 0;
    from(stockingData).subscribe(item => {
      if (i % 3 == 0) {
        number = number + 1;
        list[number] = [];
      }
      if (size && size != 1) {
        //80mmm
        list[number] = this.concatCmd(list[number], this.setSales2(item));
        i++;
      } else {
        //58mm
        list[number] = this.concatCmd(list[number], this.setSales(item));
        i++;
      }

    });
    console.log(list);
    list[number + 1] = [];
    //换行
    // list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.addSplitLine('-', num));
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 1] = this.concatCmd(list[number + 1], this.setAlignCmd(this.ALIGN_LEFT));
    // this.push(list[number + 1], `已盘点 ${(topAndLeg.normalNum + topAndLeg.unNormalNum)}种商品，其中库存正常有${(topAndLeg.normalNum)}种，库存异常有${(topAndLeg.unNormalNum)}种。`);
    //换行
    this.push(list[number + 1], `合计数量: ${(topAndLeg.salesQty)}`);
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    this.push(list[number + 1], `合计金额: ${(topAndLeg.salesAmt)}`);
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    this.push(list[number + 1], `茶位费: ${(topAndLeg.ttlTeaAmt)}`);
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    this.push(list[number + 1], `合计原价: ${(topAndLeg.retailAmt)}`);
    //换行
    list[number + 1] = this.concatCmd(list[number + 1], this.addLineSeparator());
    list[number + 2] = [];
    if (topAndLeg['salesPayList'] && topAndLeg['salesPayList'].length > 0) {
      topAndLeg.salesPayList.forEach(pay => {
        this.push(list[number + 2], pay.payName + '：' + pay.payAmt);
        //换行
        list[number + 2] = this.concatCmd(list[number + 2], this.addLineSeparator());
      })
    }
    list[number + 3] = [];
    this.push(list[number + 3], `${(topAndLeg.statusName)}`);
    //换行
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    list[number + 3] = this.concatCmd(list[number + 3], this.addLineSeparator());
    console.log(list);
    return list;
  }



  //出品data 58mm
  public setSales(item): any[] {
    let data = [];
    let name: string = item.itemName;
    if (item.specs1 && item.specs1.length > 0) {
      name = name + '(' + item.specs1 + ')';
    }
    let itemAttr: string = this.util.jsonTransformToString(item.itemAttr);
    let location = this.util.stringPrintLength(name);
    if (item.remark) {
      itemAttr = itemAttr + '|' + '备注：' + item.remark;
    }
    //  let retailAmt= this.woShopServices.getRetailAmt(item);
    // let salesAmt = this.woShopServices.getSalesAmt(item,false);
    if (!item.parentId) {//主商品
      data = this.concatCmd(data, this.setFontSizeCmd(this.appCache.Configuration.DY_SPMS));
      this.push(data, name);

      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      // data = this.concatCmd(data, this.addSpace(12 - (item.retailPrice + '').length));
      // this.push(data, (item.retailPrice + ''));

      // data = this.concatCmd(data, this.addSpace(6 - (item.salesPrice + '').length));
      // this.push(data, (item.salesPrice + ''));

      let salesQty = item.currCrossoutNum || 0;
      if (item.unitName) {
        salesQty = salesQty + item.unitName;
      }
      //加粗
      data = this.concatCmd(data, this.setFontBoldCmd(0));
      let n = this.util.stringPrintLength(salesQty + '');
      data = this.concatCmd(data, this.addSpace(16 - location - (salesQty + '').length));
      this.push(data, (salesQty));

      // data = this.concatCmd(data, this.addSpace(6 - (item.salesAmt + '').length));
      // this.push(data, (item.salesAmt + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      //取消加粗
      data = this.concatCmd(data, this.setFontBoldCmd(1));
      data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_NORMAL));
    } else {//套餐或加料明细
      let salesQty = item.currCrossoutNum || item.salesQty;
      name = '|_' + name;
      this.push(data, name);
      //加粗
      data = this.concatCmd(data, this.setFontBoldCmd(0));
      data = this.concatCmd(data, this.addSpace(24 - location - (salesQty + '').length));
      this.push(data, (salesQty + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      //取消加粗
      data = this.concatCmd(data, this.setFontBoldCmd(1));
    }
    if (itemAttr && itemAttr.length > 0) {
      this.push(data, (itemAttr + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    return data
  }

  //data 80mm
  public setSales2(item): any[] {
    let data = [];
    let name: string = item.itemName;
    // let salesAmt = this.woShopServices.getSalesAmt(item);
    if (item.specs1 && item.specs1.length > 0) {
      name = name + '(' + item.specs1 + ')';
    }
    let location = this.util.stringPrintLength(name);
    let itemAttr: string = this.util.jsonTransformToString(item.itemAttr);
    if (item.remark) {
      itemAttr = itemAttr + '|' + '备注：' + item.remark;
    }
    if (!item.parentId) {//主商品}
      data = this.concatCmd(data, this.setFontSizeCmd(this.appCache.Configuration.DY_SPMS));
      this.push(data, name);

      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      //加粗
      data = this.concatCmd(data, this.setFontBoldCmd(0));
      // data = this.concatCmd(data, this.addSpace(14 - (item.retailPrice + '').length));
      // this.push(data, (item.retailPrice + ''));

      // data = this.concatCmd(data, this.addSpace(8 - (item.salesPrice + '').length));
      // this.push(data, (item.salesPrice + ''));

      let salesQty = item.currCrossoutNum;
      if (item.unitName) {
        salesQty = salesQty + item.unitName;
      }
      let n = this.util.stringPrintLength(salesQty + '');
      data = this.concatCmd(data, this.addSpace(24 - location - (salesQty + '').length));
      this.push(data, (salesQty));
      data = this.concatCmd(data, this.setFontSizeCmd(this.FONT_NORMAL));
      // data = this.concatCmd(data, this.addSpace(8 - (item.salesAmt + '').length));
      // this.push(data, (item.salesAmt + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      //取消加粗
      data = this.concatCmd(data, this.setFontBoldCmd(1));
    }
    else {
      let salesQty = item.currCrossoutNum || item.salesQty;
      name = '|_' + name;
      this.push(data, name);
      //加粗
      data = this.concatCmd(data, this.setFontBoldCmd(0));
      data = this.concatCmd(data, this.addSpace(30 - location - (salesQty + '').length));
      this.push(data, (salesQty + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
      //取消加粗
      data = this.concatCmd(data, this.setFontBoldCmd(1));
    }
    if (itemAttr && itemAttr.length > 0) {
      this.push(data, (itemAttr + ''));
      //换行
      data = this.concatCmd(data, this.addLineSeparator());
    }
    return data
  }


  strToBinary(str): any[] {
    var result: any = [];
    var list = str.split("");
    for (var i = 0; i < list.length; i++) {
      if (i != 0) {
        result.push(" ");
      }
      var item = list[i];
      var binaryStr = item.charCodeAt().toString(2);
      result.push(binaryStr);
    }
    return result.join("");
  }

  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }

  /**
   * gbk编码
   * @param {any[]} data
   * @param {string} text
   * @returns {any[]}
   */
  public addText(data: any[], text: string, x: number, y: number, font: string, zoomX: number = 1, zoomY: number = 1): any[] {
    let str = "TEXT " + x + "," + y + ",\"" + font + "\",0," + zoomX + ",\"+zoomY+\",\"" + text + "\"";
    let uint8array: Uint8Array = new TextEncoder('gbk', { NONSTANDARD_allowLegacyEncoding: true }).encode(str);

    uint8array.forEach(value => {
      data.push(value)
    });

    return data
  }

  /**
   * gbk编码
   * @param {any[]} data
   * @param {string} text
   * @returns {any[]}
   */
  public push(data: any[], text: string): any[] {
    let uint8array: Uint8Array = new TextEncoder('gbk', { NONSTANDARD_allowLegacyEncoding: true }).encode(text);

    uint8array.forEach(value => {
      data.push(value)
    });

    return data
  }

  /**
   *
   * @param {any[]} data
   * @param {any[]} cmd
   * @returns {any[]}
   */
  public concatCmd(data: any[], cmd: any[]): any[] {
    return data.concat(cmd)
  }
}
