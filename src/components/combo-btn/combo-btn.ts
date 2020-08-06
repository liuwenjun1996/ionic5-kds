import { Component, Input, Output, EventEmitter } from '@angular/core';


/**
 * Generated class for the OrderBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'combo-btn',
  templateUrl: 'combo-btn.html',
})
export class ComboBtnComponent {

  @Input() name: '';
  @Input() com: any = {};
  @Output() add = new EventEmitter<any>();
  @Output() sub = new EventEmitter<any>();
  @Output() setNumber = new EventEmitter<any>();

  constructor() {

  }
  ngOnInit() { }

  subData() {
    this.sub.emit();
  }

  addData(event) {
    this.add.emit();
  }

  setNumberData() {
    if (this.setNumber) {
      this.setNumber.emit();
    }
  }

}