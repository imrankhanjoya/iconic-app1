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
  weatheHourly(tehsil) {
    var paramCond ={lang:this.api.userLanguage,gaphour:'2',tehsil_id:tehsil};

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
    var paramCond ={lang:this.api.userLanguage,gaphour:'2',tehsil_id:tehsil};
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
    var paramCond ={lang:this.api.userLanguage,gaphour:location,tehsil_id:location};
    return new Promise((resolve)=>{
      this.api.getCache('v1/weather/5-days', paramCond).then((weatherfivedaysData)=>{
        resolve(weatherfivedaysData);
      });  
    });
  }
}
