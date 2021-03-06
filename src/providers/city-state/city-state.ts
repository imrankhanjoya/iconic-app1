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
  getState(lang='') {
    var paramCond ={lang:this.api.userLanguage};
    return new Promise((resolve)=>{
      this.api.getCache('v1/location/state', paramCond).then((getStateData)=>{
        resolve(getStateData);
      });  
    });
  }

  getMandiState(lang='') {
    var paramCond ={lang:this.api.userLanguage};
    return new Promise((resolve)=>{
      this.api.getCache('v1/location/mandi-state', paramCond).then((getStateData)=>{
        resolve(getStateData);
      });  
    });
  }

  getMandiDistrict(lang='',stateId) {
    var paramCond ={lang:this.api.userLanguage,district_state:stateId};
    return new Promise((resolve)=>{
      this.api.getCache('v1/location/mandi-districts', paramCond).then((getDistrictData)=>{
        resolve(getDistrictData);
      });  
    });
  }

  getDistrict(lang='',stateId) {
    var paramCond ={lang:this.api.userLanguage,district_state:stateId};
    return new Promise((resolve)=>{
      this.api.getCache('v1/location/districts', paramCond).then((getDistrictData)=>{
        resolve(getDistrictData);
      });  
    });

    //  var paramCond ={lang:lang,district_state:stateId};
    // let seq = this.api.get('v1/location/districts',paramCond).share();

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

  getTehsil(lang='',districtid) {
     var paramCond ={lang:this.api.userLanguage,districtid:districtid};
     return new Promise((resolve)=>{
        this.api.getCache('v1/location/tehsil', paramCond).then((getTehsilData)=>{
          resolve(getTehsilData);
        });  
      });

    // let seq = this.api.get('v1/location/tehsil',paramCond).share();

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


  getMarket(lang='',districtId) {

        var paramCond ={lang:this.api.userLanguage,district_state:districtId};

        return new Promise((resolve)=>{
        this.api.getCache('v1/location/market', paramCond).then((getMarketData)=>{
            resolve(getMarketData);
          });  
        });

        // let seq = this.api.get('v1/location/market',paramCond).share();

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

  sendCrop(lang='',croptype){

    var paramCond ={lang:this.api.userLanguage,croptype:croptype};
    return new Promise((resolve)=>{
      this.api.getCache('v1/crops/all', paramCond).then((sendCropData)=>{
          resolve(sendCropData);
        });  
      });

     // let seq = this.api.get('v1/crops/all',paramCond).share();
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

    
 

  GroupCrop(lang=''){

    var paramCond ={lang:this.api.userLanguage};
    return new Promise((resolve)=>{
      this.api.getCache('v1/crops/crop-group', paramCond).then((sendCropData)=>{
          resolve(sendCropData);
        });  
      });

    // let seq = this.api.get('v1/crops/all',paramCond).share();

    // seq
    // .map(res => res.json())
    // .subscribe(res => {
    //  // If the API returned a successful response, mark the user as logged in
    //  if (res.status == 'success') {
    //   console.log(res);
    //  }
    // }, err => {
    //  console.error('ERROR', err);
    // });

    // return seq;
  }
}
