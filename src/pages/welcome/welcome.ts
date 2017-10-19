import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService,public navCtrl: NavController,private storage: Storage) { }

  setLanguage(lang) {
  this.storage.set('userLang',lang);
    this.initTranslate(lang);
    this.navCtrl.push('LoginPage');
  }

  initTranslate(lang) {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    
  }


  signup() {
    this.navCtrl.push('VerifyNumberPage');
  }
}
