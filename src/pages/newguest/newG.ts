import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
	public person = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:'',amount:0};

  public username = '';
  public email = '';
  public userPhone = '';
  constructor(public navCtrl: NavController, private auth: AuthService, private guestService: GuestService, private alertCtrl: AlertController) {
      let info = this.auth.getUserInfo();

      if(info == undefined){
        this.navCtrl.push(LoginPage);
      }else{
        this.username = info.name;
        this.email = info.email;
        this.userPhone = info.phone;
      }
  }
  checkPhoneNuber(event, number){
    if(number.length==10 && event.keyCode!=8)
      return false;
  }
  takePhoto(pictureSourceType) {
      this.takePicture(Camera.PictureSourceType.CAMERA);
  }

  pickImage() {
      this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
  }
  takePicture(pictureSourceType){
    Camera.getPicture({
        sourceType: pictureSourceType,
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
  takePicture_old(){
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
/********************************/
//FILE_URI
  takeThePhoto(pictureSourceType) {
        Camera.getPicture({
            sourceType: pictureSourceType,
            destinationType: Camera.DestinationType.DATA_URL,
            quality: 50,
            targetWidth: 1000,
            targetHeight:1000
        })
            .then(
            imageURI => {
                window['plugins'].crop.promise(imageURI, {
                    quality: 75
                }).then(newPath => {
                        return this.toBase64(newPath).then((base64Img) => {
                            //this.base64Image = base64Img;
                            this.person.base64Image = "data:image/jpeg;base64," + base64Img;
                        });
                    },
                    error => {
                        console.log("CROP ERROR -> " + JSON.stringify(error));
                        alert("CROP ERROR: " + JSON.stringify(error));
                    }
                    );
            },
            error => {
                console.log("CAMERA ERROR -> " + JSON.stringify(error));
                alert("CAMERA ERROR: " + JSON.stringify(error));
            }
            );
    }

    toBase64(url: string) {
        return new Promise<string>(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    resize(base64Img, width, height) {
        var img = new Image();
        img.src = base64Img;
        var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
    }

    /********************************/

  addGuest(){
    this.guestService.registerGuest(this.person, this.userPhone).subscribe(
        data => {
        	this.person = {base64Image: '', name: '', fName:'', gender:'select',address:'',pin:'',aadharNo:'',phone:'',fphone:'',occupation:'select',occName:'',amount:0};
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
