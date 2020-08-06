import { Injectable } from '@angular/core';
import { AppShopping } from '../../app/app.shopping';
import { UtilProvider } from './util';
import { AppCache } from '../../app/app.cache';
import { isNumber } from 'util';
import { NativeProvider } from '../native';
import { EventsProvider } from '../Events';
// import { Events } from 'ng-events';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class ShoppingUtilProvider {
  alert: any;
  configuration = this.appCache.Configuration;
  salesDetailPageSize = 24;
  outSalesDetailPageSize = 24;
  salesTablePageSize = 6;
  constructor(
    public appShopping: AppShopping,
    public util: UtilProvider,
    public appCache: AppCache,
    public nativeProvider: NativeProvider,
    public events: EventsProvider,
  ) {
  }
  /**
  * 组装原始商品相关数据
  */
  assignmentData(retData) {
    let me = this;
    // 赋值数据
    // 商品SPU数据
    if (retData.data.pos_item_spu) {
      me.appShopping.comSpuList = retData.data.pos_item_spu; // 
      // this.events.publish('spu:refresh');
    }
    // 商品SKU数据
    if (retData.data.pos_item_sku) {
      me.appShopping.comSkuList = retData.data.pos_item_sku;
      // this.events.publish('spu:refresh');
    }
    // 商品分类数据
    if (retData.data.pos_category) {
      me.appShopping.categoryList = null;
      me.appShopping.categoryList = retData.data.pos_category;
      // this.orderData(me.appShopping.categoryList);
    }


    // 餐台表数据
    if (retData.data.pos_store_table) {
      me.appShopping.tableList = [];
      me.appShopping.tableList = retData.data.pos_store_table;
      // me.selectTableOnTable();
      // this.events.publish('table:refresh');
    }
    // 餐桌销售数据
    if (retData.data.pos_salestable) {
      me.appShopping.salesTableList = [];
      me.appShopping.salesTableList = retData.data.pos_salestable;
      //初始化table
      // me.selectTableOnTable();
      // this.events.publish('table:refresh');
    }
    // 餐台区域数据
    if (retData.data.pos_store_area) {
      me.appShopping.areaList = [];
      me.appShopping.areaList = retData.data.pos_store_area;
      // this.orderData(me.appShopping.areaList);
      // this.events.publish('area:refresh');
    }
    // this.appShopping.salesDetailList=Salesdetails;
    // this.getShowData();
    return true;
  }
  /**
   * 收银端推送数据过来了
   * @param data 
   */
  updateOrAddLocalData(data) {
    console.log('推送数据过来', data);

    let oList = this.appShopping.salesDetailList;
    let oTableList = this.appShopping.salesTableList;
    if (data.pos_salesdetail && data.pos_salesdetail.length > 0) {
      let list = data.pos_salesdetail;
      list.forEach(newItem => {
        let flag = true;
        oList.forEach((oldItem, index) => {
          if (oldItem.id == newItem.id) {
            oList[index] = newItem;
            flag = false;
          }
        })
        if (flag) {
          oList.push(newItem);
        }
      });

    }
    if (data.pos_salesTable && data.pos_salesTable.length > 0) {
      let list = data.pos_salesTable;
      list.forEach(newItem => {
        let flag = true;
        oTableList.forEach((oldItem, index) => {
          if (oldItem.id == newItem.id) {
            oTableList[index] = newItem;
            flag = false;
          }
        })
        if (flag) {
          oTableList.push(newItem);
        }
      });
    }

    if (data.optSalesTable && data.optSalesTable.length > 0) {
      let list = data.optSalesTable;
      // debugger
      list.forEach(newItem => {
        let flag = true;
        oTableList.forEach((oldItem, index) => {
          if (oldItem.id == newItem.id || oldItem.salesId == newItem.salesId) {
            oTableList[index] = newItem;
            flag = false;
          }
        })
        if (flag) {
          oTableList.push(newItem);
        }
      });
    }

    this.getShowData();
    if (this.appCache.Configuration.NEW_GET_FOOT_NOT) {
      this.nativeProvider.msgNewOrder();
    }

  }

  /* 出品页面更新SalesDetail */
  updateLocalSalesDetail(list) {
    let oList = this.appShopping.salesDetailList;
    // console.log('list',list)
    // debugger
    oList.forEach((oItem, index) => {
      list.forEach(element => {
        if (element.id == oItem.id) {
          console.log('oList', oList[index])
          oList[index] = element;
        }
      });
    })
    this.getShowData();
    // console.log('oListoList', oList);

  }
  /* 退菜页面更新数据 */
  updateLocalSalesDetailFood(list) {
    let oList = this.appShopping.salesDetailList

  }

  assignmentSalesData(retData) {
    let me = this;
    me.appShopping.salesTableList = [];
    me.appShopping.salesDetailList = [];
    // 餐桌销售数据
    if (retData.data.pos_salesTable) {
      me.appShopping.salesTableList = retData.data.pos_salesTable || [];
    }
    // 餐桌销售数据
    if (retData.data.pos_salesdetail) {
      me.appShopping.salesDetailList = retData.data.pos_salesdetail || [];
    }
    this.getShowData();
  }


  /* 获取根据单号salesNo，菜品名itemName，桌台号tableName进行筛选获取退单页面的列表 value=0按单号查询 value=1按桌号查询 value=2按菜品名查询 */
  getRetreatFoodList(list, value: any) {
    console.log('value', value)
    var noShowCategoryMap = this.appCache.Configuration.DW_CATEGORY_ISSHOW_MAP ? JSON.parse(this.appCache.Configuration.DW_CATEGORY_ISSHOW_MAP) : {};
    var noShowTableMap = this.appCache.Configuration.DW_TABLE_ISSHOW_MAP ? JSON.parse(this.appCache.Configuration.DW_TABLE_ISSHOW_MAP) : {};
    //主商品
    let nList = [];
    //加料
    let addList = [];
    let retreatFoodSearchText = this.appShopping.retreatFoodSearchText;
    list.forEach(item => {
      if (retreatFoodSearchText && retreatFoodSearchText.length > 0) {
        retreatFoodSearchText = String(retreatFoodSearchText).toLocaleLowerCase();
        /* itemName 菜品名 tableName 桌号  pyCode菜品名首字母大小 itemCode商品条码 salesNo销售单号*/
        if (value == 0) {
          if (item.salesNo && item.salesNo.indexOf(retreatFoodSearchText) > -1) {
            console.log('销售单号')
            this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
          }
        } else
          if (value == 1) {
            if (item.tableName && item.tableName.indexOf(retreatFoodSearchText) > -1) {
              console.log('桌名')
              this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
            }
          } else
            if (value == 2) {
              console.log('菜品名')
              if (item.itemName && item.itemName.indexOf(retreatFoodSearchText) > -1) {
                this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
              }
            }
        // if ((item.itemName && item.itemName.indexOf(retreatFoodSearchText) > -1) ||
        //   (item.tableName && item.tableName.indexOf(retreatFoodSearchText) > -1) ||
        //   (item.pyCode && String(item.pyCode).toLocaleLowerCase().indexOf(retreatFoodSearchText) > -1) ||
        //   (item.itemCode && item.itemCode.indexOf(retreatFoodSearchText) > -1)) {
        //     console.log(item, noShowCategoryMap, noShowTableMap, nList, addList)
        //   this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
        // }
      }
      else {
        this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
      }

    })
    /* 是否有加料 */
    nList.forEach(nItem => {
      nItem.addList = [];
      // console.log('addList',addList)
      addList.forEach(addItem => {
        if (nItem.id == addItem.parentId) {
          nItem.addList.push(addItem);
        }
      })
    })
    console.log('nlist', nList)

    nList = this.util.orderby(nList, i => i.createdTime);
    // console.log('olistolistolist', nList);
    return nList;
  };
  /* 获取退菜页面列表 */
  getShowRetreatFoodList(salesDetailList) {
    let showRetreatFoodList = this.getRetreatFoodList(salesDetailList, this.appShopping.returnQtyValue);
    this.appShopping.showRetreatFoodList[0] = showRetreatFoodList
  }
  /**处理原始下单数据 */
  getShowData() {
    console.log('this.appShopping.salesDetailList', this.appShopping.salesDetailList)
    var salesDetailList = this.addSomeFieldsBySalesdetail(this.appShopping.salesDetailList);
    console.log('查询结果', salesDetailList)
    // var salesDetailList = Salesdetails;
    var salesTableList = this.appShopping.salesTableList;
    console.log('筛选的的数据', salesTableList)
    if (this.configuration.OUT_MODEL_TYPE == 'N') {
      // console.log('1111111111')
      this.getShowDataByNormal(salesDetailList, salesTableList);
    } else {
      // console.log('22222222')
      this.getShowDataBySplit(salesDetailList, salesTableList);
    }
    this.getShowRetreatFoodList(salesDetailList)
  }


  /**合并加料商品 过滤套餐主商品 添加一些字段 排序 过滤分类 过滤桌台 搜索 */
  addSomeFieldsBySalesdetail(list) {
    var noShowCategoryMap = this.appCache.Configuration.DW_CATEGORY_ISSHOW_MAP ? JSON.parse(this.appCache.Configuration.DW_CATEGORY_ISSHOW_MAP) : {};
    var noShowTableMap = this.appCache.Configuration.DW_TABLE_ISSHOW_MAP ? JSON.parse(this.appCache.Configuration.DW_TABLE_ISSHOW_MAP) : {};
    //主商品
    let nList = [];
    //加料
    let addList = [];
    let searchText = this.appShopping.searchText;
    // console.log('hou',searchText,this.appShopping.searchText,'111')
    list.forEach(item => {
      if (searchText && searchText.length > 0) {
        searchText = String(searchText).toLocaleLowerCase();
        /* itemName 菜品名 tableName 桌号  pyCode菜品名首字母大小 itemCode商品条码 salesNo销售单号*/
        if ((item.itemName && item.itemName.indexOf(searchText) > -1) ||
          (item.tableName && item.tableName.indexOf(searchText) > -1) ||
          (item.pyCode && String(item.pyCode).toLocaleLowerCase().indexOf(searchText) > -1) ||
          (item.itemCode && item.itemCode.indexOf(searchText) > -1)) {
          console.log(item, noShowCategoryMap, noShowTableMap, nList, addList)
          this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
        }
      }
      else {
        this.filtItem(item, noShowCategoryMap, noShowTableMap, nList, addList);
      }

    })
    /* 是否有加料 */
    nList.forEach(nItem => {
      nItem.addList = [];
      /* 添加退单数量字段 */
      // if(nItem.retreatFoodNum==undefined){
      //   console.log('nItem.retreatFoodNum',nItem.retreatFoodNum)
      //   nItem.retreatFoodNum=0
      // }
      // console.log('addList',addList)
      addList.forEach(addItem => {
        if (nItem.id == addItem.parentId) {
          nItem.addList.push(addItem);
        }
      })
    })
    console.log('nlist', nList)

    nList = this.util.orderby(nList, i => i.createdTime);
    // console.log('olistolistolist', nList);
    return nList;
  }
  private filtItem(item: any, noShowCategoryMap: any, noShowTableMap: any, nList: any[], addList: any[]) {
    if (item.itemType == 'N') {
      if (!noShowCategoryMap[item.cateId2 ? item.cateId2 : item.cateId] || noShowCategoryMap[item.cateId2 ? item.cateId2 : item.cateId] == '0') {
        if (!noShowTableMap[item.tableId] || noShowTableMap[item.tableId] == '0') {
          //kds显示需要字段
          if (item.status == '0') {
            item.outMinutes = this.util.subTimeMinutes(item.createdTime);
            item.outNum = this.util.accSub(this.util.accSub(item.salesQty, item.crossoutNum), item.returnQty);
            // 商品剩余数量
            // item.outNum = this.util.accSub(item.outNum, item.returnQty);
            /**
             * outTimeFalg 0,1,2
             */
            if (item.outMinutes > item.timeout) {
              item.outTimeFalg = 1;
            }
            // item.currCrossoutNum=item.outNum||0;
            /* salesQty销售数量 */
            if (item.salesQty > 0) {
              if (item.relatedType != 'A') {
                nList.push(item);
              }
              else {
                addList.push(item);
              }
            }
          }
          // olist.push(item);
        }
      }
    }
  }

  /**
   * 普通模式下
   * 下单桌台  
   * 显示桌台
   * 显示未出品商品
   * 显示已经出品商品
   * 
   * 
   */
  getShowDataByNormal(salesDetailList, salesTableList) {
    // this.getShowCategores();
    this.getShowSalesTables(salesDetailList, salesTableList);
    this.getShowSalesDtails(salesDetailList);
  }
  /*  */
  /**
   * 页面显示出品商品数据
   * 分页
   */
  getShowSalesDtails(salesDetailList) {

    var showList = [[]];
    var showOutList = [[]];
    var list = salesDetailList;
    /* 当下单数量和退菜相等时不在页面上显示 */
    list.forEach(item => {
      if (item.salesQty == item.returnQty) {
        return
      }
      if (item.outNum > 0) {
        showList = this.pagePush(showList, item, this.salesDetailPageSize);
      }
      if (item.crossoutNum > 0) {
        showOutList = this.pagePush(showOutList, item, this.outSalesDetailPageSize);
      }

    })
    this.appShopping.showSalesDetailList = showList;
    this.appShopping.showOutSalesDetailList = showOutList;
    // console.log('this.appShopping.showSalesDetailList', this.appShopping.showSalesDetailList);
    // console.log('this.appShopping.showOutSalesDetailList', this.appShopping.showOutSalesDetailList);
  }
  /**
   * 页面显示桌台数据
   * 分页  过滤桌台 
   */
  getShowSalesTables(salesDetailList, salesTableList) {
    var noShowTableMap = this.appCache.Configuration.DW_TABLE_ISSHOW_MAP || {};
    var showList = [[]];
    var showOutList = [[]];
    var tables = salesTableList || [];
    tables.forEach(table => {
      if (!noShowTableMap[table.tableId] || noShowTableMap[table.tableId] == '0') {
        // console.log(JSON.stringify(table));// 是否带有搭台
        if (table.virtualId && table.virtualId > 0) { table.showTableName = table.tableName + "-" + table.virtualId; }
        else { table.showTableName = table.tableName; }
        table['salesDetailList'] = [];
        table['outSalesDetailList'] = [];
        table.outNum = 0;
        table.crossoutNum = 0;
        salesDetailList.forEach(item => {
          // if (table.salesId == item.salesId) {
          if (item.tableId == table.tableId && item.salesId == table.salesId) {
            item.showTableName = table.showTableName;
            // console.log('获取出品和未出品','salesQty',item.salesQty)
            /* 添加当退单数量等于下单数量时不添加 */
            // if(item.salesQty==item.returnQty){
            //   console.log('已退单')
            //   return
            // }
            if (item.outNum > 0) {
              table['salesDetailList'].push(item);
              table.outNum = this.util.accAdd(table.outNum, item.outNum);
            }
            if (item.crossoutNum > 0) {
              table['outSalesDetailList'].push(item);
              table.crossoutNum = this.util.accAdd(table.crossoutNum, item.crossoutNum);
            }
          }
        });
        if (table.status == '0') {
          if (table.outNum > 0) {
            showList = this.pagePush(showList, table, this.salesTablePageSize);
          }
          if (table.crossoutNum > 0) {
            showOutList = this.pagePush(showOutList, table, this.salesTablePageSize);
          }
        }

        // // 是否已经全部出品，如果是，不显示桌台
        // let isEmptyTableCrossoutNum = false;
        // if (!table.salesDetailList || table.salesDetailList.length <= 0) isEmptyTableCrossoutNum = true;
        // if (!isEmptyTableCrossoutNum)
        //   showList = this.pagePush(showList, table, this.salesTablePageSize)
      }
    });
    this.appShopping.showSalesTableList = showList;
    this.appShopping.showOutSalesTableList = showOutList;
    console.log('showSalesTableList', showList);
    console.log('showOutSalesTableList', showOutList);
  }


  /**
   * 分串模式下
   * 下单桌台  
   * 显示桌台
   * 显示未出品商品
   * 显示已经出品商品
   * 
   * 
   */
  getShowDataBySplit(salesDetailList, salesTableList) {
    let cateList = this.getShowCategoresBySplit();
    this.getShowSalesTablesBySplit(salesTableList, salesDetailList);
    this.getShowSalesDtailsBySplit(cateList, salesDetailList);
  }


  /**
   * 页面显示分类数据
   * 过滤分类
   */
  getShowCategoresBySplit() {
    let categoryList = this.appShopping.categoryList;
    let list = [];
    let map = null;
    let data = this.appCache.Configuration['DW_CATEGORY_ISSHOW_MAP'];
    if (data && data.length > 0) {
      map = JSON.parse(data);
    }
    // console.log('map', map);

    categoryList.forEach(item => {
      if (map && map[item.id] == '1') {
        console.log('0000000000000');
        item.isShow = false;
      } else {
        list.push(item)
        // item.isShow = true;
      }
    })
    return list;
  }
  /**
   * 页面显示出品商品数据
   *  合并
   */
  getShowSalesDtailsBySplit(cateList, salesDetailList) {
    let spuMap = {};//spuId:[salesDetailList]
    let allSpuList = [];
    // let allOutSpuList = [];
    [].filter(item => item.isCanReceive)
    salesDetailList.forEach(salesDetil => {
      if (spuMap[salesDetil.spuId]) {
        spuMap[salesDetil.spuId].push(salesDetil);
      } else {
        spuMap[salesDetil.spuId] = [];
        spuMap[salesDetil.spuId].push(salesDetil);
      }
    })

    //获取合并后spu
    for (let key in spuMap) {
      let list = spuMap[key];
      if (list && list.length > 0) {
        let item = list[0];
        allSpuList.push({
          spuCode: item.spuCode,
          itemName: item.itemName,
          cateId: item.cateId2 ? item.cateId2 : item.cateId,
          unitName: item.unitName,
          outNum: this.getAllNum(list),
          crossoutNum: this.getAllNum(list, 'crossoutNum'),
          salesDetailList: list.filter(item => item.outNum > 0),
          outSalesDetailList: list.filter(item => item.crossoutNum > 0),
        })
      }
    }

    //分类
    cateList.forEach(cate => {
      cate.spuList = [];
      cate.outNum = 0;
      cate.crossoutNum = 0;
      if (cate.id == '999999') {
        cate.spuList = allSpuList;
        cate.outNum = this.getAllNum(allSpuList);
      } else {
        allSpuList.forEach(spu => {
          if (spu.cateId == cate.id) {
            cate.spuList.push(spu);
            cate.outNum = this.util.accAdd(cate.outNum, spu.outNum);
            cate.crossoutNum = this.util.accAdd(cate.crossoutNum, spu.crossoutNum);
          }
        })

      }
    })

    this.appShopping.showSplitCateList = cateList;
    // console.log('this.appShopping.showSplitCateList', this.appShopping.showSplitCateList);

  }

  getAllNum(list, key = 'outNum') {
    let num = 0;
    if (!list || list.length == 0) {
      return num;
    }
    list.map(item => {
      num = this.util.accAdd(num, item[key])
    })

    return num;
  }

  /**
   * 页面显示桌台数据
   * 分页 过滤桌台
   */
  getShowSalesTablesBySplit(salesTableList, salesDetailList) {
    let areaList = this.appShopping.areaList;
    // debugger
    var noShowTableMap = this.appCache.Configuration.DW_TABLE_ISSHOW_MAP || {};
    var showList = [[]];
    var tables = salesTableList || [];
    tables.forEach(table => {
      table.outNum = 0;
      table.crossoutNum = 0;
      if (table.virtualId && table.virtualId > 0) { table.showTableName = table.tableName + "-" + table.virtualId; }
      else { table.showTableName = table.tableName; }
      if (!noShowTableMap[table.tableId] || noShowTableMap[table.tableId] == '0') {
        table['salesDetailList'] = [];
        table['outSalesDetailList'] = [];
        salesDetailList.forEach(item => {
          // if (table.salesId == item.salesId) {
          if (item.tableId == table.tableId && item.salesId == table.salesId) {
            item.showTableName = table.showTableName;
            if (item.outNum > 0) {
              table['salesDetailList'].push(item);
              table.outNum = this.util.accAdd(table.outNum, item.outNum);
            }
            if (item.crossoutNum > 0) {
              table['outSalesDetailList'].push(item);
              table.crossoutNum = this.util.accAdd(table.crossoutNum, item.crossoutNum);
            }
          }
        })

      }
    })



    areaList.forEach(area => {
      area.tableList = [];
      area.outNum = 0;
      area.crossoutNum = 0;

      tables.forEach(tab => {
        if (tab.status == '0') {
          if (area.id == '' || !area.id) {
            area.tableList.push(tab);
            area.outNum = this.util.accAdd(area.outNum, tab.outNum);
            area.crossoutNum = this.util.accAdd(area.crossoutNum, tab.crossoutNum);
          }
          if (tab.areaId == area.id) {
            area.tableList.push(tab);
            area.outNum = this.util.accAdd(area.outNum, tab.outNum);
            area.crossoutNum = this.util.accAdd(area.crossoutNum, tab.crossoutNum);
          }
        }

      });

    })

    this.appShopping.showSplitAreaList = areaList;
    // console.log('this.appShopping.showSplitAreaList', this.appShopping.showSplitAreaList);
  }

  /**
   * 分页push
   * @param list 
   * @param item 
   * @param limit 
   */
  pagePush(list, item, limit) {
    if (!list) {
      list = [[item]];
      return list
    } else {
      let flag = false;
      for (let page = 0; page < list.length; page++) {
        const pageList = list[page];
        if (pageList.length < limit) {
          pageList.push(item);
          return list
        }
      }
      list[list.length] = [item];
    }

    return list
  }
  /**
   * @method {Function} getItemRemainNum 获取未出品商品剩余数量
   * @param {Object} item
   * @return {Number} remainNum 
   */
  getItemRemainNum(item) {
    if (!item) return 0;
    let remainNum = 0;
    if (!item.returnQty || !isNumber(item.returnQty)) item.returnQty = 0;
    if (!item.crossoutNum || !isNumber(item.crossoutNum)) item.crossoutNum = 0;
    /* 当退单数目字段没有或等于0 */
    // if(!item.retreatFoodNum || !isNumber(item.retreatFoodNum)) item.retreatFoodNum=0
    remainNum = item.salesQty - item.returnQty - item.crossoutNum;
    if (remainNum <= 0) remainNum = 0;
    return remainNum;
  }


  /**
   *计算未退菜的数量
   *@member {Function}
   * @param {*} item
   * @returns
   * @memberof ShoppingUtilProvider
   */
  getItemNotRetreatFoodNum(item) {
    // console.log('item',item)
    if (!item) return 0;
    let notRetreatFoodNum = 0
    if (!item.returnQty || !isNumber(item.returnQty)) item.returnQty = 0;
    /* 当退菜数目字段没有或等于0 */
    //  if(!item.retreatFoodNum || !isNumber(item.retreatFoodNum)) item.retreatFoodNum=0
    notRetreatFoodNum = item.salesQty - item.returnQty;
    if (notRetreatFoodNum <= 0) notRetreatFoodNum = 0
    // console.log('notRetreatFoodNum',notRetreatFoodNum)
    return notRetreatFoodNum
  }

  //排队叫号
  /**
* 收银端推送数据过来了
* @param data 
*/
  updateOrAddLocalQueueData(data) {
    console.log('推送排队数据过来', data);

    let oList = this.appShopping.queueOrderList;
    let oDetailList = this.appShopping.queueOrderDetailList;
    if (data.pos_queueOrder && data.pos_queueOrder.length > 0) {
      let list = data.pos_queueOrder;
      list.forEach(newItem => {
        let flag = true;
        oList.forEach((oldItem, index) => {
          if (oldItem.id == newItem.id) {
            oList[index] = newItem;
            flag = false;
          }
        })
        if (flag) {
          oList.push(newItem);
        }
      });

    }
    if (data.pos_queueOrderDetail && data.pos_queueOrderDetail.length > 0) {
      let list = data.pos_queueOrderDetail;
      list.forEach(newItem => {
        let flag = true;
        oDetailList.forEach((oldItem, index) => {
          if (oldItem.id == newItem.id) {
            //叫号了
            if (newItem.callNum && oldItem.callNum != newItem.callNum) {
              this.events.notifyDataChanged('queueOrder:callNum', newItem);
              console.log('queueOrder:callNum', newItem);
            }
            oDetailList[index] = newItem;
            flag = false;
          }
        })
        if (flag) {
          oDetailList.push(newItem);
        }
      });
    }

    let list = this.doGetShowQueueData();
    this.events.notifyDataChanged('queueOrder:dataRefresh', list);
  }
  /**获取显示排队分组数据 */
  doGetShowQueueData() {
    // debugger
    var queueOrders = this.appShopping.queueOrderList;
    var queueOrderDetails = this.appShopping.queueOrderDetailList;
    let showList = Object.create(null);
    showList = [[]];
    queueOrders.forEach(order => {
      order.detailList = this.doGroupDetail(order, queueOrderDetails)
      // this.pagePush(showList, order, 4)
      /* 设置一个页面几个l */
      this.pagePush(showList, order, 6)
    });
    this.appShopping.showQueueOrderList = showList;
    return showList;
  }

  /**
   * 分组
   * @param order 
   * @param DetailList 
   */
  doGroupDetail(order, DetailList) {
    var firstNum = order.beginNo;
    var list = [];
    DetailList.forEach(element => {
      if (element.queueNo && element.queueNo.startsWith(firstNum) && element.isDelete != '1') {
        list.push(element);
      }
    });
    return list;
  }
}
