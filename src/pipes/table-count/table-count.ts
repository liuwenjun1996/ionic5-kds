import { Pipe, PipeTransform } from '@angular/core';
import { Observable, from } from "rxjs";

/**
 * Generated class for the TableCountPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tableCount',
})
export class TableCountPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(tables: any[]): number {
    if (tables == null || tables.length == 0) {
      return 0;
    }

    let num = 0;

    from(tables).subscribe(res => {
      num += res['wxPlaceEntityList'].length
    });


    return num;
  }
}
