import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  phone: string;
  email: string;

  constructor(name: string, phone: string, email: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
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
        let access = (credentials.password === "pass" && credentials.phone === "9966711772");
        this.currentUser = new User('Simon', '9966711772', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
