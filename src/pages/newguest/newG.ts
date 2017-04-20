import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { GuestService } from '../../providers/guest-service';
import { LoginPage } from '../login/login';
//import { SuccessPage } from '../success/success';

@Component({
  selector: 'new-guest',
  templateUrl: 'newG.html'
})
export class NewGuest {

  public base64Image: string;
  public name: string;
  public fName: string;
	public person = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:'',amount:0};

  public username = '';
  public email = '';
  public userPhone = '';
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService, private alertCtrl: AlertController) {
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
  checkPhoneNuber(event, number){
  console.log('number..........',number.length);

    if(number.length==10 && event.keyCode!=8)
      return false;
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {

  /*  quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false*/
      // imageData is a base64 encoded string
        this.person.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  addGuest(){
    console.log(this.username,':::::::person details::::::',this.person);
    this.guestService.registerGuest(this.person, this.userPhone).subscribe(
        data => {
        	console.log('data ::::::',data);
          this.person = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:'',amount:0};
          //this.navCtrl.push(SuccessPage,{guestId: data.guestId});
          this.showAlert(data.guestId);
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }
  showAlert(text) {
  /*  setTimeout(() => {
      this.loading.dismiss();
    }); */

    let alert = this.alertCtrl.create({
      title: 'Guest Created',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
