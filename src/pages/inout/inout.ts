import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { GuestService } from '../../providers/guest-service';
import { AllGuest } from '../allguest/allguest';

@Component({
  selector: 'page-inout',
  templateUrl: 'inout.html'
})
export class InOut {
  @Input() guestId:string;
  public reason = {inout: '', reason: ''};
  public username = '';
  public email = '';
  public userPhone = '';
  constructor(private navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private guestService: GuestService, private alertCtrl: AlertController) {
    this.guestId = this.navParams.get('guestId');
    let info = this.auth.getUserInfo();
    if(info == undefined){
      this.navCtrl.push(LoginPage);
    }else{
      this.username = info.name;
      this.email = info.email;
      this.userPhone = info.phone;
    }
  }

  submitInOUt(){
      alert('data saved');
      this.guestService.updateGuestInOutInfo(this.reason, this.userPhone, this.guestId).subscribe(
          data => {
          	//console.log('data ::::::',data);
            //this.showAlert();
            //this.navCtrl.push(AllGuest);
            this.navCtrl.pop();
          },
          err => {
              console.log(err);
          },
          () => console.log('Search Complete')
      );
  }

  showAlert() {
  /*  setTimeout(() => {
      this.loading.dismiss();
    }); */

    let alert = this.alertCtrl.create({
      title: 'Status',
      subTitle: "status update.",
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
