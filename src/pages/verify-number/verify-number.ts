import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the VerifyNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-number',
  templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {

 
  RegisterData = {verifyOtpfirst:'',verifyOtpSecond:'',verifyOtpThired:'',verifyOtpFourth:''}

  public phoneNumber:any;
  public otp:any;
  public VERIFY_OTP:any;
  public VERIFY_TYPE_OTP:any;
  public INVALID_OTP:any;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,public user: User,
    public storage:Storage,
    public loadingCtrl: LoadingController,
    public platform:Platform,
    public translateService: TranslateService) {
      this.translateService.get('VERIFY_TYPE_OTP').subscribe((value) => {
        this.VERIFY_TYPE_OTP = value;
      });
      this.translateService.get('VERIFY_OTP').subscribe((value) => {
        this.VERIFY_OTP = value;
      });
      this.translateService.get('INVALID_OTP').subscribe((value) => {
        this.INVALID_OTP = value;
      });
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
    }*/
    var patt = /\d{4}/;
   var result = 'your 2376'.match(patt);
   
   console.log(result);
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
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
  }
    gotoResiter(){
    this.navCtrl.push('SignupPage');
    }
    verifyNumber(){
    var sendForm = true;
      dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Onboarding',
       'appEventAction': 'Submit',
       'appEventLabel': 'Signup - Verify OTP'
     });
     dataLayer.push({'event': 'appEvent'});
      if(this.RegisterData.verifyOtpfirst.length<1 || this.RegisterData.verifyOtpSecond.length<1 || this.RegisterData.verifyOtpThired.length<1 || this.RegisterData.verifyOtpFourth.length<1){
          this.presentToast(this.VERIFY_TYPE_OTP);
          sendForm = false;
      }

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
            /*SmsReceiver.stopReception(() => {
                console.log("Correctly stopped")
              }, () => {
                console.log("Error while stopping the SMS receiver")
              })*/
            if(resp.status === true){
             this.storage.set('userPhone', this.phoneNumber);
             this.storage.set('userOTP', this.otp);
             this.presentToast(this.VERIFY_OTP);
             this.navCtrl.push('SignupPage');
             loading.dismiss();
            }else{
              this.presentToast(this.INVALID_OTP);
              this.storage.set('userPhone', this.phoneNumber);
              this.storage.set('userOTP', this.otp);
              this.navCtrl.push('SignupPage');
              console.log(resp.msg);
              loading.dismiss();
            }
          }, (err) => {
            loading.dismiss();
           console.log('--unsuccess');
         });
  }

  LoginPage(){
    this.navCtrl.push('LoginPage');
  }
}
