import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://205.147.100.82/agriboloapiv2/api/web/index.php?r=';
  //url: string = 'http://localhost/project/agriboloapiv2/api/web/index.php?r=';

  public userData : {ID:string, display_name:string, sID:string, token:string, user_activation_key:string,
    user_email:string, user_login:string, user_nicename:string, user_registered:string, user_status:string,
    user_url:string}={ID:'0', display_name:'', sID:'', token:'', user_activation_key:'', user_email:'',
    user_login:'', user_nicename:'', user_registered:'', user_status:'', user_url:''};

  public userLoction : {accuracy:string,altitude:string,altitudeAccuracy:string,heading:string,latitude:string,
    longitude:string}={accuracy:'',altitude:'',altitudeAccuracy:'',heading:'',latitude:'',longitude:''};

  constructor(public http: Http,public storage:Storage) {
    storage.get('userData').then((userdata) => {
        console.log('----userData--'+userdata);
        if (userdata) {
          console.log('----userdata get--');
          this.userData=userdata;
        }
     });
    storage.get('userLoction').then((userloction) => {
        if (userloction) {
          this.userLoction=userloction;
        }
     });
  }
  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
