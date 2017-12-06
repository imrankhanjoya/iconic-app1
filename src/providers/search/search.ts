import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello SearchProvider Provider');
  }


  find(keyword){
    var paramCond ={keyword:keyword,lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/search/find', paramCond).then((searchItem)=>{
	        resolve(searchItem);
	      });  
	    });		
  }


}
