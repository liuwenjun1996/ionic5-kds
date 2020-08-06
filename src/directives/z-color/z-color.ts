import { Directive, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the ZColorDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[z-color]' // Attribute selector
})
export class ZColorDirective {

  defaultColor: string = 'red';   //默认颜色

  @Input('z-color')
  set backgroundColor(color:string) {
    this.setStyle(color);
  };

  constructor(private el: ElementRef) {
    this.setStyle(this.defaultColor);
  }

  private setStyle(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
