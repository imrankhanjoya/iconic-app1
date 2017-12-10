import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';
/*
  Generated class for the ExpertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpertsProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello ExpertsProvider Provider');
  }

  Experts_list(post_type='blogs',limit=3,page=0) {
    var paramCond ={post_type:post_type,lang:this.api.userLanguage,limit:limit,page:page};
    return new Promise((resolve)=>{
      this.api.getCache('v1/wp/all', paramCond).then((Experts_listData)=>{
        resolve(Experts_listData);
      });  
    });
  }
  
  Experts_Cat_list(post_type='blogs',limit=3,slug) {
    var paramCond ={post_type:post_type,lang:this.api.userLanguage,limit:limit,slug:slug};
    let seq = this.api.get('v1/wp/cat-post', paramCond).share();
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

  Cat_list(parent_id) {
    var paramCond ={parent_id:parent_id,lang:this.api.userLanguage};
    let seq = this.api.get('v1/wp/post-cat', paramCond).share();
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

  Experts_detail(expertids) {
      console.log(expertids+'my ost detail by noser');
     var paramCond ={post_id:expertids,lang:this.api.userLanguage};
    let seq = this.api.get('v1/wp/detail', paramCond).share();
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