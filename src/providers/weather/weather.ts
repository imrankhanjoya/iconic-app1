import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



import { Api } from '../api/api';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello WeatherProvider Provider');
  }


  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  weatheHourly() {
      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
    var paramCond ={lang:'hi_IN',gaphour:'2'};

    return new Promise((resolve)=>{
      this.api.getCache('v1/weather/weather-hourly', paramCond).then((wdata)=>{
        resolve(wdata);
      });  
    });
    
  
    
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  weatherdetail(tehsil) {
      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
    // var paramCond ={lang:'hi_IN',gaphour:'2',tehsil_id:tehsil};
    // let seq = this.api.get('v1/weather/current-conditions', paramCond).share();
    // console.log(seq);
    // seq.map(res => res.json())
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //       console.log(res);
    //     } else {
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });

    // return seq;

    var paramCond ={lang:'hi_IN',gaphour:'2',tehsil_id:tehsil};
    return new Promise((resolve)=>{
      this.api.getCache('v1/weather/current-conditions', paramCond).then((weatherdetail)=>{
        resolve(weatherdetail);
      });  
    });


  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  weatherfivedays(location) {
      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
    var paramCond ={lang:'hi_IN',gaphour:location};
    let seq = this.api.get('v1/weather/5-days', paramCond).share();

    seq.map(res => res.json())
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
