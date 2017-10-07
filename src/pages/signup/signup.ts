import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../providers/providers';
import { CityStateProvider } from '../../providers/city-state/city-state';

import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {


  public passErrorMsg:any;
  public passError : any;
  public passConpError : any;
  public UserNameError : any;
  RegisterData = {phoneNumber:'',userName:'',password:'',confirmPassword:''};

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,public storage:Storage,
    public cityStateProvider:CityStateProvider) {

    
  }
  doSignup() {
    var sendForm = true;
    if(this.RegisterData.userName.length<5){
      this.UserNameError = true;
        sendForm = false;
    }else{
      this.UserNameError = false;
    }

    if(this.RegisterData.password.length<6){
        this.passError = true;
        this.passErrorMsg='Password week';
        sendForm = false;
    }else{
      this.passError = false;
    }

    if(this.RegisterData.password!=this.RegisterData.confirmPassword){
        this.passConpError = true;
        this.passErrorMsg='Password Not Match';
        sendForm = false;
    }else{
      this.passConpError = false;
    }

    if(sendForm){
      console.log('passsss')
      this.storage.set('userName',this.RegisterData.userName);
      this.storage.set('userPassword',this.RegisterData.confirmPassword);
      this.navCtrl.push('SelectLocationPage');

    }
    // this.user.signup(this.phoneNumber,this.password,this.user_name,this.lang,this.user_email).map(res => res.json()).subscribe((resp) => {
    //   if(resp.status === true){
    //     this.storage.set('password',this.password);
    //     this.navCtrl.push('SelectLocationPage');
    //     console.log(resp.status);
    //   }else{
    //    this.navCtrl.push('SelectLocationPage');
    //     console.log(resp.status);
    //  }
    //  }, (err) => {
    // //  this.navCtrl.push('LoginPage');
    // });

  }
  

}
