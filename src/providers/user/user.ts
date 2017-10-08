import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Api } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _otp: any;

  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */


   sendOtp(phoneNumber,name){
   let body = new FormData();
   body.append('phoneNumber', phoneNumber);
   body.append('name', name);


   let seq = this.api.post('v1/user/varify-phone', body).share();

   seq
     .map(res => res.json())
     .subscribe(res => {
       // If the API returned a successful response, mark the user as logged in
       if (res.status == 'success') {

       } else {
       }
     }, err => {
       console.error('ERROR', err);
     });

   return seq;
   }

   verifyNumber(phoneNumber,otp){
   let body = new FormData();
   body.append('phoneNumber', phoneNumber);
   body.append('otp', otp);
   let seq = this.api.post('v1/user/varify-phone', body).share();
   seq
     .map(res => res.json())
     .subscribe(res => {
       // If the API returned a successful response, mark the user as logged in
       if (res.status == 'success') {

       } else {
       }
     }, err => {
       console.error('ERROR', err);
     });

   return seq;
   }

  login(username,password) {
  let body = new FormData();
  body.append('username', username);
  body.append('password', password);
    let seq = this.api.post('v1/user/login', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          //this._loggedIn(res);
          console.log('---hhhhhhhkkkk----');
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  userRegister(lag,long,mobile,name,password,language,state,district,village,crops,vegetables) {
          let body = new FormData();
          
          body.append('lag',lag);
          body.append('long',long);
          body.append('mobile',mobile);//[number as username]
          body.append('user_name',name);
          body.append('email',mobile+'@agribolo.com');
          body.append('password',password);
          body.append('language',language);
          body.append('state',state);
          body.append('district',district);
          body.append('village',village);
          body.append('crops',crops);
          body.append('vegetables',vegetables);

          body.append('irrigationType','');
          body.append('irrigationSource','');
          body.append('landHolding','');
          body.append('LandHoldingType','');

          let seq = this.api.post('v1/user/register', body).share();

          seq
            .map(res => res.json())
            .subscribe(res => {
              // If the API returned a successful response, mark the user as logged in
              if (res.status == 'success') {
                this._loggedIn(res);
              }
            }, err => {
              console.error('ERROR', err);
            });

          return seq;
  }

  /**
   * Send a POST request to our otp endpoint with the data
   * the user entered on the form.
   */
  otp(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status == 'success') {
          this.otpset(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Record OTP status of user
   */
  otpset(res) {
    this._otp = res;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
