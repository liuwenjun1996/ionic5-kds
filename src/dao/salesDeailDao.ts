import { Injectable } from '@angular/core';
import { GenericDAO } from "./genericDAO";
import { ISalesDetail, SalesDetail } from '../domain/salesDetail';

@Injectable({
  providedIn: 'root',
})
export class SalesDetailDao extends GenericDAO<ISalesDetail> {
  readonly tableName: string = SalesDetail.tableName;

  queryById(id: string) {
    return this.queryAsListByWhere('where id = ?', [id])
  }
  queryByVersions(versions: string) {
    return this.queryAsListByWhere('where versions = ?', [versions])
  }
  delById(id: string) {
    return this.removeByWhere('where id = ?', [id]);
}
}
