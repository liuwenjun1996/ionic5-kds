import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../providers/GlobalData';
@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {


  transform(value: any, args?: any): any {
    if (value) {
      if (value.includes('http://') || value.includes('https://')) {
        return value;
      } else {
        return `${environment.imgUrl}${value}`
      }
    } else {
      if (args) {
        //如果过滤器带类型，根据类型返回对应图片或者默认图片
        if (args === 'user') {
          return 'assets/imgs/public/default-user.png';
        } else if (args === 'dish') {
          return 'assets/imgs/public/default-dish.png';
        } else if (args === 'card') {
          return 'assets/imgs/user/card_bg.png';
        } else {
          return 'assets/imgs/public/default.png';
        }
      } else {
        return 'assets/imgs/public/default.png';
      }
    }
  }

}
