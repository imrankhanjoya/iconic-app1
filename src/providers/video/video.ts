import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

/*
  Generated class for the VideoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello VideoProvider Provider');
  }
   video_list() {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
  	 var paramCond ={post_type:'agri_video',lang:'en_US'};
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
