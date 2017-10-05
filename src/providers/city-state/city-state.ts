import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the CityStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CityStateProvider {

  constructor(public http: Http,public api:Api) {
    console.log('Hello CityStateProvider Provider');
  }
  getState(lang) {
     var paramCond ={lang:lang};
    let seq = this.api.get('v1/location/state',paramCond).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
      if (res.status == true) {
        console.log(res);
      } else {
        console.log(res);
      }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  getCity() {
     var paramCond ={lang:'hi_IN',city_state:29};
    let seq = this.api.get('v1/location/cites',paramCond).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          console.log(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


  sendCrop(lang){
var paramCond ={lang:'en_US'};
 let seq = this.api.get('v1/crops/all',paramCond).share();

 seq
   .map(res => res.json())
   .subscribe(res => {
     // If the API returned a successful response, mark the user as logged in
     if (res.status == 'success') {
       console.log(res);
     } else {
     }
   }, err => {
     console.error('ERROR', err);
   });

 return seq;
  }
}
