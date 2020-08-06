import { Directive, Input, ElementRef } from '@angular/core';
import { AppPermission } from '../../app/app.permission';

/**
 * Generated class for the PermissionDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({ selector: '[permission]' })
export class AposPermissionDirective {
  private el: HTMLElement;
  private appPermission:AppPermission;

  @Input('permission') set aposPermission(permission: string) {
    console.log(permission);
    
    if(!this.appPermission.staffPermission(permission)){
      this.el.remove();
      this.el.style.backgroundColor = 'red';
    }
  };

  constructor(el: ElementRef, appPermission:AppPermission) {
    this.el = el.nativeElement;
    this.appPermission = appPermission;
  }
}


