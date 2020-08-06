import { Directive } from '@angular/core';

/**
 * Generated class for the SxylightDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[sxylight]' // Attribute selector
})
export class SxylightDirective {

  constructor() {
    console.log('Hello SxylightDirective Directive');
  }

}
