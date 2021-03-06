import { Component } from '@angular/core';
import {Device} from 'ionic-native';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {name: '', phone: '', email: '', password: '', hFee:0, deviceId:''};
  public deviceUUId : any;
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private platform: Platform) {
    platform.ready().then(() => {
       this.deviceUUId = Device.uuid;
    });
  }

  public register() {
    this.registerCredentials.deviceId = this.deviceUUId;
    this.auth.register(this.registerCredentials).subscribe(success => {
    this.auth.addUserToLocalStorage(this.registerCredentials).subscribe(success => {
      if (success) {
        this.auth.getUserDtl(this.deviceUUId).subscribe(succ => {
          if(succ.name)
            this.auth.setUserInfo(succ);
         });
        this.createSuccess = true;
          this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  } ,
  error => {
    this.showPopup("Error", error);
  });
}

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
