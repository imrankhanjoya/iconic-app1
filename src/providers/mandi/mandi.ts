import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';


/*
  Generated class for the MandiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MandiProvider {
	public _mandiRates: any;
  constructor(public http: Http, public api: Api) {
    console.log('Hello MandiProvider Provider');
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  mandiRates(marketId,filter_crops) {

  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	var paramCond ={page:0,market_id:marketId,filter_crops:JSON.stringify(filter_crops),latitude:this.api.userLoction.latitude,longitude:this.api.userLoction.longitude};
    let seq = this.api.get('v1/mandi/all-crop', paramCond).share();

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

   usermandi(userId,stateId) {


      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
    var paramCond ={page:0,state_id:stateId,user_id:userId};
    let seq = this.api.get('v1/user-detail/mandi', paramCond).share();

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

  commudity(lang) {


      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      var paramCond ={lang:lang};
      let seq = this.api.get('v1/mandi/commudity', paramCond).share();
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
