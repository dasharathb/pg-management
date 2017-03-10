import { Http, Response, Headers, RequestOptions } from '@angular/http';

export class GuestService {

  static get parameters() {
        return [[Http]];
    }
  constructor(public http: Http) {

  }
  public registerGuest(person) {
    console.log('person:::',person);
        var url = 'http://localhost:9080/pg-management/register/guest';
        //var url = 'http://192.168.1.5:9020/my-events-server/search';
        //var url = 'http://localhost:9020/my-events-server/search';
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        var response = this.http.post(url, JSON.stringify(person), options).map(res => res.json());
        return response;
    }

}
