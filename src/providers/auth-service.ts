import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  phone: string;
  email: string;
  password: string;
  hFee: number;
  deviceId: string;

  constructor(name: string, phone: string, email: string, password: string, hFee: number, deviceId: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password= password;
    this.hFee= hFee;
    this.deviceId= deviceId;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http) {

  }
  public login(credentials) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        var url = 'http://localhost:9080/pg-management/get/user/'+credentials.phone+'/'+credentials.password+'/'+credentials.deviceId;
        //var url = 'http://183.83.128.106:9080/pg-management/get/user/'+credentials.phone+'/'+credentials.password+'/'+credentials.deviceId;

        this.http.get(url).map(res => res.json()).subscribe(success => {

        //  console.log('success ::::::::::::::: ',success);
          if (success) {

            let access = true;// (credentials.password === "pass" && credentials.phone === "9966711772");
            this.currentUser = new User(success.name, success.phone, success.email, success.password, success.hFee, success.deviceId);
            observer.next(access);
            observer.complete();
          } else {
            return Observable.throw("Please insert credentials");
          }
        },
        error => {
          return Observable.throw("Please insert credentials");
        });


      });
    }
  }

  public register(credentials) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
    //console.log('service  :::::::::::: ',credentials);
      // At this point store the credentials to your backend!
      var url = 'http://localhost:9080/pg-management/user/register';
      //var url = 'http://183.83.128.106:9080/pg-management/user/register';

      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers });

      var response = this.http.post(url, JSON.stringify(credentials), options).map(res => res.json());

      return response;

      /*return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });*/
    }
  }
  public addUserToLocalStorage(user){
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
  }

  public getUserDtl(deviceUUId) {
    var url = 'http://localhost:9080/pg-management/user/'+deviceUUId;
    //var url = 'http://183.83.128.106:9080/pg-management/user/'+deviceUUId;

                   //this.http.get(url).map(res => res.json())
    var response = this.http.get(url).map(res => res.json());
  //  console.log('getUserDtl ::: response:::::::::::::::::::::::::::::::',response);


    return response;
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
public setUserInfo(data){
  this.currentUser = new User(data.name, data.phone, data.email, data.password, data.hFee, data.deviceId);
}
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
