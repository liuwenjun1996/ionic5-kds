import { Component } from '@angular/core';

/**
 * Generated class for the SelectCommodityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-commodity',
  templateUrl: 'select-commodity.html'
})
export class SelectCommodityComponent {

  text: string;
  constructor() {
    console.log('Hello SelectCommodityComponent Component');
    this.text = 'Hello World';
  }

}
