import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Events } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the ForgatePasswordMobileNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgate-password-mobile-number',
  templateUrl: 'forgate-password-mobile-number.html',
})
export class ForgatePasswordMobileNumberPage {
  RegisterData = {phoneNumber:''}
  public name='agribolo';
  public phoneNumberError:any;
  constructor(public navCtrl: NavController, public events: Events,public navParams: NavParams,public user: User,  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private androidPermissions: AndroidPermissions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgatePasswordMobileNumberPage');
  }
  sendOtp(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Forgot Password',
         'appEventAction': 'Submit',
         'appEventLabel': 'Phone Number'
       });
     dataLayer.push({'event': 'appEvent'});
    var sendForm = true;
    if(this.RegisterData.phoneNumber.length<10){
      this.phoneNumberError = true;
        sendForm = false;
    }else{
      this.phoneNumberError = false;
    }
    if(sendForm){
      this.cheakSmsPermission();
    }
  }
  cheakSmsPermission(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECEIVE_SMS).then(()=>{
      console.log('checkPermission Pass');
      this.smsRequestPermission();
    },(err) =>{
      console.log('checkPermission Fail');
      this.smsRequestPermission();
    }); 
  }
  smsRequestPermission(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECEIVE_SMS).then(() =>{
      console.log('requestPermission pass');
      this.sendPasswordOtpAPI();
    },() =>{
      console.log('requestPermission Fail');
      this.sendPasswordOtpAPI();
    });
  }
   LoginPage(){
    this.navCtrl.push('LoginPage');
  }
  sendPasswordOtpAPI(){
    let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
        this.user.sendPasswordOtp(this.RegisterData.phoneNumber,this.name).map(res => res.json()).subscribe((resp) => {
        if(resp.status === true){
          console.log(resp.status);
          this.navCtrl.push('ForgateVerifyNumberPage',{phoneNumber:this.RegisterData.phoneNumber});
          loading.dismiss();
        }else{
          alert(resp.msg)
          console.log('number unValid');
          loading.dismiss();
        }
      }, (err) => {
        loading.dismiss();
        console.log('--unsuccess')
      });
  }
}
