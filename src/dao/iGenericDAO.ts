import {IBaseEntity} from "../domain/iBaseEntity";

export interface IGenericDAO {

  queryAll();

  queryAsListByWhere(where: string, params: any[])

  queryBySellerId(sellerId: string)

  get(id: string)

  set(entity: IBaseEntity, defaultDef?: boolean)

  remove(id: string)

  removeByWhere(where: string, params: any[])

  clear(tableName: string)

  setBatch(tableName: string, entitys: any, updateAll?: boolean)
}
