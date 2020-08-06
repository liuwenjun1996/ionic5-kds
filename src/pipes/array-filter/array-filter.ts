import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ArrayFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {
  /**
   * 数组过滤.
   */
  transform(items: Array<any>, conditions: { [field: string]: any }, defaltValue: Array<any> = []): Array<any> {
    try {
      items = items.filter(item => {
        for (let field in conditions) {
          if (item[field] !== conditions[field]) {
            return false;
          }
        }
        return true;
      });
    } catch (e) {

    }


    if (items.length > 0) {
      return items
    } else {
      return defaltValue
    }
  }
}
