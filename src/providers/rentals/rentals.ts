import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';/*
  Generated class for the RentalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RentalsProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello RentalsProvider Provider');
  }


  Rental_list(page,limit,id) {
    var paramCond ={page:page,id:id,limit:limit,lang:this.api.userLanguage,'changetest':1};
    return new Promise((resolve)=>{
      this.api.getCache('v1/rental/all', paramCond).then((rentaldata)=>{
        resolve(rentaldata);
      });  
    });
  }

  Rental_Detail(rentalid) {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	console.log(rentalid+'my ost detail by noser');
  	var paramCond ={id:rentalid ,lang:this.api.userLanguage};
    let seq = this.api.get('v1/rental/all', paramCond).share();

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

  Contact(data) {

    let body = new FormData();
        body.append('user_id',this.api.userData.ID);
        body.append('product',data.product);
        body.append('type',data.type);
        body.append('expected_price',data.expected_price);
        body.append('farmer_name',data.farmer_name);
        body.append('date_from',data.date_from);
        body.append('to_date',data.to_date);
        body.append('time_from',data.time_from);
        body.append('to_time',data.to_time);
        body.append('duration',data.duration);
        body.append('user_state_id',data.user_state_id);
        body.append('user_district_id',data.user_district_id);
        body.append('user_tahsil_id',data.user_tahsil_id);
        body.append('address',data.address);
    let seq = this.api.post('v1/rental/contact',body).share();
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
