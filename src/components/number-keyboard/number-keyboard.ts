
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';



/**
 * Generated class for the OrderBtnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'number-keyboard',
  templateUrl: 'number-keyboard.html',
  styleUrls: ['./number-keyboard.scss'],
})

export class NumberKeyboardComponent implements OnInit {
  str: string = '';
  @Input() keyboardNum: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Output() confirm = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Input() number: { number: string, isClear: false } = { number: '', isClear: false };
  @Input() isClear = false;
  @Input() maxLength = 12;
  @Input() havePoint = true;

  constructor() {
    // this.number.number = String(this.number.number);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad KeyboardPage');
  }
  ngOnInit() {
    // debugger
    console.log('number-keyboard', this.keyboardNum);
  }
  close() {
    // this.navCtrl.pop();
  }

  addStr(n) {
    let indexOf = -1;
    this.number.number = String(this.number.number);
    if (this.number.isClear) { this.clear(); this.number.isClear = false; };
    console.log(this.number.number.indexOf('0'));
    if (n == '0' && this.number.number.length == 1 && this.number.number.indexOf('0') == 0) {
      return;
    }
    if (this.number.number.length > 0) {
      indexOf = this.number.number.indexOf('.') ? this.number.number.indexOf('.') : 0;
    }
    if (n == '.' && indexOf > -1) {
      return;
    }
    // console.log(this.number.number.length - indexOf);
    if (indexOf > -1 && this.number.number.length - indexOf > 2) {
      return;
    }
    if (this.number.number.length >= this.maxLength) {
      return;
    }
    this.number.number += n.toString();
    this.refresh.emit();
    // if (this.number.number.length == 6) {
    //   this.viewCtrl.dismiss(this.number.number);
    // }
  }

  clear() {
    this.number.number = '';
    this.refresh.emit();
    // this.number.number = this.number.number.substring(0, this.number.number.length - 1);
  }
  del() {
    this.number.number = this.number.number.substring(0, this.number.number.length - 1);
    this.refresh.emit();
  }
  doConfirm() {
    this.confirm.emit();
  }
}
