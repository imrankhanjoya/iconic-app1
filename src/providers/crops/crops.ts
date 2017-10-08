import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the CityStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CropsProvider {

  constructor(public http: Http,public api:Api) {
    console.log('Hello CityStateProvider Provider');
  }
 

	sendCrop(lang){
		var paramCond ={lang:'en_US'};
		let seq = this.api.get('v1/crops/all',paramCond).share();

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

	sendCropGroupType(lang,crop_type){
		var paramCond ={lang:'en_US',crop_type:crop_type};
		let seq = this.api.get('v1/crops/find',paramCond).share();

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

	sendCropDetail(crop_id){
		var paramCond ={crop_id:crop_id};
		let seq = this.api.get('/v1/crops/view',paramCond).share();

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
