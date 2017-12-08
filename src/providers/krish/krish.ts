import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

/*
  Generated class for the KrishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KrishProvider {


  constructor(public http: Http, public api: Api) {
    console.log('Hello KrishProvider Provider');
  }
  krishList() {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	 var paramCond ={post_type:'services',lang:this.api.userLanguage};
    let seq = this.api.get('v1/wp/all', paramCond).share();

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


  kendraList(latitude,longitude) {
      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      //ang=en_US&lat=23&long=34
      

    var paramCond ={lat:latitude,long:longitude,lang:'en_US'};
    return new Promise((resolve)=>{
      this.api.get('v1/krishi/nearby-loc', paramCond).then((kendraListData)=>{
        resolve(kendraListData);
      });  
    });
    //  var paramCond ={lat:lat,long:long,lang:'en_US'};
    // let seq = this.api.get('v1/krishi/nearby', paramCond).share();

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
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = (R * c).toFixed(0); // Distance in km
    return d+"Km";
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
