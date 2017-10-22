import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from '../api/api';

/*
  Generated class for the ChoupalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChoupalProvider {
  public userLatLong:any;
  constructor(public http: Http,public api:Api) {
    console.log('Hello ChoupalProvider Provider');
    this.userLatLong=api.userLoction;
  }


  getChoupal() {
    var user_id = this.api.userData.ID;
    //http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	var paramCond ={post_type:'services',lat:this.userLatLong.latitude,longe:this.userLatLong.longitude,user_id:user_id};
    let seq = this.api.get('v1/choupal/get', paramCond).share();

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
  postChoupal(uid,message,image) {
    var user_id = this.api.userData.ID;

    let body = new FormData();
    body.append('uid', user_id);
    body.append('lat', this.userLatLong.latitude);
    body.append('longe', this.userLatLong.longitude);
    body.append('message', message);
    body.append('image', image);
    body.append('url', '');
    let seq = this.api.post('v1/choupal/post', body).share();
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
