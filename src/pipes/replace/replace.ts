import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ReplacePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'replace',
  pure: true
})
export class ReplacePipe implements PipeTransform {

  transform(str: string, pattern: string, attributes: string, replacement: string): string {
    let reg = new RegExp(pattern, attributes);
    return str.replace(reg, replacement);
  }

}
