import { Injectable } from '@angular/core';
import { GenericDAO } from "./genericDAO";
import { Configuration, IConfiguration } from '../domain/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationDao extends GenericDAO<IConfiguration> {
  readonly tableName: string = Configuration.tableName;

  queryByStoreId(id: string) {
    return this.queryAsListByWhere('where storeId = ?', [id]);
  }
  queryBySalesId(id: string) {
    return this.queryAsListByWhere('where salesId = ?', [id]);
  }
  queryById(id: string) {
    return this.queryAsListByWhere('where id = ?', [id]);
  }
}
