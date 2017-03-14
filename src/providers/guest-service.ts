import { Http, Headers, RequestOptions } from '@angular/http';

export class GuestService {

  static get parameters() {
        return [[Http]];
    }
  constructor(public http: Http) {

  }
  public registerGuest(person, userName) {
    console.log('person:::',person);
        //var url = 'http://localhost:9080/pg-management/register/guest';
        var url = 'http://192.168.1.5:9080/pg-management/register/guest/'+userName;
        //var url = 'http://localhost:9020/pg-management/register/guest';
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        var response = this.http.post(url, JSON.stringify(person), options).map(res => res.json());
        return response;
    }
    public getGuests(userName) {
      console.log('userName:::',userName);
          //var url = 'http://localhost:9080/pg-management/register/guest';
          var url = 'http://192.168.1.5:9080/pg-management/api/guests/'+userName;
          //var url = 'http://localhost:9020/pg-management/register/guest';
          //let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
          //let options       = new RequestOptions({ headers: headers });
          var response = this.http.get(url).map(res => res.json());
          return response;
      }
    public getGuestInfo(userPhone, guestId){
        console.log('userPhone:::',userPhone);
        //var url = 'http://localhost:9080/pg-management/register/guest';
        var url = 'http://192.168.1.5:9080/pg-management/api/guest/info/'+userPhone+'/'+guestId;
        //var url = 'http://localhost:9020/pg-management/register/guest';
        //let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        //let options       = new RequestOptions({ headers: headers });
        var response = this.http.get(url).map(res => res.json());
        return response;
      }
}
