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
  public edit : false;
  constructor(public navCtrl: NavController, private auth: AuthService) {
      let info = this.auth.getUserInfo();
      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.user = info;

      }
  }

  save(){
    //console.log('saved......');
  }
  cancel(){
    this.edit = false;
  }

}
