import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the ETirdingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ETirdingProvider {

  constructor(public http: Http,public api:Api) {
    console.log('Hello ETirdingProvider Provider');
  }

  crop_etirding(data){
     let body = new FormData();
     body.append('lang', this.api.userLanguage);
     body.append('user_id',data.user_id);
     body.append('crop',data.etrading_crop);
     body.append('varieties',data.etrading_varieties);
     body.append('expect_price', data.etrading_prices);
     body.append('quality', data.etrading_quantity +' ' +data.etrading_quantity_unit);
     body.append('address', data.etrading_address);
     body.append('state', data.user_state_id);
     body.append('district', data.user_district_id);
     body.append('tehsil', data.user_tahsil_id);

     let seq = this.api.post('v1/e-trading/send', body).share();

     seq
       .map(res => res.json())
       .subscribe(res => {
         // If the API returned a successful response, mark the user as logged in
         if (res.status == 'success') {

         } else {
         }
       }, err => {
         console.error('ERROR', err);
       });

     return seq;
   }

sendCrop_etriding(lang){
    var paramCond ={lang:this.api.userLanguage};
    return new Promise((resolve)=>{
      this.api.getCache('v1/crops/all', paramCond).then((sendCropData)=>{
          resolve(sendCropData);
        });  
      });

}
send_varieties_etriding(crop_id){
    var paramCond ={lang:this.api.userLanguage,crop_id:crop_id};
    return new Promise((resolve)=>{
      this.api.getCache('v1/crops/crop-varieties', paramCond).then((sendCropData)=>{
          resolve(sendCropData);
        });  
      });

}
  crop_find(keyword){
    var paramCond ={keyword:keyword};
      return new Promise((resolve)=>{
        this.api.getCache('v1/crops/find', paramCond).then((searchItem)=>{
          resolve(searchItem);
        });  
      });
    
  }
   

}