import {Injectable} from '@angular/core';
import {IGenericDAO} from "./iGenericDAO";
import {IBaseEntity} from "../domain/iBaseEntity";
import {DbProvider} from "../providers/db";
import { AppCache } from '../app/app.cache';
import { HttpProvider } from '../providers/http';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericDAO<T> implements IGenericDAO {
  abstract tableName: string;

  constructor(public dbProvider: DbProvider,public appCache:AppCache,public http:HttpProvider) {
  }

  /**
   * SELECT * FROM ${this.tableName}
   * @param {any[]} params
   * @returns {Promise<any[]>} list
   */
  queryAll(): Promise<T[]> {
    return this.dbProvider.queryAsList(`SELECT * FROM ${this.tableName}`)
  }

  /**
   *
   * @param query sql statement
   * @param params
   * @returns {Promise<any[]>}
   */
  queryAsList(query: string, params?: any[]): Promise<T[]> {
    return this.dbProvider.queryAsList(query, params)
  }

  /**
   * SELECT * FROM ${this.tableName} where id=?
   * @param {string} where
   * @param {any[]} params
   * @returns {Promise<any>}
   */
  queryAsListByWhere(where: string, params: any[]): Promise<T[]> {
    return this.dbProvider.queryAsListByWhere(this.tableName, where, params)
  }

  queryBySellerId(sellerId: string) {
    return this.queryAsListByWhere('where sellerId = ?', [sellerId])
  }

  /**
   * select * from ${tableName} where id = ${id}
   * @param {string} id
   * @returns {Promise<any>}
   */
  get(id: string): Promise<T> {
    return this.dbProvider.get(this.tableName, id)
  }

  /**
   * insert value
   * @param {IBaseEntity} entity
   * @param {boolean} defaultDef
   * @returns {Promise<any>}
   */
  set(entity: IBaseEntity, defaultDef?: boolean) {
    return this.dbProvider.set(this.tableName, entity, defaultDef)
  }

  setBatch(entitys: any, defaultDef?: boolean) {
    return this.dbProvider.setBatch(this.tableName, entitys, defaultDef)
  }

  /**
   * delete * from ${tableName} where id = ${id}
   * @param {string} id
   * @returns {Promise<any>}
   */
  remove(id: string) {
    return this.dbProvider.remove(this.tableName, id)
  }

  removeByWhere(where: string, params: any[]) {
    return this.dbProvider.removeByWhere(this.tableName, where, params)
  }
  removeByStoreIdAndPrintType(printerType: string) {
    let storeId=this.appCache.seller.id;
    return this.dbProvider.removeByStoreIdAndPrintType(this.tableName, storeId, printerType)
  }

  /**
   * delete * from ${tableName}
   * @returns {Promise<any>}
   */
  clear() {
    return this.dbProvider.clear(this.tableName)
  }

  /**
   * entity 初始化, 值来源 与 obj
   * @param entity
   * @param obj
   * @returns {any}
   */
  initEntity(entity: any, obj: any) {
    for (let key in entity) {
      entity[key] = typeof(obj[key]) != 'undefined' ? obj[key] : null
    }

    return entity;
  }
}
