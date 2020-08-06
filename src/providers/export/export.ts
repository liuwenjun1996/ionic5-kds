import { Injectable } from '@angular/core';

/*
  Generated class for the ExportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class ExportProvider {
  interval: any;
  time: number = 180;

  constructor() {
    console.log('Hello ExportProvider Provider');
  }

  exportInterval() {
    if(this.interval == null){
      this.interval = setInterval(() => {
        this.time--;
        console.log(this.time);
        if(this.time <= 0){
          this.time = 180;
          clearInterval(this.interval);
          this.interval = null
        }
      }, 1000)
    }
  }

}
