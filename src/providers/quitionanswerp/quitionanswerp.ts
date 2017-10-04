import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from '../api/api';

/*
  Generated class for the QuitionanswerpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuitionanswerpProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello QuitionanswerpProvider Provider');
  }
   	answerquestion(answerdata:any,quistion_id:any) {
	      console.log('answerdata '+answerdata);
	      let body = new FormData();
	      body.append('user_id', answerdata.user_id);
	      body.append('title', answerdata.title);
	      body.append('description', answerdata.description);
	      body.append('quistion_id', quistion_id);

	      var Params = answerdata;  
	      let seq = this.api.post('v1/question/answer-add', body).share();

	      seq.map(res => res.json())
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
