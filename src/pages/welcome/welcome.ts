import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { Api } from '../../providers/api/api';

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

  constructor(
    public events: Events,
            private translate: TranslateService,
            public navCtrl: NavController,
            private storage: Storage,
            private toastCtrl: ToastController,public api:Api
          ) {
           }
    setLanguage(lang) {
      this.events.publish('user:created', "000000000000", lang);
      if(lang =='hi'){
      dataLayer.push({
       'appEventCategory': 'Onboarding',
       'appEventAction': 'Submit',
       'appEventLabel': 'Language - Hindi'
     });
     dataLayer.push({'event': 'appEvent'});
   }
   if(lang =='en'){
    dataLayer.push({
       'appEventCategory': 'Onboarding',
       'appEventAction': 'Submit',
       'appEventLabel': 'Language - English'
     });
     dataLayer.push({'event': 'appEvent'});
   }

      // this.storage.set('userLang',lang);
      // this.initTranslate(lang);
      console.log(lang);
      this.storage.set('userLang',lang);
      this.userLanguage = lang;
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      //window.location.reload();
      this.api.changelang(lang);
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
