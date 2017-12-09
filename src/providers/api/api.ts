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
  //url: string = 'http://205.147.100.82/agriboloapiv2/api/web/index.php?r=';
  url: string = 'http://localhost/project/agriboloapiv2/api/web/index.php?r=';
  //url: string = 'http://api.agribolo.com/index.php?r=';
  public userData : {ID:string, display_name:string, sID:string, token:string, user_activation_key:string,
  user_email:string, user_login:string, user_nicename:string, user_registered:string, user_status:string,
  user_url:string}={ID:'0', display_name:'', sID:'', token:'', user_activation_key:'', user_email:'',
  user_login:'', user_nicename:'', user_registered:'', user_status:'', user_url:''};
  public userLoction : {longitude:number,latitude:number} = {longitude:23,latitude:24};
  public userLanguage :string = 'hi_IN';

  constructor(private geolocation: Geolocation,public http: Http,public storage:Storage,public cache:CacheService) {
    storage.get('userData').then((userdata) => {
        console.log('----userData--'+userdata);
        if (userdata) {
          console.log('----userdata get--');
          this.userData=userdata;
        }
     });
    storage.get('userLang').then((userLang) => {
        console.log(userLang);
        if(userLang=='hi'){
          this.userLanguage = 'hi_IN';
        }else{
          this.userLanguage = 'en_US';
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
  changelang(lang){

        console.log(lang);
        if(lang=='hi'){
          this.userLanguage = 'hi_IN';
        }else{
          this.userLanguage = 'en_US';
        }    
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

  getCache(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    let pco:any;
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
      pco = p;
    }
    
    let key = this.url + '/' + endpoint+pco.toString();
    console.log('Data Save key : '+key);
    return this.getCall(key,endpoint,options);

  }

  getCall(key,endpoint,options){
    
    return new Promise((resolve)=>{
          this.cache.getItem(key).catch(() => {}).then((data) => {
                if(typeof data == 'undefined'){
                      let seq = this.http.get(this.url + '/' + endpoint, options).share();
                      seq.map(res => res.json())
                      .subscribe(res => {
                        // If the API returned a successful response, mark the user as logged in
                        if (res.status == 'success' || res.status == true) {
                          this.cache.saveItem(key, res);
                          resolve(res);
                        }else{
                          resolve(res);
                        }
                      }, err => {
                        console.error('ERROR', err);
                        resolve(err);
                      });  
                }else{
                      console.log("Saved data: ",data);
                      resolve(data);
                }
          });
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
