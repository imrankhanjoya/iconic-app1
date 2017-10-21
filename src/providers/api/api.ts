import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import "rxjs/add/operator/share";


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

  public userLoction : {longitude:number,latitude:number} = {longitude:0,latitude:0};

  constructor(private geolocation: Geolocation,public http: Http,public storage:Storage,public cache:CacheService) {
    storage.get('userData').then((userdata) => {
        console.log('----userData--'+userdata);
        if (userdata) {
          console.log('----userdata get--');
          this.userData=userdata;
        }
     });
     this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.userLoction.latitude = resp.coords.latitude;
       this.userLoction.longitude = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
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
    //let cacheKey = this.url;
    //let request = this.http.get(this.url + '/' + endpoint, options);
    //return this.cache.loadFromObservable(cacheKey, request);
    // let key = this.url + '/' + endpoint;
    // let apiurl = this.url + '/' + endpoint;
    // return this.getCall(key,this.url,endpoint,options);
  }

  getCall(key,url,endpoint,options){
    console.log(key);
    this.cache.getItem(key).catch(() => {
    // fall here if item is expired or doesn't exist 
    let result = this.http.get(url + '/' + endpoint, options).map(res => res.json());
    return this.cache.saveItem(key, result);
    }).then((data) => {
        console.log("Saved data: ", data);
        return data;
    });

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
