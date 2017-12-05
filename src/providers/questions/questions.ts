import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

/*
  Generated class for the QuestionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionsProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello QuestionsProvider Provider');
  }
   questionList(page) {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
     var dTime = new Date();
     var msec = dTime.getMilliseconds();
  	 var paramCond ={page:page,user_id:this.api.userData.ID,lang:this.api.userLanguage,ctime:msec};
    return new Promise((resolve)=>{
      this.api.getCache('v1/question/all', paramCond).then((questionListData)=>{
        console.log('----------'+JSON.stringify(questionListData));
        resolve(questionListData);
      });  
    });

    // let seq = this.api.get('v1/question/q-a&user_id=1', paramCond).share();
    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //       console.log(res);
    //     } else {
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });
    // return seq;
  }
   askquestion(user_id:any,questionaddData:any) {
      console.log('questionaddData '+questionaddData);
      let body = new FormData();
      body.append('user_id', user_id);
      body.append('title', questionaddData.title);
      body.append('privacy', 'public');
      body.append('message', 'remove description fields');
      body.append('description', 'remove description fields');
      body.append('Attachments', questionaddData.Attachments);

      var Params = questionaddData;  
      console.log(JSON.stringify(questionaddData));
      let seq = this.api.post('v1/question/add', body).share();

      seq.map(res => res.json())
        .subscribe(res => {
          // If the API returned a successful response, mark the user as logged in
          console.log('--add qustion  res---'+JSON.stringify(res));
          if (res.status == 'success') {
            console.log(res);
          } else {
          }
        }, err => {
          console.error('ERROR-qustion----', err);
        });

      return seq;
  }


}
