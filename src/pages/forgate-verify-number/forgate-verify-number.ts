import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams,LoadingController,Platform } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ForgateVerifyNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgate-verify-number',
  templateUrl: 'forgate-verify-number.html',
})
export class ForgateVerifyNumberPage {
    public phoneNumber:any;
    public otp:any;
   RegisterData = {verifyOtpfirst:'',verifyOtpSecond:'',verifyOtpThired:'',verifyOtpFourth:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public loadingCtrl: LoadingController,
    public storage:Storage,public platform:Platform) {
  this.phoneNumber=navParams.get('phoneNumber');
    /*if (platform.is('android')) {
      SmsReceiver.startReception(({messageBody, originatingAddress}) => {
          var n = originatingAddress.search('AGRBLO');
          if (n=='-1') {
            console.log('This SMS Not From AgriBolo');
          }else{
             var patt = /\d{4}/;
             var result = messageBody.match(patt);
             var otp=result.toString().split('');
             this.RegisterData.verifyOtpfirst=otp[0];
             this.RegisterData.verifyOtpSecond=otp[1];
             this.RegisterData.verifyOtpThired=otp[2];
             this.RegisterData.verifyOtpFourth=otp[3];
             this.verifyNumberAPI();
          }
      }, () => {
        console.log("Error while receiving messages")
      });
    }
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgateVerifyNumberPage');
  }
  verifyNumber(){

    /*var sendForm = true;
    if(this.RegisterData.verifyOtpfirst.length<1){
        alert('Enter OTP');
        sendForm = false;
    }
    if(this.RegisterData.verifyOtpSecond.length<1){
        alert('Enter OTP');
        sendForm = false;
    }
    if(this.RegisterData.verifyOtpThired.length<1){
        alert('Enter OTP');
        sendForm = false;
    }
    if(this.RegisterData.verifyOtpFourth.length<1){
        alert('Enter OTP');
        sendForm = false;
    }*/

    if(sendForm){
        this.verifyNumberAPI();
    }
  }
  next(el) {
    el.setFocus();
  }
  verifyNumberAPI(){
    let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        this.otp=this.RegisterData.verifyOtpfirst+this.RegisterData.verifyOtpSecond+this.RegisterData.verifyOtpThired+this.RegisterData.verifyOtpFourth;
        console.log('------'+this.otp);
        this.user.verifyNumber(this.phoneNumber,this.otp).map(res => res.json()).subscribe((resp) => {
          if (this.platform.is('android')) {
            SmsReceiver.stopReception(() => {
              console.log("Correctly stopped")
            }, () => {
              console.log("Error while stopping the SMS receiver")
            })
          }
          
          if(resp.status === true){
           this.storage.set('userPhone', this.phoneNumber);
           this.storage.set('userOTP', this.otp);
           console.log(resp.status);
           this.navCtrl.push('ForgatePasswordPage');
           loading.dismiss();
          }else{
            alert(resp.msg)
            /*this.storage.set('userPhone', this.phoneNumber);
            this.storage.set('userOTP', this.otp);
            this.navCtrl.push('ForgatePasswordPage');*/
            console.log(resp.msg);
            loading.dismiss();
          }
        }, (err) => {
          loading.dismiss();
         console.log('--unsuccess');
       });
  }
}
