import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GuestService } from '../../providers/guest-service';
import { LoginPage } from '../login/login';
import { Guest } from '../guest-info/guest';
import { InOut } from '../inout/inout';

@Component({
  selector: 'all-guest',
  templateUrl: 'allguest.html'
})
export class AllGuest {
public guests : any;
public username = '';
public email = '';
public userPhone = '';
totalGuests = 0;
presentGuests = 0;

  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService, private alertCtrl: AlertController) {
    let info = this.auth.getUserInfo();
    if(info == undefined){
      this.navCtrl.push(LoginPage);
    }else{
      this.username = info.name;
      this.email = info.email;
      this.userPhone = info.phone;
    }

  }
  ionViewDidLoad() {
  	this.allGuests();
  }
  ionViewWillEnter(){
    this.allGuests();
  }
  allGuests(){
    this.guestService.getGuests(this.userPhone).subscribe(
        data => {
        	this.guests = data.guests;
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }

  guestInfo(guestId){
    this.navCtrl.push(Guest,{userPhone: this.userPhone, guestId: guestId});
  }
  getGuestCount(){

    this.guestService.getGuestCount(this.userPhone).subscribe(
        data => {
          this.totalGuests = data.totalGuests;
          this.presentGuests = data.presentGuests;
        },
        err => {
            console.log(err);
        },
        () => console.log('get guest count completed')
    );
  }

  openResionPop(guestId){

    this.navCtrl.push(InOut,{guestId: guestId});

  }

  presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'IN / OUT',

    inputs: [
      {
        type: 'radio',
        value: 'P',
        label: 'Present'
      },
      {
        value: 'A',
        label: 'Absent',
        type: 'radio'
      },
      {
        value: 'L',
        label: 'Left',
        type: 'radio'
      },
      {
        type: 'text',
        name: 'reason',
        placeholder: 'Reason'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
          console.log(data);
          //if (User.isValid(data.username, data.password)) {
            // logged in!
          //} else {
            // invalid login
            return true;
        //  }
        }
      }
    ]
  });
  alert.present();
}
}
