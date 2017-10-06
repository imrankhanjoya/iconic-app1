import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,private storage: Storage) { }

  setLanguage(lang) {
  this.storage.set('userLang',lang);
    console.log('------'+JSON.stringify(lang));
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('VerifyNumberPage');
  }
}
