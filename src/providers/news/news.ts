import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



import { Api } from '../api/api';



/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello NewsProvider Provider');
  }

    /**
   * Get news for home page
   * the user entered on the form.
   */
  homeNews(limit) {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
      

    var paramCond ={page:0,limit:limit,lang:this.api.userLanguage};
    return new Promise((resolve)=>{
      this.api.getCache('v1/news/all', paramCond).then((weatherdetail)=>{
        resolve(weatherdetail);
      });  
    });
    
  	 
  }

}
