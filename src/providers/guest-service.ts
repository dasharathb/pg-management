import { Http, Headers, RequestOptions } from '@angular/http';
import * as ApiUrl from './api-url';
export class GuestService {

  static get parameters() {
        return [[Http]];
    }
  constructor(public http: Http) {

  }
  public registerGuest(person, userName) {
    console.log('person:::',person);
        //var url = 'http://localhost:9080/pg-management/register/guest/'+userName;
        //var url = 'http://183.83.128.106:9080/pg-management/register/guest/'+userName;
        var url = ApiUrl.API_ENDPOINT+'/register/guest/'+userName;
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        var response = this.http.post(url, JSON.stringify(person), options).map(res => res.json());
        return response;
    }
    public getGuests(userName) {
      //console.log('userName:::',userName);
          //var url = 'http://localhost:9080/pg-management/api/guests/'+userName;
          //var url = 'http://183.83.128.106:9080/pg-management/api/guests/'+userName;
          var url = ApiUrl.API_ENDPOINT+'/api/guests/'+userName;
          var response = this.http.get(url).map(res => res.json());
          return response;
      }
    public getGuestInfo(userPhone, guestId){
        console.log('userPhone:::',userPhone);
        //var url = 'http://localhost:9080/pg-management/api/guest/info/'+userPhone+'/'+guestId;
        //var url = 'http://183.83.128.106:9080/pg-management/api/guest/info/'+userPhone+'/'+guestId;
        var url = ApiUrl.API_ENDPOINT+'/api/guest/info/'+userPhone+'/'+guestId;
        var response = this.http.get(url).map(res => res.json());
        return response;
      }
      public getGuestCount(userPhone){
          //console.log('userPhone:::',userPhone);
          //var url = 'http://localhost:9080/pg-management/api/guest/count/'+userPhone;
          //var url = 'http://183.83.128.106:9080/pg-management/api/guest/count/'+userPhone;
          var url = ApiUrl.API_ENDPOINT+'/api/guest/count/'+userPhone;
          var response = this.http.get(url).map(res => res.json());
          return response;
        }

        public getFeeDueInfo(userPhone){
        console.log('Constants.API_ENDPOINT:::::::::::::::::::::::',ApiUrl.API_ENDPOINT);
            console.log('userPhone:: fee due:',userPhone);
            //var url = 'http://localhost:9080/pg-management/api/fee/due/'+userPhone;
            //var url = 'http://183.83.128.106:9080/pg-management/api/fee/due/'+userPhone;
            var url = ApiUrl.API_ENDPOINT+'/api/fee/due/'+userPhone;
            var response = this.http.get(url).map(res => res.json());
            return response;
          }

        public feePaid(userPhone, guestId, amount){
            //var url = 'http://localhost:9080/pg-management/api/fee/paid/'+userPhone+'/'+guestId+'/'+amount;
            //var url = 'http://183.83.128.106:9080/pg-management/api/fee/paid/'+userPhone+'/'+guestId+'/'+amount;
            var url = ApiUrl.API_ENDPOINT+'/api/fee/paid/'+userPhone+'/'+guestId+'/'+amount;
            var response = this.http.get(url).map(res => res.json());
            return response;
        }

        public updateGuestInOutInfo(reason, phone, guestId){
            //var url = 'http://localhost:9080/pg-management/api/in/out/'+phone+'/'+guestId;
            //var url = 'http://183.83.128.106:9080/pg-management/api/in/out/'+phone+'/'+guestId;
            var url = ApiUrl.API_ENDPOINT+'/api/in/out/'+phone+'/'+guestId;
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            var response = this.http.put(url, JSON.stringify(reason), options).map(res => res.json());
            return response;
        }
}
