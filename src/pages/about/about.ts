import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private user : any;

  constructor(public navCtrl: NavController, private auth: AuthService) {
      let info = this.auth.getUserInfo();
      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.user = info;
        console.log('this.user :::::::::: ',this.user);
      }
  }

}
