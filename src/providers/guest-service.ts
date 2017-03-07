import { Http } from '@angular/http';

export class GuestService {

  static get parameters() {
        return [[Http]];
    }
  constructor(public http: Http) {

  }
  public registerGuest(person) {
    console.log('person:::',person);
        var url = 'http://192.168.1.5:9080/pg-management/register/guest';
        //var url = 'http://192.168.1.5:9020/my-events-server/search';
        //var url = 'http://localhost:9020/my-events-server/search';
        var response = this.http.post(url, person).map(res => res.json());
        return response;
    }

}
