import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 *  禁止按钮指令
 *  效果：按钮点击时，禁用3秒
 */
@Directive({
  selector: '[disabled-button]' // Attribute selector
})
export class DisabledButtonDirective {

  constructor(public element:ElementRef) {}

  @HostListener('click',['$event']) 
  onClick(event) {
    this.element.nativeElement.disabled = true;
    setTimeout(() => {
      this.element.nativeElement.disabled = false;
    }, 3000);
  }
}