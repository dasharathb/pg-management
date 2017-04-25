import { Component } from '@angular/core';
import {Device} from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';
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
  public deviceUUId : any;
  public noData = false;
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService, private platform: Platform) {

      platform.ready().then(() => {

         this.deviceUUId = Device.uuid;
         this.auth.getUserDtl(this.deviceUUId).subscribe(succ => {
         if(succ.name)
            this.auth.setUserInfo(succ);

           let info = this.auth.getUserInfo();
           if(info == undefined){
             this.navCtrl.push(LoginPage);
           }else{
             this.username = info.name;
             this.email = info.email;
             this.userPhone = info.phone;
             this.onPageLoad();
           }
         });

      });
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
    this.openPannel = !this.openPannel;
    this.openPannelName = pName;
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

  getFeeDueInfo(){
    this.guestService.getFeeDueInfo(this.userPhone).subscribe(
        data => {
          this.feeDueGuests = data;
          if(this.feeDueGuests.length == 0){
            this.noData = true;
          }
        },
        err => {
            console.log(err);
        },
        () => console.log('get guest count completed')
    );
  }
  guestInfo(guestId){
      this.navCtrl.push(Guest,{userPhone: this.userPhone, guestId: guestId});
  }
  feePaid(guestId, amount){
    this.guestService.feePaid(this.userPhone, guestId, amount).subscribe(
        data => {
          this.feeDueGuests = data;
          if(this.feeDueGuests.length == 0){
            this.noData = true;
          }
          this.openPannelName = '';
        },
        err => {
            console.log(err);
        },
        () => console.log('fee paid service completed')
    );
  }
}
