import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Camera} from 'ionic-native';
import { GuestService } from '../../providers/guest-service';


@Component({
  selector: 'guest-info',
  templateUrl: 'guest.html'
})
export class Guest {
  public guest = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:'',amount:0};
  @Input() userPhone:string;
  @Input() guestId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private guestService: GuestService) {
    this.userPhone = this.navParams.get('userPhone');
    this.guestId = this.navParams.get('guestId');
  }

  ionViewWillEnter(){
    this.getGuest();
  }
  getGuest(){
    this.guestService.getGuestInfo(this.userPhone, this.guestId).subscribe(
        data => {
        	console.log('data.guest-info ::::::',data);
          this.guest = data;
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }

}
