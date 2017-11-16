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
  mandiRates(DistrictId,marketId,filter_crops,crop_id) {

  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	var paramCond ={page:0,district_id:DistrictId,market_id:marketId,filter_crops:JSON.stringify(filter_crops),user_id:this.api.userData.ID,latitude:this.api.userLoction.latitude,longitude:this.api.userLoction.longitude,lang:this.api.userLanguage,crop_id:crop_id};
     return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/all-crop', paramCond).then((mandiRatesData)=>{
          resolve(mandiRatesData);
        });  
      });

    // let seq = this.api.get('v1/mandi/all-crop', paramCond).share();
    // seq
    //   .map(res => res.json())
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
  }

   usermandi(userId,geoLoc) {


      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      
      var paramCond ={page:0,user_id:userId,lat:geoLoc.lat,long:geoLoc.lng,lang:this.api.userLanguage};
      return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/user-mandi', paramCond).then((usermandiData)=>{
          resolve(usermandiData);
        });  
      });

    // var paramCond ={page:0,user_id:userId,lat:geoLoc.lat,lang:geoLoc.lng};
    // let seq = this.api.get('v1/mandi/user-mandi', paramCond).share();


    // seq
    //   .map(res => res.json())
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
  }

  commudity(lang) {


      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      var paramCond ={lang:this.api.userLanguage};
      return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/commudity', paramCond).then((commudityData)=>{
          resolve(commudityData);
        });  
      });

      // let seq = this.api.get('v1/mandi/commudity', paramCond).share();
      // seq
      // .map(res => res.json())
      // .subscribe(res => {
      // // If the API returned a successful response, mark the user as logged in
      // if (res.status == 'success') {
      // console.log(res);
      // } else {
      // }
      // }, err => {
      // console.error('ERROR', err);
      // });
      // return seq;
  }





}
