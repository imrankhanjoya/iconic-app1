import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController, ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 * Generated class for the OtpNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-number',
  templateUrl: 'otp-number.html',
})
export class OtpNumberPage {
 
  public phoneNumberError:any;
  public name='allanoor';
  public userInfo:any;

  RegisterData = {phoneNumber:''}

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController, 
              public navParams: NavParams,
              public user: User,
              public event: Events,
              public storage:Storage,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private androidPermissions: AndroidPermissions,
              public translateService: TranslateService
            ) {
                  this.translateService.get('OTP_NUMBER_VALID_NUMBER').subscribe((value) => {
                    this.validnumber = value;
                    console.log(this.validnumber+'tesrtinnng');
                  });
                  this.translateService.get('DUPLICATE_MOBILENUMBER').subscribe((value) => {
                    this.DUPLICATE_MOBILENUMBER = value;
                  });
                  this.translateService.get('OTP_SEND').subscribe((value) => {
                    this.OTP_SEND = value;
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
  dataLayer : [];
    dataLayer.push({
      'screenName': 'OtpNumberPage'
    });
    dataLayer.push({'event': 'appScreenView'});
    console.log('ionViewDidLoad OtpNumberPage');
  }

  sendOtp(){
    var sendForm = true;
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Onboarding',
       'appEventAction': 'Submit',
       'appEventLabel': 'Signup - Phone NUmber'
    });
     dataLayer.push({'event': 'appEvent'});
     
    if(this.RegisterData.phoneNumber.length<10){
      this.phoneNumberError = true;
      this.presentToast(this.validnumber);
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
        this.sendOptApiCall();
      }); 
  }

  smsRequestPermission(){
    
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECEIVE_SMS).then(() =>{
          console.log('requestPermission pass');
          this.sendOptApiCall();
        },() =>{
          console.log('requestPermission Fail');
          this.sendOptApiCall();
        });
  }
  
  sendOptApiCall(){
      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      loading.present();
      this.user.sendOtp(this.RegisterData.phoneNumber,this.name).map(res => res.json()).subscribe((resp) => {
      if(resp.status === true){
        this.presentToast(this.OTP_SEND);
        this.navCtrl.push('VerifyNumberPage',{phoneNumber:this.RegisterData.phoneNumber});
        loading.dismiss();
      }else{
        this.presentToast(this.DUPLICATE_MOBILENUMBER);
        loading.dismiss();
      }
    }, (err) => {
      loading.dismiss();
      console.log('--unsuccess')  
    });
  }

  LoginPage(){
    this.navCtrl.push('LoginPage');
  }
}
