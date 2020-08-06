import { NgModule } from '@angular/core';
import { ReplacePipe } from './replace/replace';
import { ArraySortPipe } from './array-sort/array-sort';
import { ArrayFilterPipe } from './array-filter/array-filter';
import { StatsPipe } from './stats/stats';
import { StatsTypePipe } from './stats-type/stats-type';
import { TableCountPipe } from './table-count/table-count';
import { ArraySortLikePipe } from './array-sort-like/array-sort-like';
import { DateCalcPipe } from './date-calc/date-calc';
import { ImgUrlPipe } from './img-url/img-url';
import { OrderStatusMsgPipe } from './order-status-msg/order-status-msg';
import { OrderStatusPipe } from './order-status/order-status';
import { PayWayPipe, LogisticsPipe } from './pay-way/pay-way';
import { PricePipe } from './price/price';
import { jsonStringPipe } from './json-string/json-string';

@NgModule({
  declarations: [ReplacePipe,
    ArraySortPipe,
    ArrayFilterPipe,
    StatsPipe,
    StatsTypePipe,
    TableCountPipe,
    ArraySortLikePipe,
    DateCalcPipe,
    ImgUrlPipe,
    OrderStatusMsgPipe,
    OrderStatusPipe,
    PayWayPipe,
    LogisticsPipe,
    PricePipe,
    jsonStringPipe,
  ],
  imports: [],
  exports: [ReplacePipe,
    ArraySortPipe,
    ArrayFilterPipe,
    StatsPipe,
    StatsTypePipe,
    TableCountPipe,
    ArraySortLikePipe,
    DateCalcPipe,
    ImgUrlPipe,
    OrderStatusMsgPipe,
    OrderStatusPipe,
    PayWayPipe,
    LogisticsPipe,
    PricePipe,
    jsonStringPipe,
  ]
})
export class PipesModule {
}
