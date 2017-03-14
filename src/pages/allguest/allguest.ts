import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GuestService } from '../../providers/guest-service';
import { LoginPage } from '../login/login';
import { Guest } from '../guest-info/guest';

@Component({
  selector: 'all-guest',
  templateUrl: 'allguest.html'
})
export class AllGuest {
public guests : any;
public username = '';
public email = '';
public userPhone = '';
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService) {
    let info = this.auth.getUserInfo();
    console.log('info new guest.....',info);
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
  console.log('this.allGuests() ::::::::::: ')
    this.allGuests();
  }
  allGuests(){
    console.log(this.username,':::::::person details::::::',this.userPhone);
    this.guestService.getGuests(this.userPhone).subscribe(
        data => {
        	console.log('data ::::::',data.guests);
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

}
