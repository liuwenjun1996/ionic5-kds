import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ArraySortLikePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'like',
  pure: false
})
export class ArraySortLikePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
    items = items.filter(item => {
      for (let field in conditions) {
        if (item[field].indexOf(conditions[field]) < 0) {
          return false;
        }
      }
      return true;
    });

    return items
  }
}
