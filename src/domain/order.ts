import {IBaseEntity} from "./iBaseEntity";

export interface IOrderDetail extends IBaseEntity{
  id: string
  productName: string
  sellNum: number
  sellPrice: number
  unitName: string
  skuName: string

  [propName: string]: any
}

export interface IOrder extends IBaseEntity{
  id: string
  name: string
  address: string
  mobile: string
  payStatus: string
  remark: string
  isNewCustomer: number  //已下订单
  sellAmount: number  //销售额
  payType: string  //配送类型
  outBoxAmount: number
  sendAmount: number  //配送费
  placeId?: string
  placeName?: string
  todayXh?: string
  sourceType?: string
  bookType?: string
  status?: string
  nickName?: string

  detailList: IOrderDetail[]

  [propName: string]: any
}
