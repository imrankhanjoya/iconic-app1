import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';

/*
  Generated class for the ExpertproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpertproviderProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello ExpertproviderProvider Provider');
  }


    /**
   * Get news for home page
   * the user entered on the form.
   */
  	
  	Experts() {
  		var user_id = this.api.userData.ID;

	  	//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
	  	 var paramCond ={page:0,limit:5,lat:this.api.userLoction.latitude,longe:this.api.userLoction.longitude,user_id:user_id,post_type:'blogs'};
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

}
