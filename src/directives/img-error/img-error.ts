import { Directive,Input } from '@angular/core';

/**
 * Generated class for the ImgErrorDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[imgError]',
  host: {
    '(error)': 'onError($event.target)'
  }
})
export class ImgErrorDirective {
  private image = 'assets/images/public/default-dish.png';
 
  @Input('imgError') type: string
  set backImg(img:string) {
    if (img) this.image = img;
  }
 
  onError(e) {
    if (this.type === 'user') {
      e.src =  'assets/images/public/default-user.png';
    } else if (this.type === 'dish') {
      e.src = 'assets/images/public/default-dish.png';
    } else if (this.type === 'card') {
      e.src = 'assets/images/user/card_bg.png';
    } else {
      e.src = 'assets/images/public/default.png';
    }
  }
  constructor() {
  }
  

}
