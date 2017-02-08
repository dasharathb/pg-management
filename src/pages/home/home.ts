import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openPannel: boolean = true;

  constructor(public navCtrl: NavController) {

  }

  openPan(){
    //alert('123456');
    this.openPannel = !this.openPannel;
  }

}
