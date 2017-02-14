import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'new-guest',
  templateUrl: 'newG.html'
})
export class NewGuest {
	
  public base64Image: string;
  public name: string;
  public fName: string;
  public gender : string = 'select';
  public address : string;
  public pin : number;
  public aadharNo : number;
  public phone : number;
  public fphone : number;
  public occupation : string = 'select';
  public occName : string;
	//person = {base64Image: '', name: '', fName:'', gender:'',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'',occName:''};

  username = '';
  email = '';
  constructor(public navCtrl: NavController, private auth: AuthService) {
      let info = this.auth.getUserInfo();
    console.log('info new guest.....',info);
    if(info == undefined){
      this.navCtrl.push(LoginPage);
    }else{
      this.username = info.name;
      this.email = info.email;
    }
  }
  checkPhoneNuber(event, number){
  console.log('number..........',number.length);
  console.log(this.fphone);
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
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

}
