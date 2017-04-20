import { Component } from '@angular/core';
import {Device} from 'ionic-native';
import { NavController, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {phone: '', password: '', deviceId: ''};
  public deviceUUId : any;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private platform: Platform) {
    platform.ready().then(() => {
       //console.log('Device:::::::::::::::',Device.uuid);
       this.deviceUUId = Device.uuid;
       this.registerCredentials.deviceId = Device.uuid;
       //this.registerCredentials.deviceId = 'ddvc1234r';
      });
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
