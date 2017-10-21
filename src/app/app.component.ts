import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { Deeplinks } from '@ionic-native/deeplinks';
import { FCM } from '@ionic-native/fcm';
import { CacheService } from "ionic-cache";


//import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-menu [content]="content">
    

    <ion-content style="background-color:white">
    <ion-row class="MenuHeader" justify-content-center align-items-center>
      <img class="profilePic"  src="assets/img/marty-avatar.png">
      
    </ion-row>
    <ion-row class="MenuHeader" justify-content-center align-items-center>
      
      <div class="smallTitle colorGrey fontBold floatLeft"> {{display_name}}</div>
    </ion-row>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title | translate}}
        </button>
      </ion-list>
      
      <ion-row >

      <div width-20 >
      <div class="smallTitle colorGrey fontBold floatLeft paddingLeft">Language</div>
      </div>
      
    </ion-row>
    <ion-row class="paddingTop alignCenter">
    <div class ="colorGreen smallTitleFont fontBold " style="width:50%" (click)="setLanguage('hi')">हिंदी</div>
    <div class="colorGrey smallTitleFont fontBold" style="width:50%" (click)="setLanguage('en')">ENGLISH</div>
      
      
    </ion-row>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  public username : any;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: HomePage},
    { title: 'Profile', component: 'ItemCreatePage'},
    { title: 'Privacy & Policy', component: 'PrivacyPage' },
    { title: 'About Us', component: 'AboutPage'},

  ]

  constructor(private translate: TranslateService, public platform: Platform, settings: Settings,
    private config: Config, private statusBar: StatusBar,public storage:Storage,public deeplinks:Deeplinks,
    private fcm: FCM,public cacheService: CacheService) {

    cacheService.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour
    
    this.platform.ready().then((readySource) => {
      this.storage.get('userLang').then((userLang) => {
          console.log(userLang);
          if(userLang){
            this.initTranslate(userLang);

          }else{
            this.initTranslate('hi');
          }

       });
      fcm.subscribeToTopic('marketing');

      fcm.getToken(function(token){
          console.log('--getToken--'+token);
      });

      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      fcm.onTokenRefresh(function(token){
          console.log('--onTokenRefresh--'+token);
      });

        //fcm.unsubscribeFromTopic('---------------marketing');

    });
    
     

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }

  initTranslate(userLang) {

    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    this.translate.setDefaultLang('hi');
    console.log('User Lang set : '+userLang)
    this.translate.use(userLang); // Set your language here
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // console.log(page);
    this.nav.setRoot(page.component);
  }
  openPageWithP(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
     console.log(page);
    this.nav.setRoot('SettingsPage',{pTitle:page});
  }

  setLanguage(lang){
    console.log(lang);
    this.storage.set('userLang',lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.nav.setRoot('TabsPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ngAfterViewInit(){
      this.platform.ready().then(() => {
        console.log('-------ngAfterViewInit--------')

         /*
        IonicDeeplink.route({
          '/about-us': AboutPage,
          '/universal-links-test': AboutPage,
          '/products/:productId': ProductPage
        }, function(match) {
          // Handle the route manually
        }, function(nomatch) {
          // No match
        })
        */


        // Convenience to route with a given nav
        this.deeplinks.routeWithNavController(this.nav, {
          '/agribolo/': HomePage,
          '/contact-us': HomePage
        }).subscribe((match) => {
          console.log('Successfully routed', match);
        }, (nomatch) => {
          console.warn('Unmatched Route', nomatch);
        });
      });
  }

}
