import { Http, Headers, RequestOptions } from '@angular/http';
import * as ApiUrl from './api-url';
export class GuestService {

  static get parameters() {
        return [[Http]];
    }
  constructor(public http: Http) {

  }
  public registerGuest(person, userName) {

        var url = ApiUrl.API_ENDPOINT+'/register/guest/'+userName;
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers });
        var response = this.http.post(url, JSON.stringify(person), options).map(res => res.json());
        return response;
    }
    public getGuests(userName) {

          var url = ApiUrl.API_ENDPOINT+'/api/guests/'+userName;
          var response = this.http.get(url).map(res => res.json());
          return response;
      }
    public getGuestInfo(userPhone, guestId){

        var url = ApiUrl.API_ENDPOINT+'/api/guest/info/'+userPhone+'/'+guestId;
        var response = this.http.get(url).map(res => res.json());
        return response;
      }
      public getGuestCount(userPhone){

          var url = ApiUrl.API_ENDPOINT+'/api/guest/count/'+userPhone;
          var response = this.http.get(url).map(res => res.json());
          return response;
        }

        public getFeeDueInfo(userPhone){

            var url = ApiUrl.API_ENDPOINT+'/api/fee/due/'+userPhone;
            var response = this.http.get(url).map(res => res.json());
            return response;
          }

        public feePaid(userPhone, guestId, amount){

            var url = ApiUrl.API_ENDPOINT+'/api/fee/paid/'+userPhone+'/'+guestId+'/'+amount;
            var response = this.http.get(url).map(res => res.json());
            return response;
        }

        public updateGuestInOutInfo(reason, phone, guestId){
            
            var url = ApiUrl.API_ENDPOINT+'/api/in/out/'+phone+'/'+guestId;
            let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options       = new RequestOptions({ headers: headers });
            var response = this.http.put(url, JSON.stringify(reason), options).map(res => res.json());
            return response;
        }
}
