import { NgModule } from '@angular/core';
import { SellerDao } from "./sellerDao";
import { UserDao } from "./userDao";
import { SysMsgDao } from './sysMsgDao';
import { SalesDetailDao } from './salesDeailDao';
import { LogDao } from './logDao';
import { PrinterDeviceDao } from './PrinterDeviceDao';
import { ConfigurationDao } from './configurationDao';


@NgModule({
  providers: [SellerDao, SysMsgDao, LogDao,PrinterDeviceDao,ConfigurationDao,
    UserDao, SalesDetailDao]
})
export class DaoModule { }
