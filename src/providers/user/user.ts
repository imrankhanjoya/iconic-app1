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
    body.append('lang', this.api.userLanguage);
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
  userUpdateProImg(userId,image) {
  let body = new FormData();
  body.append('lang', this.api.userLanguage);
  body.append('user_id', userId);
  body.append('image', image);
    let seq = this.api.post('v1/user/update', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {
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
  userRegister(lag,long,mobile,name,password,language,state,district,village,crops,tehsilId) {
          let body = new FormData();
  
          body.append('latitude',lag);
          body.append('longitude',long);
          body.append('user_name',mobile);//[number as username]
          body.append('display_name',name);
          body.append('user_email',mobile+'@agribolo.com');
          body.append('user_pass',password);
          body.append('user_language',language);
          body.append('user_state_id',state);
          body.append('user_district_id',district);
          body.append('user_tahsil_id',tehsilId);
          body.append('user_place','1');

          
          body.append('crops',crops);
          console.log(crops);


          body.append('user_irrigation_type','empty');
          body.append('user_irrigation_source','empty');
          body.append('user_landholding_size','0');
          body.append('user_landholding_size_unit','empty');
          

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
   * Forgot Password status of user
   */
   sendPasswordOtp(phoneNumber,name){
   let body = new FormData();
   body.append('phoneNumber', phoneNumber);
   body.append('name', name);


   let seq = this.api.post('v1/user/reset-varify-phone', body).share();

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
  /**
   * Reset Password of user
   */
   ResetPassword(phoneNumber,password){
     let body = new FormData();
     body.append('phoneNumber', phoneNumber);
     body.append('password', password);

      console.log(phoneNumber + password);

     let seq = this.api.post('v1/user/forgot-password', body).share();

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
   
  /**
   * Reset Password of user
   */
   ChangePassword(phoneNumber,password,old_pass){
     let body = new FormData();
     body.append('phoneNumber', phoneNumber);
     body.append('password', password);
     body.append('old_pass', old_pass);

      console.log(phoneNumber + password);

     let seq = this.api.post('v1/user/change-password', body).share();

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
   
  /**
   * Update Location
   */
   UpdateLocation(user_id,user_state_id,user_district_id,user_tahsil_id){
     let body = new FormData();
     body.append('lang', this.api.userLanguage);
     body.append('user_id', user_id);
     body.append('user_state_id', user_state_id);
     body.append('user_district_id', user_district_id);
     body.append('user_tahsil_id', user_tahsil_id);

     let seq = this.api.post('v1/user/update', body).share();

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
   
  /**
   * Update Profile
   */
   UpdateProfile(user_id,profiledata){
     let body = new FormData();
     body.append('lang', this.api.userLanguage);
     body.append('user_id', user_id);
     console.log(profiledata);
     body.append('display_name', profiledata.display_name);
     body.append('user_irrigation_source', profiledata.user_irrigation_source);
     body.append('user_irrigation_type', profiledata.user_irrigation_type);
     body.append('user_landholding_size', profiledata.user_landholding_size);
     body.append('user_landholding_size_unit', profiledata.user_landholding_size_unit);
     body.append('user_language', profiledata.user_language);

     let seq = this.api.post('v1/user/update', body).share();

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
   
  /**
   * Update Crops
   */
    UpdateCrops(user_id,crops,lang){
        let body = new FormData();
        body.append('lang', this.api.userLanguage);
        body.append('user_id',user_id);
        body.append('crops',crops);
        body.append('lang',lang);
        let seq = this.api.post('v1/user/crop-update', body).share();

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
   
  /**
   * Update Profile
   */
   UpdateToken(token,user_id){
     let body = new FormData();
     body.append('user_id', user_id);
     body.append('token', token);
      
     let seq = this.api.post('v1/user/update-token', body).share();

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
    
    CheckappVersion(Version) {
      var paramCond ={version:Version};
      let seq = this.api.get('v1/appversion/check-version', paramCond).share();
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
       console.log('get function for chatlist');
      return seq;
    }
}
