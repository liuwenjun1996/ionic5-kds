import { Inject, Injectable } from '@angular/core';
import { DatePipe } from "@angular/common";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { Platform } from '@ionic/angular';
import { BLE } from '@ionic-native/ble';
import { IPrinterDevice, PrinterDevice } from '../domain/printerDevice';
import { APP_CONFIG, AppConfig } from '../app/app.config';
import { AppCache } from '../app/app.cache';
import { NativeProvider } from './native';
import { HttpProvider } from './http';
import { VersionUtil } from './util/VersionUtil';
import { UtilProvider } from './util/util';
import { PrintUtilProvider } from './util/PrintUtil';
import { linkType, BookType } from '../domain/enum';
import { IOrder, IOrderDetail } from '../domain/order';
import { PrinterDeviceDao } from '../dao/PrinterDeviceDao';



/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const win: any = window;
const SOCKET_PORT: string = '9100';

@Injectable({
  providedIn: 'root',
})
export class PrintProvider {
  public kichentPrinter: IPrinterDevice = PrinterDevice.toJson();
  public receiptPrinter: IPrinterDevice = PrinterDevice.toJson();
  public tablePrinter: IPrinterDevice = PrinterDevice.toJson();
  public imgPrinter: IPrinterDevice = PrinterDevice.toJson();
  public tagPrinter: IPrinterDevice = PrinterDevice.toJson();

  socketMap = [];
  kitchenCommodityType = new Map();
  kitchenPrinterMap = new Map();
  currAddress: string = "";
  constructor(public datePipe: DatePipe, @Inject(APP_CONFIG) private config: AppConfig, public appCache: AppCache,
    public printerDeviceDao: PrinterDeviceDao, public nativeProvider: NativeProvider, public platform: Platform,
    public httpProvider: HttpProvider, private versionUtil: VersionUtil, private util: UtilProvider, private printUtil: PrintUtilProvider) {
  }

  /**
   * 根据商品分类获取打印机Id
   * @param commodityTypeId
   * @returns {any}
   */
  getPrinterId(commodityTypeId) {
    let commodityType = this.kitchenCommodityType.get(commodityTypeId);
    if (commodityType) {
      return commodityType.kprinterId;
    } else {
      return null;
    }
  }

  getPrinter(printerId) {
    let printer = this.kitchenPrinterMap.get(printerId);
    if (printer) {
      return printer;
    } else {
      return null;
    }
  }

  /**
   * 过滤不需要厨房打印的商品
   * @param commodityList
   * @returns {any[]}
   */
  filterCommodity(commodityList) {
    let printMap = new Map();
    let k = 1;
    let total = 0;
    for (var i = 0; i < commodityList.length; i++) {
      let printerId = this.getPrinterId(commodityList[i].productTypeId);
      if (printerId) {
        total++;
      }
    }
    for (var i = 0; i < commodityList.length; i++) {
      let printerId = this.getPrinterId(commodityList[i].productTypeId);
      if (printerId) {
        let commoditys = printMap.get(printerId);
        if (!commoditys) {
          commoditys = [];
        }
        if (total > 1) {
          commodityList[i].index = " (" + k++ + "/" + total + ")";
        }
        commoditys.push(commodityList[i]);
        printMap.set(printerId, commoditys);
      }
    }
    return printMap;
  }

  /////////////////////////////////////////////////////////
  //////////////////////////////////////////////
  //wifi打印机是否连接
  public isWifiConnection(device: IPrinterDevice): Promise<any> {
    var me = this;
    return new Promise((resolve, reject) => {
      try {
        win.chrome.sockets.tcp.create((createInfo) => {
          me.socketMap[createInfo.socketId] = 0;
          me.callBackMethod(createInfo.socketId, resolve);
          win.chrome.sockets.tcp.setPaused(createInfo.socketId, false);
          win.chrome.sockets.tcp.connect(createInfo.socketId, device.address, SOCKET_PORT, result => {
            if (result === 0) {
              win.chrome.sockets.tcp.disconnect(createInfo.socketId);
              win.chrome.sockets.tcp.close(createInfo.socketId);
              resolve({ success: true });
            } else {
              reject({ success: false, msg: '打印机连接失败' });
            }
          });
        });
      } catch (err) {
        reject({ success: false, msg: err });
      }
    });
  }

  private doWriteReconnect(device, buf, printNum) {
    return new Promise((resolve, reject) => {
      try {
        BluetoothSerial.disconnect().then(success => {
          console.log("==========success==================");
          console.log(success)
          //连接蓝牙打印机
          BluetoothSerial.connectInsecure(device.address).subscribe(connectSuccess => {
            console.log(connectSuccess)
            this.currAddress = device.address;
            console.log(22)
            //打印
            BluetoothSerial.write(buf).then(success => {
              for (let i = 1; i < printNum; i++) {
                //打印
                BluetoothSerial.write(buf);
              }
              resolve({});
            }, failure => {
              this.nativeProvider.showShortCenter('打印失败');
              console.log(failure);
              reject({ errType: '2' });
            })
          }, fail => {
            console.log(44)
            console.log(fail)
            reject({ errType: '1' });
          })
        }, failure => {
          console.log(44)
          console.log(failure)
          reject({ errType: '1' });
        })
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });
  }

  private doWrite(device, buf, printNum) {
    return new Promise((resolve, reject) => {
      try {
        //连接蓝牙打印机
        BluetoothSerial.connectInsecure(device.address).subscribe(connectSuccess => {
          console.log(connectSuccess)
          this.currAddress = device.address;
          console.log(22)
          //打印
          BluetoothSerial.write(buf).then(success => {
            for (let i = 1; i < printNum; i++) {
              //打印
              BluetoothSerial.write(buf);
            }
            resolve({});
          }, failure => {
            this.nativeProvider.showShortCenter('打印机连接失败');
            console.log(failure);
            reject({ errType: '2' });
          })
        }, fail => {
          console.log(44)
          console.log(fail)
          reject({ errType: '1' });
        })
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });
  }
  private doBleWrite(device, buf, printNum) {
    return new Promise((resolve, reject) => {
      try {
        //连接蓝牙打印机
        BLE.connect(device.address).subscribe(connectSuccess => {
          console.log(connectSuccess);
          connectSuccess.characteristics.forEach(element => {
            if (element.properties.indexOf('Write')) {
              device.servicesId = element.service;
              device.characteristicId = element.characteristic;
              return;
            }
          });
          this.currAddress = device.address;
          console.log(22)
          //打印
          BLE.write(device.address, device.servicesId, device.characteristicId, buf).then(success => {
            for (let i = 1; i < printNum; i++) {
              //打印
              BLE.write(device.address, device.servicesId, device.characteristicId, buf);
            }
            resolve({});
          }, failure => {
            this.nativeProvider.showShortCenter('打印机连接失败');
            console.log(failure);
            reject({ errType: '2' });
          })
        }, fail => {
          console.log(44)
          console.log(fail)
          reject({ errType: '1' });
        })
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });
  }
  //bluetoothSerial 蓝牙打印机
  private connectAndWrite(buf: string | ArrayBuffer | Uint8Array, device: IPrinterDevice, printNum: number = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        BluetoothSerial.isConnected().then(data => {
          BluetoothSerial.write(buf).then(success => {
            for (let i = 1; i < printNum; i++) {
              //打印
              BluetoothSerial.write(buf);
            }
            resolve({});
          }, failure => {
            reject({ errType: '2' });
          })
        }, error => {
          console.log(2)
          this.doWrite(device, buf, printNum).then(res => {
            resolve({});
          }, err => {
            reject({ errType: '2' });
          })
        })
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });

  }
  private bleConnectAndWrite(bufList, device: IPrinterDevice, printNum: number = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        console.log('测试连接是否成功+=============================');
        console.log(device);
        BLE.isConnected(device.address).then(() => {
          console.log('connected')
          console.log('开始连接');
        }, (err) => {
          console.log(err);
          console.log('not connected');
        });

        BLE.connect(device.address).subscribe(data => {
          console.log('连接返回数据');
          console.log(data);
          for (let element of data.characteristics) {
            if (element.properties.indexOf('Write') > -1) {
              device.servicesId = element.service;
              device.characteristicId = element.characteristic;
              break;
            }
          }
          console.log(device);
          console.log(printNum);

          // let list = [];
          // for (let i = 0; i <= buf.byteLength / 20; i++) {
          //   // let num =0;
          //   list[i] = buf.slice(i * 20, (i + 1) * 20);
          // }
          for (let item of bufList) {
            BLE.write(device.address, device.servicesId, device.characteristicId, item).then(success => {
              console.log(success);
              console.log(' 进入打印方法+=============================1');
              for (let i = 1; i < printNum; i++) {
                //打印
                console.log('执行打印方法+=============================1');
                BLE.write(device.address, device.servicesId, device.characteristicId, item);
              }
              resolve({});
            }, failure => {
              reject({ errType: '2' });
              console.log(failure);
              console.log('writeWithoutResponse');
              // BLE.writeWithoutResponse(device.address, device.servicesId, device.characteristicId, buf);
            })
          }

        }, error => {
          console.log(2)
          // this.doBleWrite(device, item, printNum).then(res => {
          //   console.log(res)
          //   resolve({});
          // }, err => {
          //   reject({ errType: '2' });
          // })
        })

        // }
      } catch (err) {
        reject({ msg: err, errType: '2' });
        this.httpProvider.showToast('连接失败，请重试');
      }
    });

  }
  //bluetooth打印机是否连接
  public isBluetoothConnection(device: IPrinterDevice): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        BluetoothSerial.isConnected().then(data => {
          resolve({});
        }, error => {
          //连接蓝牙打印机
          BluetoothSerial.connectInsecure(device.address).subscribe(connectSuccess => {
            //alert(5)
            resolve({});
          }, (err) => {
            console.log(err)
            reject({ success: false, msg: err });
          });
        })
      } catch (err) {
        reject({ success: false, msg: err });
      }
    });
  }

  //断开蓝牙打印机连接
  closeBLSPrinter(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        BluetoothSerial.isConnected().then(data => {
          BluetoothSerial.disconnect().then(success => {
            this.currAddress = "";
            resolve();
          }, failure => {
            reject()
          })
        }, error => {
          resolve();
        })
      } catch (err) {
        reject()
      }
    });
  }

  //////////////////////////////////////////////////////////////
  //连接状态判断
  stockingReceiptPrint(topAndLeg, list, device: IPrinterDevice, dataType: string = '') {
    let loading = this.util.showLoading("正在打印...");
    this.stockingPrint(topAndLeg, list, device, 1, dataType).then(res => {
      this.util.hide(loading);
      setTimeout(res => {
        if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
          BluetoothSerial.disconnect();
        }
      }, 1000);
    }, err => {
      this.util.hide(loading);
      this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
      setTimeout(res => {
        if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
          BluetoothSerial.disconnect();
        }
      }, 1000);
    });
  }
  //盘点打印 58mm or 80mm
  stockingPrint(topAndLeg, list, device: IPrinterDevice, printNum: number = 1, dataType: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.versionUtil.isWindows()) {
          reject({ success: false });
          return;
        }

        if (!device || !device.address) {
          reject({ success: false });
          return
        }
        let data = [];
        let time = new Date();
        console.log('开始整理数据');

        /////
        if (this.platform.is('ios')) {
          if (dataType == 'sales') {//销售数据
            data = this.printUtil.salesBleData(topAndLeg, list, device);//stockingData中判断58还是80
          } else if (dataType == 'out') {//出品
            // data = this.printUtil.outSalesBleData(topAndLeg, list, device);//stockingData中判断58还是80
          } else {//盘点数据
            data = this.printUtil.stockingBleData(topAndLeg, list, device);//stockingData中判断58还是80
          }
          if (device.linkType == String(linkType.bluetooth)) {
            //走纸
            // data = this.concatCmd(data, this.setScrollCmd());
            // data[0] = this.printUtil.concatCmd(data[0], this.printUtil.addLineSeparator());
            // data[0] = this.printUtil.concatCmd(data[0], this.printUtil.addLineSeparator());
            // data[0] = this.printUtil.concatCmd(data[0], this.printUtil.addLineSeparator());
            // data[0] = this.printUtil.concatCmd(data[0], this.printUtil.addLineSeparator());
          } else if (device.linkType == String(linkType.wifi)) {
            //换行
            data[0] = this.printUtil.concatCmd(data[0], this.printUtil.addLineSeparator());
            //切纸
            data[0] = this.printUtil.concatCmd(data[0], this.printUtil.setCutPaperCmd());
          }
          console.log('盘点——————————————————————————————————————————————————————————————————————————————————');
          console.log(data);
          console.log('盘点——————————————————————————————————————————————————————————————————————————————————');
          //打印
          let bufList:any = [];
          for (let item of data) {
            let buf = new ArrayBuffer(item.length);
            let bufView = new Uint8Array(buf);
            for (let i = 0, length = item.length; i < length; i++) {
              bufView[i] = item[i];
            }
            bufList.push(buf);
          }
          if (device.linkType == String(linkType.bluetooth)) {
            this.connectAndWrite(bufList, device, printNum).then(res => {
              resolve({});
            }, err => {
              reject({ errType: err.errType });
            })
          } else if (device.linkType == String(linkType.wifi)) {
            this.connectAndSend(bufList, device, printNum).then(res => {
              resolve({});
            }, err => {
              reject({ errType: err.errType });
            })
          } else {
            reject({});
          }
        }
        else {
          if (dataType == 'out') {
            data = this.printUtil.outSalesData(topAndLeg, list, device);//stockingData中判断58还是80
          } else {//盘点数据
            data = this.printUtil.stockingData(topAndLeg, list, device);//stockingData中判断58还是80
          }

          if (device.linkType == String(linkType.bluetooth)) {
            //走纸
            // data = this.concatCmd(data, this.setScrollCmd());
            data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
            data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
            data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
            data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
          } else if (device.linkType == String(linkType.wifi)) {
            //换行
            data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
            //切纸
            data = this.printUtil.concatCmd(data, this.printUtil.setCutPaperCmd());
          }
          console.log('盘点——————————————————————————————————————————————————————————————————————————————————');
          console.log(data);
          console.log('盘点——————————————————————————————————————————————————————————————————————————————————');
          //打印
          let buf = new ArrayBuffer(data.length);
          let bufView = new Uint8Array(buf);
          for (let i = 0, length = data.length; i < length; i++) {
            bufView[i] = data[i];
          }
          if (device.linkType == String(linkType.bluetooth)) {
            if (this.platform.is('ios')) {
              this.connectAndWrite(buf, device, printNum).then(res => {
                resolve({});
              }, err => {
                reject({ errType: err.errType });
              })
            } else {
              this.connectAndWrite(buf, device, printNum).then(res => {
                resolve({});
              }, err => {
                reject({ errType: err.errType });
              })
            }
          } else if (device.linkType == String(linkType.wifi)) {
            this.connectAndSend(buf, device, printNum).then(res => {
              resolve({});
            }, err => {
              reject({ errType: err.errType });
            })
          } else {
            reject({});
          }
        }


      } catch (err) {
        reject({ msg: err, errType: "2" });
      }
    });

  }


  //盘点测试打印  蓝牙
  testReceiptPrint(device: IPrinterDevice) {
    let loading = this.util.showLoading("正在打印...");
    let time: Date = new Date();
    let stkNo = "PD" + time.getTime();
    let topAndLeg = {
      time: time,
      user: '测试人员',
      normalNum: 3,
      unNormalNum: 1,
      stkNo: stkNo,
    }
    let list = [
      { itemName: '脉动', stockQty: 100.00, stkQty: 100.00, },
      { itemName: '泡椒鸡爪150g（特辣）', stockQty: 999.99, stkQty: 999.99, },
      { itemName: '泡椒鸡爪150g（微辣）', stockQty: 99999.00, stkQty: 99999.00, },
      { itemName: '牙膏', stockQty: 80.00, stkQty: 100.00, }
    ]

    console.log(list);
    this.stockingPrint(topAndLeg, list, device).then(res => {
      this.util.hide(loading);
      setTimeout(res => {

        if (this.platform.is('ios')) {
          if (device.linkType == String(linkType.bluetooth) && BLE.isConnected(device.address)) {
            // BLE.connect(device.address);
            BLE.disconnect(device.address);
            console.log(list);
            console.log('连接成功 啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦');
          } else {
            BLE.disconnect(device.address);
          }
        } else {
          if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
            // BluetoothSerial.connect(device.address);
            BluetoothSerial.disconnect();
            console.log(list);
            console.log('连接成功 啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦');
          } else {
            BluetoothSerial.disconnect();
          }
        }


      }, 1000);
    }, err => {
      this.util.hide(loading);
      this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
      setTimeout(res => {
        if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
          if (this.platform.is('ios')) {
            BLE.connect(device.address);
          } else {
            BluetoothSerial.disconnect();
          }
        }
      }, 1000);
    });
  }

  ///////////////////////////////////////////////////



  //   /**
  //    * 小票打印
  //    * @param {ISeller} seller
  //    * @param {IOrderDetail[]} list
  //    */
  receiptPrint(ename: string, order: IOrder, device: IPrinterDevice, printNum: number = 1, pre: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.platform.is('cordova')) {
          reject({ success: false });
          return;
        }

        if (!device || !device.address) {
          reject({ success: false });
          return
        }

        let data = [];
        if (order.sourceType != null) {
          if (order.sourceType == "0") {
            //   data = this.printUtil.createReceiptShouKuangData(ename, order, device);
            // } else if (order.sourceType == "1") {
            //   data = this.printUtil.createReceiptKaiDianData(ename, order, device);
            // } else if (order.sourceType == "2") {
            //   data = this.printUtil.createReceiptWaimaiData(ename, order, device);
            // } else if (order.sourceType == "3") {
            //   data = this.printUtil.createReceiptZuoTaiData(ename, order, device);
            // } else if (order.sourceType == "4") {
            //   data = this.printUtil.createReceiptShouKuangData(ename, order, device);
            // } else if (order.sourceType == "5") {
            //   data = this.printUtil.createReceiptShouKuangData(ename, order, device);
            // } else if (order.sourceType == "6") {
            //   data = this.printUtil.createReceiptWaimaiData(ename, order, device);
            // } else if (order.sourceType == "7") {
            //   data = this.printUtil.createReceiptKaiDianData(ename, order, device, pre);
          }
          else if (!order.sourceType) {
            data = this.printUtil.stockingData('', {}, device);
          }
        } else if (order.bookType != null) {
          if (order.bookType == String(BookType.zhuotai)) {
            // data = this.printUtil.createReceiptZuoTaiData(ename, order, device);
          } else {
            // data = this.printUtil.createReceiptWaimaiData(ename, order, device);
          }
        }

        if (device.linkType == String(linkType.bluetooth)) {
          //走纸
          // data = this.concatCmd(data, this.setScrollCmd());
          data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
          data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
          data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
          data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
        } else if (device.linkType == String(linkType.wifi)) {
          //换行
          data = this.printUtil.concatCmd(data, this.printUtil.addLineSeparator());
          //切纸
          data = this.printUtil.concatCmd(data, this.printUtil.setCutPaperCmd());
        }
        console.log('测试——————————————————————————————————————————————————————————————————————————————————');
        console.log(data);
        console.log('测试——————————————————————————————————————————————————————————————————————————————————');
        //打印
        let buf = new ArrayBuffer(data.length);
        let bufView = new Uint8Array(buf);
        for (let i = 0, length = data.length; i < length; i++) {
          bufView[i] = data[i];
        }

        if (device.linkType == String(linkType.bluetooth)) {
          this.connectAndWrite(buf, device, printNum).then(res => {
            resolve({});
          }, err => {
            reject({ errType: err.errType });
          })
        } else if (device.linkType == String(linkType.wifi)) {
          this.connectAndSend(buf, device, printNum).then(res => {
            resolve({});
          }, err => {
            reject({ errType: err.errType });
          })
        } else {
          reject({});
        }
      } catch (err) {
        reject({ msg: err, errType: "2" });
      }
    });

  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




































  checkKichentPrinter(printMap) {
    let me = this;
    let aInterval = null;
    return new Promise((resolve, reject) => {
      try {
        if (!printMap) {
          resolve();
          return;
        }
        let totalSize = printMap.size;
        let successCount = 0;
        var index = 1;
        if (totalSize == 0) {
          resolve();
          return;
        }
        printMap.forEach(function (value, printerId, map) {
          let pdivice = me.getPrinter(printerId);
          if (pdivice) {
            console.log(pdivice);
            me.isPrinterConnection(pdivice).then(res => {
              successCount++;
              console.log(pdivice.address);
              pdivice.connectStatus = true;
              me.kitchenPrinterMap.set(printerId, pdivice);
            }, err => {
              pdivice.connectStatus = false;
              me.kitchenPrinterMap.set(printerId, pdivice);
              if (aInterval) {
                clearInterval(aInterval);
                reject({});
              }
            })
          }
        });
        aInterval = setInterval(function () {
          if (successCount >= totalSize) {
            clearInterval(aInterval);
            resolve();
            return;
          } else {
            if (index > 75) {
              clearInterval(aInterval);
              reject({});
              return;
            }
          }
          index++;
        }, 200);
      } catch (err) {
        reject({});
      }
    });
  }

  /**
   * 0全部未连接，1部分连接，2全部连接
   * @returns {number}
   */
  getKichentStatus() {
    let count = 0;
    if (this.kitchenPrinterMap.size > 0) {
      this.kitchenPrinterMap.forEach(function (value, printerId, map) {
        if (value.connectStatus) {
          count += 1;
        }
      });
      if (this.kitchenPrinterMap.size == count) {
        return 2;
      } else {
        if (count > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  // 执行回调
  callBackMethod(socketId, callBack) {
    var me = this;
    var index = 1;
    var aInterval = setInterval(function () {
      try {
        var vl = me.socketMap[socketId];
        if (vl == 1) {
          callBack({ success: false });
          clearInterval(aInterval);
          return;
        }
        if (vl != 0) {
          delete me.socketMap[socketId];
          clearInterval(aInterval);
          return;
        }
        if (index >= 75) {
          console.log('index >= 150');
          delete me.socketMap[socketId];
          clearInterval(aInterval);
          if (vl == 0) {
            callBack({ success: false });
          }
        } else {
          index += 1;
        }
      } catch (err) {

      }
    }, 200);
  }

  addReceiveListeners() {
    win.chrome.sockets.tcp.onReceiveError.addListener((info) => {
      console.log('Client RecvError on socket: ' + info.socketId);
      console.log(info);
      //win.chrome.sockets.tcp.disconnect(info.socketId);
      //win.chrome.sockets.tcp.close(info.socketId);
      for (let socketId in this.socketMap) {
        this.socketMap[socketId] = 1;
      }
    });

    win.chrome.sockets.tcp.onReceive.addListener((info) => {
      console.log('Client Recv: success');
      console.log(info);
      if (info.data) {
        let message = String.fromCharCode.apply(null, new Uint8Array(info.data));
        console.log(message);
      }
      win.chrome.sockets.tcp.disconnect(info.socketId);
      win.chrome.sockets.tcp.close(info.socketId);

      if (info.uri) {
        win.resolveLocalFileSystemURL(info.uri, function (fe) {
          fe.file(function (file) {
            let reader = new FileReader();
            reader.onloadend = function (e) {
              console.log('Onload End');
              console.log(e);
              console.log('result is ' + this.result);
            };

            reader.readAsText(file);
          });
        }, console.log);
      }
    });
  }

  //socket
  private connectAndSend(data, device: IPrinterDevice, printNum: number = 1): Promise<any> {
    var me = this;
    return new Promise((resolve, reject) => {
      try {
        win.chrome.sockets.tcp.create((createInfo) => {
          me.socketMap[createInfo.socketId] = 0;
          me.callBackMethod(createInfo.socketId, resolve);
          win.chrome.sockets.tcp.setPaused(createInfo.socketId, false);
          win.chrome.sockets.tcp.connect(createInfo.socketId, device.address, SOCKET_PORT, result1 => {
            if (result1 === 0) {
              win.chrome.sockets.tcp.send(createInfo.socketId, data, result2 => {
                if (printNum == 1) {
                  win.chrome.sockets.tcp.disconnect(createInfo.socketId);
                  win.chrome.sockets.tcp.close(createInfo.socketId);
                } else {
                  for (let i = 1; i < printNum; i++) {
                    win.chrome.sockets.tcp.send(createInfo.socketId, data, result3 => {
                      if (i >= (printNum - 1)) {
                        win.chrome.sockets.tcp.disconnect(createInfo.socketId);
                        win.chrome.sockets.tcp.close(createInfo.socketId);
                      }
                    });
                  }
                }
                if (result2.resultCode === 0) {
                  console.log('connectAndSend: success');
                  delete me.socketMap[createInfo.socketId];
                  resolve({ success: true });
                } else {
                  delete me.socketMap[createInfo.socketId];
                  reject({ errType: '2' });
                }
              });
            } else {
              this.nativeProvider.showShortCenter('打印机连接失败');
              delete me.socketMap[createInfo.socketId];
              reject({ errType: '1', msg: '打印机连接失败' });
            }
          });
        });
      } catch (err) {
        reject({ errType: '2', msg: err });
      }
    });
  }


  private sendBySocketId(data, socketId, printNum: number = 1): Promise<any> {
    var me = this;
    return new Promise((resolve, reject) => {
      try {
        win.chrome.sockets.tcp.send(socketId, data, result2 => {
          for (let i = 1; i < printNum; i++) {
            win.chrome.sockets.tcp.send(socketId, data, result3 => {

            });
          }
          if (result2.resultCode === 0) {
            resolve({ success: true });
          } else {
            reject({ errType: '2' });
          }
        });
      } catch (err) {
        reject({ errType: '2', msg: err });
      }
    });
  }
  private getConnection(device: IPrinterDevice): Promise<any> {
    var me = this;
    return new Promise((resolve, reject) => {
      try {
        win.chrome.sockets.tcp.create((createInfo) => {
          me.socketMap[createInfo.socketId] = 0;
          me.callBackMethod(createInfo.socketId, resolve);
          win.chrome.sockets.tcp.setPaused(createInfo.socketId, false);
          win.chrome.sockets.tcp.connect(createInfo.socketId, device.address, SOCKET_PORT, result1 => {
            if (result1 === 0) {
              resolve({ socketId: createInfo.socketId });
            } else {
              reject({ errType: '1', msg: '打印机连接失败' });
            }
          });
        });
      } catch (err) {
        reject({ errType: '2', msg: err });
      }
    });
  }

  //   /**
  //    * 厨房打印
  //    * @param {string} seqNum 流水
  //    * @param {string} remark 备注
  //    * @param {any[]} list  菜品清单
  //    */
  //   kitchenPrint(order, printNum: number = 1, device?: IPrinterDevice): Promise<any> {
  //     var me = this;
  //     return new Promise((resolve, reject) => {
  //       // try {
  //       //   console.log("=============================order=================================");
  //       //   console.log(order);
  //       //   if (device) {
  //       //     me.kitchenPrintByDevice(order, order.detailList, device, printNum).then(res => {
  //       //       resolve();
  //       //     }, err => {
  //       //       reject({});
  //       //     })
  //       //   } else {
  //       //     let printMap = this.filterCommodity(order.detailList);
  //       //     var index = 1;
  //       //     let totalSize = printMap.size;
  //       //     let aInterval = null;
  //       //     let successCount = 0;
  //       //     printMap.forEach(function (value, printerId, map) {
  //       //       let pdivice = me.getPrinter(printerId);
  //       //       if (pdivice) {
  //       //         me.kitchenPrintByDevice(order, value, pdivice, printNum).then(res => {
  //       //           successCount++;
  //       //         }, err => {
  //       //           if (aInterval) {
  //       //             clearInterval(aInterval);
  //       //             aInterval = null;
  //       //           }
  //       //           reject({});
  //       //         })
  //       //       }
  //       //     });
  //       //     aInterval = setInterval(function () {
  //       //       if (successCount >= totalSize) {
  //       //         clearInterval(aInterval);
  //       //         aInterval = null;
  //       //         resolve();
  //       //         return;
  //       //       } else {
  //       //         if (index > 100) {
  //       //           clearInterval(aInterval);
  //       //           aInterval = null;
  //       //           reject({});
  //       //           return;
  //       //         }
  //       //       }
  //       //       index++;
  //       //     }, 200);
  //       //   }
  //       // } catch (err) {
  //       //   reject({msg: err, errType: '2'});
  //       // }
  //     });

  //   }

  //   /**
  //    * 厨房打印
  //    * @param {string} seqNum 流水
  //    * @param {string} remark 备注
  //    * @param {any[]} list  菜品清单
  //    */
  //   kitchenPrintByDevice(order, list: IOrderDetail[], device: IPrinterDevice, printNum: number = 1): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //       // try {
  //       //   if (device.address == null) {
  //       //     reject({errType: '1'});
  //       //     return
  //       //   }
  //       //   let data = [];
  //       //   //初始化打印机, 清除打印缓冲区数据
  //       //  // data = this.printUtil.concatCmd(data, this.printUtil.initPrinter());

  //       //   if (device.printerModel === this.config.PRINTER_MODEL_SPLIT) { //拆分单
  //       //     data = this.printUtil.splitPrint(order, list)
  //       //   } else if (device.printerModel === this.config.PRINTER_MODEL_MERGE) { //合并
  //       //     data = this.printUtil.mergePrint(order, list)
  //       //   }

  //       //   //打印
  //       //   let buf = new ArrayBuffer(data.length);
  //       //   let bufView = new Uint8Array(buf);
  //       //   for (let i = 0, length = data.length; i < length; i++) {
  //       //     bufView[i] = data[i];
  //       //   }

  //       //   console.log(device)
  //       //   if (device.linkType == String(linkType.bluetooth)) {
  //       //     this.connectAndWrite(buf, device, printNum).then(res => {
  //       //       resolve({});
  //       //     }, err => {
  //       //       reject({errType: err.errType});
  //       //     })
  //       //   } else if (device.linkType == String(linkType.wifi)) {
  //       //     this.connectAndSend(buf, device, printNum).then(res => {
  //       //       if (res.success) {
  //       //         resolve({});
  //       //       } else {
  //       //         reject({errType: res.errType});
  //       //       }
  //       //     });
  //       //   } else {
  //       //     reject({});
  //       //   }

  //       // } catch (err) {
  //       //   reject({msg: err, errType: '2'});
  //       // }
  //     });

  //   }

  //   /**
  //    * 标签打印
  //    * @param {string} seqNum 流水
  //    * @param {string} remark 备注
  //    * @param {any[]} list  菜品清单
  //    */
  tagAllPrint(ename: string, order, list: IOrderDetail[], device: IPrinterDevice, printNum: number = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (device.address == null) {
          reject({ errType: '1' });
          return
        }
        console.log(device)
        var index = 1;
        let aInterval = null;
        let successCount = 0;
        if (device.linkType == String(linkType.wifi)) {
          this.getConnection(device).then(res => {
            let socketId = res.socketId;
            for (let i = 0, length = list.length; i < length; i++) {
              this.tagPrint(ename, order, list[i], device, socketId).then(res => {
                successCount++;
              }, err => {
                if (aInterval) {
                  win.chrome.sockets.tcp.disconnect(socketId);
                  win.chrome.sockets.tcp.close(socketId);
                  clearInterval(aInterval);
                  aInterval = null;
                }
                reject({});
              })
            }
            aInterval = setInterval(function () {
              if (successCount >= list.length) {
                win.chrome.sockets.tcp.disconnect(socketId);
                win.chrome.sockets.tcp.close(socketId);
                clearInterval(aInterval);
                aInterval = null;
                resolve();
                return;
              } else {
                if (index > 100) {
                  win.chrome.sockets.tcp.disconnect(socketId);
                  win.chrome.sockets.tcp.close(socketId);
                  clearInterval(aInterval);
                  aInterval = null;
                  reject({});
                  return;
                }
              }
              index++;
            }, 200);
          }, err => {
            reject({});
          })
        } else {
          for (let i = 0, length = list.length; i < length; i++) {
            this.tagPrint(ename, order, list[i], device).then(res => {
              successCount++;
            }, err => {
              if (aInterval) {
                clearInterval(aInterval);
                aInterval = null;
              }
              reject({});
            })
          }
          aInterval = setInterval(function () {
            if (successCount >= list.length) {
              clearInterval(aInterval);
              aInterval = null;
              resolve();
              return;
            } else {
              if (index > 100) {
                clearInterval(aInterval);
                aInterval = null;
                reject({});
                return;
              }
            }
            index++;
          }, 200);
        }
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });

  }

  //   /**
  //    * 标签打印
  //    * @param {string} seqNum 流水
  //    * @param {string} remark 备注
  //    * @param {any[]} list  菜品清单
  //    */
  tagPrint(ename: string, order, orderDetail: IOrderDetail, device: IPrinterDevice, socketId?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        var index = 1;
        let aInterval = null;
        let successCount = 0;
        for (let i = 0, length = orderDetail.sellNum; i < length; i++) {
          let index = "(" + (i + 1) + "/" + length + ")";
          if (length == 1) {
            index = "";
          }
          this.tagPrintDetail(ename, order, orderDetail, device, index, socketId).then(res => {
            successCount++;
          }, err => {
            if (aInterval) {
              clearInterval(aInterval);
              aInterval = null;
            }
            reject({});
          })
        }
        aInterval = setInterval(function () {
          if (successCount >= orderDetail.sellNum) {
            clearInterval(aInterval);
            aInterval = null;
            resolve();
            return;
          } else {
            if (index > 30) {
              clearInterval(aInterval);
              aInterval = null;
              reject({});
              return;
            }
          }
          index++;
        }, 200);
      } catch (err) {
        reject({ msg: err, errType: '2' });
      }
    });

  }
  //   /**
  //    * 标签打印
  //    * @param {string} seqNum 流水
  //    * @param {string} remark 备注
  //    * @param {any[]} list  菜品清单
  //    */
  tagPrintDetail(ename: string, order, orderDetail: IOrderDetail, device: IPrinterDevice, index: string, socketId?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // try {
      //   let data = [];
      //   data=this.printUtil.tagPrint(ename,order,orderDetail,device,index);
      //   //console.log(data)
      //   //打印
      //   let buf = new ArrayBuffer(data.length);
      //   let bufView = new Uint8Array(buf);
      //   for (let i = 0, length = data.length; i < length; i++) {
      //     bufView[i] = data[i];
      //   }
      //   //console.log(device)
      //   if (device.linkType == String(linkType.bluetooth)) {
      //     this.connectAndWrite(buf, device, 1).then(res => {
      //       resolve({});
      //     }, err => {
      //       reject({errType: err.errType});
      //     })
      //   } else if (device.linkType == String(linkType.wifi)) {
      //     if(socketId){
      //       this.sendBySocketId(buf, socketId, 1);
      //     }else{
      //       this.connectAndSend(buf, device, 1).then(res => {
      //         if (res.success) {
      //           resolve({});
      //         } else {
      //           reject({errType: res.errType});
      //         }
      //       });
      //     }
      //   } else {
      //     reject({});
      //   }
      // } catch (err) {
      //   reject({msg: err, errType: '2'});
      // }
    });

  }


  //   //判断打印机是否可连接
  isPrinterConnection(printer) {
    return new Promise((resolve, reject) => {
      try {
        if (!printer || !printer.address) {
          reject();
          return;
        }
        if (printer.linkType == String(linkType.bluetooth)) {
          this.isBluetoothConnection(printer).then(
            (res) => {
              resolve();
            }, err => {
              reject();
            }
          )
        } else if (printer.linkType == String(linkType.wifi)) {
          this.isWifiConnection(printer).then(
            (res) => {
              if (res.success) {
                resolve();
              } else {
                reject();
              }
            }, err => {
              reject();
            }
          )
        }
      } catch (err) {
        reject({ msg: err });
      }
    });
  }

  testKitchPrint(device: IPrinterDevice) {
    let loading = this.util.showLoading("正在打印...");
    let order = {
      todayXh: 8,
      detailList: [
        {
          "id": "OD100572018020114425340320632",
          "sellNum": 2,
          "sellPrice": 3,
          "discountAmount": null,
          "totalAmount": 3,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011015535516275933759",
          "productName": "大蒜",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '公斤'
        },
        {
          "id": "OD100572018020618472119743352",
          "sellNum": 3,
          "sellPrice": 12,
          "discountAmount": null,
          "totalAmount": 24,
          "orderId": "O10057201802061847211979951",
          "productId": "P100572018011015301490589974568",
          "productName": "菠菜",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": "蓝色 21英寸 蓝色 21英寸 蓝色 21英寸 ",
          "outBoxPrice": "0.0",
          "skuId": "PS1005720180110153014920799465",
          "unitName": "份"
        },
        {
          "id": "OD100572018020114425340320632",
          "sellNum": 1,
          "sellPrice": 3,
          "discountAmount": null,
          "totalAmount": 3,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011015535516275933759",
          "productName": "香菜",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '公斤'
        },
        {
          "id": "OD100572018020114425340322692",
          "sellNum": 2,
          "sellPrice": 11,
          "discountAmount": null,
          "totalAmount": 22,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011017193821613135677",
          "productName": "红烧红薯",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        },
        {
          "id": "OD100572018020114425340367877",
          "sellNum": 2,
          "sellPrice": 13,
          "discountAmount": null,
          "totalAmount": 26,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011119103606650512999",
          "productName": "鸡腿肉新年大)旺礼盒餐",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": "银色$ 英寸字节 加热 3加冰 32热",
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        },
        {
          "id": "OD100572018020114425340367877",
          "sellNum": 2,
          "sellPrice": 13,
          "discountAmount": null,
          "totalAmount": 26,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011119103606650512999",
          "productName": "墨鱼菌菇养生汤",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        },
        {
          "id": "OD100572018020114425340367877",
          "sellNum": 2,
          "sellPrice": 13,
          "discountAmount": null,
          "totalAmount": 26,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011119103606650512999",
          "productName": "墨鱼菌菇养生汤",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": '银色$ 英寸字节 加热 加冰',
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        }
      ]
    };
    // let buf = this.kitchenPrint(order, 1, device).then(res => {
    //   this.util.hide(loading);
    // }, err => {
    //   this.util.hide(loading);
    //   this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
    // });

    // this.connectAndSend(buf, device);
  }


  /////////////////////////////////////////////////////////
  testTagPrint(device: IPrinterDevice) {
    let loading = this.util.showLoading("正在打印...");
    let order = {
      "id": "O100572018012615012663570217",
      "sellAmount": 85,
      "sellNum": 6,
      "productAmount": 73,
      "outBoxAmount": 0,
      "discountAmount": null,
      "sellerId": "10057",
      "sendDate": null,
      "isNewCustomer": 1,
      "customerId": "10426",
      "numberMeals": null,
      "submitType": "1",
      "isReturn": null,
      "name": "周女士",
      "address": "广东省广州市天河区科韵路24/26",
      "mobile": "13680838362",
      "createTime": 1516950086000,
      "endTime": 1516950257000,
      "status": "2",
      "sendType": "1",
      "remark": "微辣",
      "sendAmount": 12,
      "takeAddress": null,
      "payType": "支付宝支付",
      "payTypeName": "支付宝支付",
      "reason": null,
      "parentSellerId": null,
      "isPush": null,
      "bookType": "1",
      "placeId": null,
      "placeName": null,
      "userOpenid": "onFX40O-orZ_mm0CnEaN9_etJZIo",
      "isPayPush": null,
      "teaPrice": null,
      "teaAmount": null,
      "courierName": null,
      "courierPhone": null,
      "distance": 415,
      "statusName": null,
      "isComment": null,
      "isOpt": null,
      "payTime": null,
      "orderTakeTime": null,
      "payStatus": "0",
      "detailList": [
        {
          "id": "OD100572018012615012663574002",
          "sellNum": 1,
          "sellPrice": 12,
          "discountAmount": null,
          "totalAmount": 24,
          "orderId": "O100572018012615012663570217",
          "productId": "P100572018011210553017367588989",
          "productName": "牙膏",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": "红色 21英寸",
          "outBoxPrice": "0.0",
          "skuId": "PS100572018011210570450749474338",
          "unitName": "份"
        },
        {
          "id": "OD100572018012615012665045984",
          "sellNum": 1,
          "sellPrice": 2300,
          "discountAmount": null,
          "totalAmount": 13,
          "orderId": "O100572018012615012663570217",
          "productId": "P100572018011119103606650512999",
          "productName": "大蒜",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": "份"
        },
        {
          "id": "OD10057201801261501266509592",
          "sellNum": 1,
          "sellPrice": 12,
          "discountAmount": null,
          "totalAmount": 12,
          "orderId": "O100572018012615012663570217",
          "productId": "P100572018011210553017367588989",
          "productName": "墨鱼菌菇养生汤",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": "银色$ 英寸字节",
          "outBoxPrice": "0.0",
          "skuId": "PS100572018011210570452362004924",
          "unitName": "份"
        }, {
          "id": "OD100572018020114425340367877",
          "sellNum": 2,
          "sellPrice": 13,
          "discountAmount": null,
          "totalAmount": 26,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011119103606650512999",
          "productName": "水鱼养生汤",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "0",
          "skuName": null,
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        }/*,
        {
          "id": "OD100572018020114425340367877",
          "sellNum": 2,
          "sellPrice": 13,
          "discountAmount": null,
          "totalAmount": 26,
          "orderId": "O100572018020114425340381863",
          "productId": "P100572018011119103606650512999",
          "productName": "烧鹅",
          "parentSellerId": "1",
          "openId": "onFX40O-orZ_mm0CnEaN9_etJZIo",
          "isSku": "1",
          "skuName": '银色$ 英寸字节 加热 加冰',
          "outBoxPrice": "0.0",
          "skuId": null,
          "unitName": '例'
        }*/
      ],
      "customerOrderNum": 0,
      "todayXh": "8",
      sourceType: '2',
      "totalAmount": 85
    };

    if (device.linkType == String(linkType.bluetooth)) {
      this.isBluetoothConnection(device).then(res => {
        this.tagAllPrint('爱喝汤', order, order.detailList, device).then(res => {
          this.util.hide(loading);
          setTimeout(res => {
            if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
              BluetoothSerial.disconnect();
            }
          }, 1000);
        }, err => {
          this.util.hide(loading);
          this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
          setTimeout(res => {
            if (device.linkType == String(linkType.bluetooth) && BluetoothSerial.isConnected()) {
              BluetoothSerial.disconnect();
            }
          }, 1000);
        });
      }, err => {
        this.util.hide(loading);
        this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
      })
    } else {
      this.isWifiConnection(device).then(res => {
        this.tagAllPrint('爱喝汤', order, order.detailList, device).then(res => {
          this.util.hide(loading);
        }, err => {
          this.util.hide(loading);
          this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
        });
      }, err => {
        this.util.hide(loading);
        this.nativeProvider.showShortCenter('打印机连接失败，请检查!');
      })
    }

  }
}
