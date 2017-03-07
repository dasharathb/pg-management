import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import { AuthService } from '../../providers/auth-service';
import { GuestService } from '../../providers/guest-service';
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
	public person = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:''};

  username = '';
  email = '';
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService) {
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
        this.person.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  addGuest(){
    console.log('person details::::::',this.person);
    this.guestService.registerGuest(this.person).subscribe(
        data => {
        	console.log('data ::::::',data);
          /*  this.hallResult = data;
            this.hallResult.forEach((hall) =>{  // foreach statement
            	hall.image = this.sanitizer.bypassSecurityTrustStyle('url(' + hall.image + ')');
            	console.log(" hall ::::=:"+hall.image);
            })
              */
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }

}
