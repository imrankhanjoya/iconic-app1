import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    public username: any;
    public password: any;
  private loginErrorString: string;

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
     this.navCtrl.push(MainPage); 
     this.user.login(this.username,this.password).map(res => res.json()).subscribe((resp) => {
     if(resp.status === true){
      this.navCtrl.push(MainPage);
      console.log(resp.status);
      }else{
      console.log(resp.status);
      }
     }, (err) => {
      this.navCtrl.push(MainPage);
    });
  }

}
