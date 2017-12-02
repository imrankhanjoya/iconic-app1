import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,  public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private androidPermissions: AndroidPermissions) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgatePasswordMobileNumberPage');
  }
  sendOtp(){


    var sendForm = true;
    if(this.RegisterData.phoneNumber.length<10){
      this.phoneNumberError = true;
        sendForm = false;
    }else{
      this.phoneNumberError = false;
    }
    if(sendForm){
      //this.navCtrl.push('ForgatePasswordPage');
      this.sendPasswordOtpAPI();
    }
  }
  /*cheakSmsPermission(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECEIVE_SMS).then(()=>{
      console.log('checkPermission Pass');
      this.smsRequestPermission();
    },(err) =>{
      console.log('checkPermission Fail');
      this.smsRequestPermission();
    }); 
  }*/
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
          this.storage.set('userPhone', this.RegisterData.phoneNumber);
          this.navCtrl.push('ForgatePasswordPage');
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
