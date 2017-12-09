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
  mandiRates(DistrictId,marketId,filter_crops,crop_id,tehsil_id) {
  	var paramCond ={page:0,district_id:DistrictId,market_id:marketId,tehsil_id:tehsil_id,filter_crops:JSON.stringify(filter_crops),user_id:this.api.userData.ID,lang:this.api.userLanguage,crop_id:crop_id};
     return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/all-crop', paramCond).then((mandiRatesData)=>{
          resolve(mandiRatesData);
        });  
      });
  }

   usermandi(userId,tehsil_id) {
      var paramCond ={page:0,user_id:userId,tehsil_id:tehsil_id,lang:this.api.userLanguage};
      return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/user-mandi', paramCond).then((usermandiData)=>{
          resolve(usermandiData);
        });  
      });
  }

  commudity(lang) {
      var paramCond ={lang:this.api.userLanguage};
      return new Promise((resolve)=>{
        this.api.getCache('v1/mandi/commudity', paramCond).then((commudityData)=>{
          resolve(commudityData);
        });  
      });
  }
}
