import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { User } from '../domain/user';
import { Configuration } from '../domain/configuration';
import { PrinterDevice } from '../domain/printerDevice';
import { PrintSetting } from '../domain/printSetting';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const DB_NAME: string = 'msy_kds_app.db';
const win: any = window;

@Injectable({
  providedIn: 'root',
})
export class DbProvider {
  private _db: any;

  constructor(public plt: Platform) {
    // if (win.SQLitePlugin) {
    // if (plt.is('cordova')) {
    //   SQLite.create({
    //     name: DB_NAME,
    //     location: 'default'
    //   }).then((db: SQLiteObject) => {
    //     this._db = db;
    //
    //     // this.initTables()
    //   })
    // } else {
    //   console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
    //   this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
    //   // this.initTables()
    // }
  }

  // Initialize the DB with our required tables
  _tryInit() {
    this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
      console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    });
  }

  /**
   * Initialize the DB with our required tables
   */
  initTables() {
    // this.query(Seller.create).then(() => {
    //   // this.set(UserEntity.tableName, {id: '0001', UserName: 'admin', password: 'ac3c53256c3d965ed069e9a163ad43f5'});
    //   // this.set(UserEntity.tableName, {id: '00002', userName: 'admin1', password: 'ac3c53256c3d965ed069e9a163ad43f5'});
    // });

    if (this.plt.is('cordova')) {
      SQLite.create({
        name: DB_NAME,
        location: 'default'
      }).then((db: SQLiteObject) => {
        this._db = db;
        this.createTables()
      })
    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);

      this.createTables()
    }
  }

  private createTables() {
    this.createTable(User);
    this.createTable(PrinterDevice);
    this.createTable(PrintSetting);
    // this.createTable(SysMsg);
    // this.createTable(Seller);
    // this.createTable(Log);
    this.createTable(Configuration);
  }

  private createTable(entity: any) {
    this.query(entity.create).then(data => {
      if (entity.newIndexes != null) {
        // 新增索引
        for (let indexSQL of entity.newIndexes) {
          this.query(indexSQL);
        }
      }
      if (entity.newColumns != null) {
        // 新增字段
        for (let item of entity.newColumns) {
          this.alterColumn(entity.tableName, item.name, item.alter);
        }
      }
    })
  }

  private alterColumn(tableName: string, columnName: string, alterSql: string) {
    this.query(`PRAGMA table_info(${tableName})`).then(data => {
      if (data.res.rows.length > 0) {
        let isNotExist = true;

        for (let i = 0; i < data.res.rows.length; i++) {
          // console.warn(JSON.stringify(data.res.rows.item(i)))
          // {"cid":0,"name":"id","type":"VARCHAR2(32)","notnull":1,"dflt_value":null,"pk":1}

          if (data.res.rows.item(i).name == columnName) {
            isNotExist = false;
            break
          }
        }

        if (isNotExist) {
          this.query(alterSql);
        }
      }
    }, reason => {
      console.log('创建新字段失败++++++++++++++++++++++++++++++++++++', tableName, columnName, alterSql);
      console.log(reason);
      return reason.err
    })
  }

  /**
   * Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.
   *
   * @param {string} query the query to run
   * @param {array} params the additional params to use for query placeholders
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  private query(query: string, params: any[] = []): Promise<any> {
    console.log(`[${new Date().toLocaleTimeString()}]: ${query}`);

    return new Promise((resolve, reject) => {
      try {
        this._db.transaction((tx: any) => {
          tx.executeSql(query, params,
            (tx: any, res: any) => resolve({ tx: tx, res: res }),
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => {
            console.log('创建新字段失败++++++++++++++++++++++++++++++++++++');
            console.log(err);
            reject({ err: err })
          });
      } catch (err) {
        console.log('创建新字段失败++++++++++++++++++++++++++++++++++++');
        console.log(err);
        reject({ err: err });
      }
    });
  }

  /**
   *
   * @param query
   * @param params
   * @returns {Promise<any[]>}
   */
  queryAsList(query: string, params: any[] = []) {
    return this.query(query, params).then(data => {
      let arr = [];

      if (data.res.rows.length > 0) {
        for (let i = 0; i < data.res.rows.length; i++) {
          arr.push(Object.assign({}, data.res.rows.item(i)))
        }
      }

      return arr;
    }, reason => {
      console.log(reason);
      return reason.err
    })
  }

  /**
   * query by where condition
   * @param tableName
   * @param where
   * @param params
   * @returns {Promise<any[]>}
   */
  queryAsListByWhere(tableName: string, where: string, params: any[]): Promise<any> {
    return this.query(`select * from ${tableName} ${where}`, params).then(data => {
      let arr = [];

      if (data.res.rows.length > 0) {
        for (let i = 0; i < data.res.rows.length; i++) {
          arr.push(Object.assign({}, data.res.rows.item(i)))
        }
      }

      return arr;
    }, reason => {
      console.log(reason);
      return reason.err
    });
  }

  /**
   * Get the column in the database identified by the given id.
   * @param {string} tableName the tableName
   * @param {string} id the id
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  get(tableName: string, id: string): Promise<any> {
    return this.query(`select * from ${tableName} where id = ? limit 1`, [id]).then(data => {
      if (data.res.rows.length > 0) {
        return Object.assign({}, data.res.rows.item(0));
      }
      return null;
    }, reason => {
      return reason.err
    });
  }

  /**
   * Set values in the database for the given json. Existing values will be overwritten.
   * @param {string} tableName
   * @param entity  domain
   * @param {boolean} defaultDef 仅对有默认值的列起作用 true: 如果列有默认值, 且实体对应的属性值为null, 列将赋值为默认值.
   *                            false: 如果列有默认值, 且实体对应的属性值为null, 默认值将不起作用.
   *                            其他的列如果没有值， 将被null值替换
   * @returns {Promise<any>}
   */
  set(tableName: string, entity: any, defaultDef: boolean = true): Promise<any> {
    let keys: string[] = [];
    let params: string[] = [];
    let values: any[] = [];

    if (defaultDef) {
      for (let key in entity) {
        if (entity[key] != null) {
          keys.push(key);
          params.push('?');
          values.push(entity[key]);
        }
      }
    } else {
      for (let key in entity) {
        keys.push(key);
        params.push('?');
        values.push(entity[key]);
      }
    }
    let sql = `insert or replace into ${tableName} (${keys.join(',')}) values (${params.join(",")})`;
    console.log('sql', sql, values);
    return this.query(sql, values)
      .then(data => {
        return data.res.insertId
      }, reason => {
        console.log(reason);
        return reason
      });
  }

  /**
   * Remove the value in the database for the given id.
   * @param {string} tableName the tableName
   * @param {string} id the id
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  remove(tableName: string, id: string): Promise<any> {
    return this.query(`delete from ${tableName} where id = ?`, [id])
      .then(data => {
        return data
      }, reason => {
        return reason
      });
  }

  /**
   *
   * @param {string} tableName
   * @param {string} where
   * @param {any[]} params
   * @returns {Promise<any>}
   */
  removeByWhere(tableName: string, where: string, params: any[]): Promise<any> {
    return this.query(`delete from ${tableName} ${where}`, params).then(data => {
      return data
    }, reason => {
      return reason
    });
  }

  removeByStoreIdAndPrintType(tableName: string, storeId: string, printerType: string,): Promise<any> {
    return this.query(`delete from ${tableName} where sellerId = ? and printerType=?`, [storeId, printerType])
      .then(data => {
        return data
      }, reason => {
        return reason
      });
  }
  removeByStoreId(tableName: string, storeId: string,): Promise<any> {
    return this.query(`delete from ${tableName} where sellerId = `, [storeId])
      .then(data => {
        return data
      }, reason => {
        return reason
      });
  }

  /**
   * Clear all data of your database.
   *  @param {string} tableName the tableName
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  clear(tableName: string): Promise<any> {
    return this.query(`delete from ${tableName}`).then(data => {
      return data;
    }, err => {
      return err
    });
  }

  // deleteDatabase(){
  //   this._db.deleteDatabase({
  //     name: DB_NAME,
  //     location: 'default'
  //   })
  // }

  setBatch(tableName: string, entitys: any, updateAll: boolean = true) {
    console.warn('batch insert ${tableName}');

    if (this.plt.is('cordova')) {
      return new Promise((resolve, reject) => {
        try {
          let batch = [];
          for (let entity of entitys) {
            let keys: string[] = [];
            let params: string[] = [];
            let values: any[] = [];

            if (updateAll) {  //true: update all clomuns
              for (let key in entity) {
                keys.push(key);
                params.push('?');
                values.push(entity[key]);
              }
            } else {  //false: update not null clomuns only
              for (let key in entity) {
                if (entity[key] != null) {
                  keys.push(key);
                  params.push('?');
                  values.push(entity[key]);
                }
              }
            }

            batch.push([`insert or replace into ${tableName} (${keys.join(',')}) values (${params.join(",")})`, values]);
          }
          this._db.sqlBatch(batch, () => {
            resolve('OK')
          }, error => {
            reject(error)
          })
        } catch (err) {
          reject({ err: err });
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          this._db.transaction((tx: any) => {
            for (let entity of entitys) {
              let keys: string[] = [];
              let params: string[] = [];
              let values: any[] = [];

              if (updateAll) {  //true: update all clomuns
                for (let key in entity) {
                  keys.push(key);
                  params.push('?');
                  values.push(entity[key]);
                }
              } else {  //false: update not null clomuns only
                for (let key in entity) {
                  if (entity[key] != null) {
                    keys.push(key);
                    params.push('?');
                    values.push(entity[key]);
                  }
                }
              }

              tx.executeSql(`insert or replace into ${tableName} (${keys.join(',')}) values (${params.join(",")})`, values);
            }
          },
            (err: any) => {
              reject({ err: err })
            }, () => {
              resolve('OK')
            });
        } catch (err) {
          reject({ err: err });
        }
      });
    }
  }
}
