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
		var dTime = new Date();
	  	var msec = dTime.getMilliseconds();
	  	var paramCond ={ctime:msec,limit:limit,lang:this.api.userLanguage,tehsil:this.api.userData._user_tehsil,state:this.api.userData._user_district,state:this.api.userData._user_state,user:this.api.userData.user_login};
		return new Promise((resolve)=>{
			this.api.getCache('v1/announcement/notification-all', paramCond).then((announcementList)=>{
			resolve(announcementList);
			});  
		});
	}

	apiusertopcard() {
		var dTime = new Date();
	  	var msec = dTime.getMilliseconds();
	  	var paramCond ={ctime:msec,lang:this.api.userLanguage};
		return new Promise((resolve)=>{
			this.api.getCache('v1/announcement/user-top-card', paramCond).then((apiusertopcard)=>{
			resolve(apiusertopcard);
			});  
		});
	}

}
