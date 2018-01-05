import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


    public userMobilNoError:any;
    public UserPassError:any;
    public errorMsg:any;

    private loginErrorString: string;
    RegisterData = {user_name:'', userPassword:''};

  constructor(public alertCtrl: AlertController,
    public event: Events,
    public navCtrl: NavController,
    public storage:Storage,
    public user: User,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService
    ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('LANGUAGE_CHOOSED').subscribe((value) => {
      this.LANGUAGE_CHOOSED = value;
      this.presentToast(this.LANGUAGE_CHOOSED);
    });
    this.translateService.get('WELCOME_BACK').subscribe((value) => {
      this.WELCOME_BACK = value;
    });
    this.translateService.get('LOGIN_PHONE_NUMBER_VALID').subscribe((value) => {
      this.LOGIN_PHONE_NUMBER_VALID = value;
    });
    this.translateService.get('LOGIN_PASSWORD_REQUIRED').subscribe((value) => {
      this.LOGIN_PASSWORD_REQUIRED = value;
    });
    this.translateService.get('LOGIN_USER_INVALID').subscribe((value) => {
      this.LOGIN_USER_INVALID = value;
    });

  }
  ionViewDidLoad() {
    console.log("--------Login Page-----------");
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



  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: [this.OK]
    });
    alert.present();
  }

  doLogin(){
    var sendForm = true;
    if(this.RegisterData.user_name.length<10){
      this.userMobilNoError = true;
      //this.presentToast(this.LOGIN_PHONE_NUMBER_VALID);
      sendForm = false;
    }else{
      this.userMobilNoError = false;
    }
    if(this.RegisterData.userPassword.length<3){
        this.presentToast(this.UserPassError);
        this.UserPassError = true;
        //this.presentToast(this.LOGIN_PASSWORD_REQUIRED);
        sendForm = false;
    }else{
        this.UserPassError = false;
    }
    if(sendForm){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
     this.user.login(this.RegisterData.user_name,this.RegisterData.userPassword).map(res => res.json()).subscribe((resp) => {
     if(resp.status==true){
       this.storage.set('userData',resp.data);
       this.event.publish('user:userdata', "000000000123", resp.data);
       //this.event.publish('user:login', "0000600000001211", resp.data);
       this.presentToast(this.WELCOME_BACK + resp.data.display_name);
       this.navCtrl.setRoot(MainPage);
      }else{
        this.errorMsg = true;
        //this.presentAlert(this.LOGIN_USER_INVALID);
      }
      loading.dismiss();
     }, (err) => {
      loading.dismiss();
    });
   }

   dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Login',
       'appEventAction': 'Submit',
       'appEventLabel': 'Submit - Login'
     });
     dataLayer.push({'event': 'appEvent'});
  }
  singUp(){
  dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Onboarding',
       'appEventAction': 'Clicked',
       'appEventLabel': 'New User'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('OtpNumberPage');
  }
  gotoForgatPassword(){
  dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Login',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Forgot Password'
     });
     dataLayer.push({'event': 'appEvent'});
  this.navCtrl.push('ForgatePasswordMobileNumberPage');
  }
}
