import { Directive, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the ZWidthDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[z-width]' // Attribute selector
})
export class ZWidthDirective {

  defaultColor: string = '25%';   //默认宽度

  @Input('z-width')
  set backgroundColor(width: string) {
    this.setStyle(width);
  };

  constructor(private el: ElementRef) {
    this.setStyle(this.defaultColor);
  }

  private setStyle(width: string) {
    this.el.nativeElement.style.width = width;
  }

}
