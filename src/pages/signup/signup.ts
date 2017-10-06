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
  public phoneNumber:any;
  public password:any;
  public confirmPassword:any;
  public user_name='mynameisKham';
  public user_email='abcmrs@gmail.com';
  public lang:any;
  private signupErrorString: string;
  public state:any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,public storage:Storage,public cityStateProvider:CityStateProvider) {

  this. storage.get('userLang').then((val) => {
  this.lang=val;
    this.getState();
});
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }
  doSignup() {
    this.user.signup(this.phoneNumber,this.password,this.user_name,this.lang,this.user_email).map(res => res.json()).subscribe((resp) => {
    if(resp.status === true){
    this.storage.set('password',this.password);
    this.navCtrl.push('SelectLocationPage');
    console.log(resp.status);
    }else{
    this.navCtrl.push('SelectLocationPage');
    console.log(resp.status);
    }
    }, (err) => {
    //  this.navCtrl.push('LoginPage');

    });
  }
  getState() {
    this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
    this.state=resp;
    console.log(this.state.data[1].state_name);

    }, (err) => {
  console.log('my name is khan')
    });
  }

  getCity() {
    this.cityStateProvider.getCity().subscribe((resp) => {
      //this.navCtrl.push('LoginPage');
    }, (err) => {
    //  this.navCtrl.push('LoginPage');

    });
  }

}
