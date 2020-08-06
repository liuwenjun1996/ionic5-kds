import { Injectable } from '@angular/core';
import { GenericDAO } from "./genericDAO";
import { IUser, User } from '../domain/user';

@Injectable({
  providedIn: 'root',
})
export class UserDao extends GenericDAO<IUser> {
  readonly tableName: string = User.tableName;

  queryBySellerId(id: string) {
    return this.queryAsListByWhere('where id = ?', [id])
  }
   
}
