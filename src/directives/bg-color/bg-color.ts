import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Generated class for the BgColorDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[bg-color]' // Attribute selector
})
export class BgColorDirective {

  defaultColor: string = 'red';   //默认颜色

  @Input('bg-color')
  set backgroundColor(color:string) {
    this.setStyle(color);
  };

  constructor(private el: ElementRef) {
    this.setStyle(this.defaultColor);
  }

  private setStyle(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
