import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    
    public userMobilNoError:any;
    public UserPassError:any;
    
    private loginErrorString: string;
    RegisterData = {user_name:'', userPassword:''};

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {
    this.translateService.setDefaultLang('ar');
    this.translateService.use('ar');
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
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
     this.user.login(this.RegisterData.user_name,this.RegisterData.userPassword).map(res => res.json()).subscribe((resp) => {
     if(resp.status == '0'){
       alert(resp.msg);
       console.log(resp.status);
      }else{
        this.navCtrl.push(MainPage);
        console.log(resp.status);
      }
     }, (err) => {

      //this.navCtrl.push(MainPage);
    });
   }
  }
  singUp(){
    this.navCtrl.push(SignupPage);
  }
}
