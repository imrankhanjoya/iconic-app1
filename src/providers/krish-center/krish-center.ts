import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';
/*
  Generated class for the KrishCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KrishCenterProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello KrishCenterProvider Provider');
  }
   krish_centerlist() {
      //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      var paramCond ={page:0,post_type:'blogs ',lang:'en_US'};
      return new Promise((resolve)=>{
        this.api.getCache('v1/wp/detail', paramCond).then((krish_centerlist)=>{
          resolve(krish_centerlist);
        });  
      });
  }

}
