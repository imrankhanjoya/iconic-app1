import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
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

  constructor(public navCtrl: NavController,public storage:Storage,
    public user: User,public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

  }

  doLogin(){
    var sendForm = true;
    if(this.RegisterData.user_name.length<10){
      this.userMobilNoError = true;
        sendForm = false;
    }else{
      this.userMobilNoError = false;
    }
    if(this.RegisterData.userPassword.length<3){
        this.UserPassError = true;
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
       this.navCtrl.push(MainPage);
      }else{
        this.errorMsg = true;
        console.log(resp.status);
      }
      loading.dismiss();
     }, (err) => {
      loading.dismiss();
    });
   }
  }
  singUp(){
    this.navCtrl.push('OtpNumberPage');
  }
  gotoForgatPassword(){
  this.navCtrl.push('ForgatePasswordMobileNumberPage');
  }
}
