import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'jsonString'
})
export class jsonStringPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (value && value.length > 0) {
      let arr = JSON.parse(value);
      let str: string = '';
      for (let i in arr) {
        console.log(i);
        console.log(arr[i]);
        str=str+i+':'+arr[i]+';';
      }
      return str;
    } else {
      return '';
    }
  }

}
