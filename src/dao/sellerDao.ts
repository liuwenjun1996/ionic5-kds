import {Injectable} from '@angular/core';
import {ISeller, Seller} from "../domain/seller";
import {GenericDAO} from "./genericDAO";

@Injectable({
  providedIn: 'root',
})
export class SellerDao extends GenericDAO<ISeller> {
  readonly tableName: string = Seller.tableName;

  queryBySellerId(sellerId: string){
    return this.queryAsListByWhere('where id = ?', [sellerId])
  }

}
