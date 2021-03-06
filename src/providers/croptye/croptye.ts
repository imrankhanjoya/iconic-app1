import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the CroptyeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CroptyeProvider {

  constructor(public http: Http,public api:Api) {
    console.log('Hello CroptyeProvider Provider');
  }
	apicroptype(){
		let seq = this.api.get('v1/crops/crop-type').share();

		seq
		.map(res => res.json())
		.subscribe(res => {
			// If the API returned a successful response, mark the user as logged in
			if (res.status == 'success') {
			 console.log(res);
			}
		}, err => {
			console.error('ERROR', err);
		});

		return seq;
	}

}
