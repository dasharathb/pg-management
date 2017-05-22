import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GuestService } from '../../providers/guest-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private user : any;
  public edit : false;
  public hFee : '';
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService) {
      let info = this.auth.getUserInfo();
      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.user = info;

      }
  }

  save(){
    if(this.hFee != ''){
      this.guestService.updateFee(this.user.phone, this.hFee).subscribe(
          data => {
          this.user = data;
          this.edit = false;
          },
          err => {
              console.log(err);
          },
          () => console.log('Search Complete')
      );
    }
  }
  cancel(){
    this.edit = false;
  }

}
