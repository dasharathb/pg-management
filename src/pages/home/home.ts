import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  openPannel: boolean = true;
  username = '';
  email = '';

  constructor(public navCtrl: NavController, private auth: AuthService) {
      let info = this.auth.getUserInfo();
console.log('info.....',info);
      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.username = info.name;
        this.email = info.email;
      }
      
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.navCtrl.setRoot(LoginPage)
    });
  }

  openPan(){
    //alert('123456');
    this.openPannel = !this.openPannel;
  }

}
