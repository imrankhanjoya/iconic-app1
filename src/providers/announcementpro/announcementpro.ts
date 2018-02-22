import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';

/*
  Generated class for the AnnouncementproProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnnouncementproProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello AnnouncementproProvider Provider');
  }

	announcementList(limit) {	  
		var paramCond ={limit:limit,lang:this.api.userLanguage,tehsil:this.api.userData._user_tehsil,state:this.api.userData._user_district,state:this.api.userData._user_state,user:this.api.userData.user_login};
	    let seq = this.api.get('v1/announcement/all', paramCond).share();
	    seq
	      .map(res => res.json())
	      .subscribe(res => {
	        if (res.status == 'success') {
	          console.log(res);
	        } else {
	        }
	      }, err => {
	        console.error('ERROR', err);
	      });
	    return seq;
	}

	NotificationtList(limit) {	  
		var paramCond ={limit:limit,lang:this.api.userLanguage,tehsil:this.api.userData._user_tehsil,district:this.api.userData._user_district,state:this.api.userData._user_state,user:this.api.userData.user_login};
	    let seq = this.api.get('v1/announcement/notification-all', paramCond).share();
	    seq
	      .map(res => res.json())
	      .subscribe(res => {
	        if (res.status == 'success') {
	          console.log(res);
	        } else {
	        }
	      }, err => {
	        console.error('ERROR', err);
	      });
	    return seq;
	}

	apiusertopcard() {
		var paramCond ={lang:this.api.userLanguage};
	    let seq = this.api.get('v1/announcement/user-top-card', paramCond).share();
	    seq
	      .map(res => res.json())
	      .subscribe(res => {
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
