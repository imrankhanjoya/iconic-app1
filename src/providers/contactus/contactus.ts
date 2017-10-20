import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the ContactusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactusProvider {

	constructor(public http: Http, public api: Api) {
    	console.log('Hello ContactusProvider Provider');
  	}

	Send(data) {
		console.log('data');
		console.log(data);
		console.log('data');
		let body = new FormData();
        body.append('user_id',data.ID);
        body.append('contact_id',data.contact_id);
        body.append('contact_type',data.contact_type);
        body.append('name',data.display_name);
        body.append('email','');
        body.append('state',data.state_name);
        body.append('district',data.district_name);
        body.append('tehsil',data.tehsil_name);
        body.append('mobile',data.user_login);
        body.append('subject',data.subject);
        body.append('message',data.message);
		let seq = this.api.post('v1/contact-us/send',body).share();

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
