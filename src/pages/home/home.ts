import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { GuestService } from '../../providers/guest-service';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Guest } from '../guest-info/guest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openPannel: boolean = true;
  openPannelName: string = '';
  username = '';
  email = '';
  userPhone = '';
  totalGuests = 0;
  presentGuests = 0;
  feeDueGuests : any;

  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService) {
      let info = this.auth.getUserInfo();
      console.log('info.....',info);
      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.username = info.name;
        this.email = info.email;
        this.userPhone = info.phone;
      }

  }
  ionViewWillEnter(){
    this.onPageLoad();
  }

  onPageLoad(){
    this.getGuestCount();
    this.getFeeDueInfo();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(LoginPage)
    });
  }

  openPan(pName){
    //alert(pName);
    this.openPannel = !this.openPannel;
    this.openPannelName = pName;
  }

  getGuestCount(){

    this.guestService.getGuestCount(this.userPhone).subscribe(
        data => {
          console.log('data ::::::',data);
          this.totalGuests = data.totalGuests;
          this.presentGuests = data.presentGuests;
        },
        err => {
            console.log(err);
        },
        () => console.log('get guest count completed')
    );
  }

  getFeeDueInfo(){
    this.guestService.getFeeDueInfo(this.userPhone).subscribe(
        data => {
          console.log('data :: person::::',data);
          this.feeDueGuests = data;
        },
        err => {
            console.log(err);
        },
        () => console.log('get guest count completed')
    );
  }
  guestInfo(guestId){
  console.log('guestId ::::::::::::::::::::::: ',guestId);
    this.navCtrl.push(Guest,{userPhone: this.userPhone, guestId: guestId});
  }

}
