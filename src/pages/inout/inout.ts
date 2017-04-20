import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-inout',
  templateUrl: 'inout.html'
})
export class InOut {
@Input() guestId:string;
  constructor(private nav: NavController, public navParams: NavParams) {
    this.guestId = this.navParams.get('guestId');
  }

}
