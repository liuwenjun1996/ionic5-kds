import { Injectable } from '@angular/core';
import { GenericDAO } from "./genericDAO";
import { IUser, User } from '../domain/user';
import { Log } from '../domain/log';

@Injectable({
  providedIn: 'root',
})
export class LogDao extends GenericDAO<IUser> {
  readonly tableName: string = Log.tableName;

  queryBySellerId(id: string) {
    return this.queryAsListByWhere('where id = ?', [id]);
  }
  queryByVersions(versions: string) {
    return this.queryAsListByWhere('where versions = ?', [versions])
  }


}
