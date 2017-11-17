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
    <ion-row class="MenuHeader circle-pic" justify-content-center align-items-center>
      <img class="profilePic"  src="{{profile_picture}}" style="max-width:30%">
      
    </ion-row>
    <ion-row class="MenuHeader" justify-content-center align-items-center>
      
      <div class="smallTitle colorGrey fontBold floatLeft"> {{display_name}}</div>
    </ion-row>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title | translate}}
        </button>
        <button menuClose ion-item (click)="logout()" >
          {{'LOGOUT' | translate}}
        </button>
      </ion-list>
      
      <ion-row >

      <div width-20 >
      <div class="smallTitle colorGrey fontBold floatLeft paddingLeft">Language</div>
      </div>
      
    </ion-row>
    <ion-row class="paddingTop alignCenter">
    <div [class]="userLanguage == 'hi' ? 'colorGreen smallTitleFont fontBold':'colorGrey smallTitleFont fontBold' " style="width:50%" (click)="setLanguage('hi')">हिंदी</div>
    <div [class]="userLanguage == 'en' ? 'colorGreen smallTitleFont fontBold':'colorGrey smallTitleFont fontBold'" style="width:50%" (click)="setLanguage('en')">ENGLISH</div>
      
      
    </ion-row>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;
  public username : any;
  public display_name : any;
  public profile_picture : 'assets/img/appicon.png';
  public userLanguage:any;
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

        //fcm.unsubscribeFromTopic('---------------marketing');
      this.storage.get('userLang').then((userLang) => {
          console.log(userLang);
          if(userLang){
            this.userLanguage = userLang;
            this.initTranslate(userLang);
          }else{
            this.initTranslate('hi');
            this.userLanguage = 'hi';
          }

       });
      storage.get('userData').then((userlogin) => {

        this.display_name = userlogin.display_name;

        this.profile_picture = userlogin.profile_picture;
      });
      fcm.subscribeToTopic('marketing');

      fcm.getToken(function(token){
          console.log('--getToken--'+token);
      });

      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.
          log("Received in foreground");
        };
      });

      fcm.onTokenRefresh(function(token){
          console.log('--onTokenRefresh--'+token);
      });

    });

platform.ready().then(() => {
              // Okay, so the platform is ready and our plugins are available.
              // Here you can do any higher level native things you might need

              platform.registerBackButtonAction(() => {


                //uncomment this and comment code below to to show toast and exit app
                // if (this.backButtonPressedOnceToExit) {
                //   this.platform.exitApp();
                // } else if (this.nav.canGoBack()) {
                //   this.nav.pop({});
                // } else {
                //   this.showToast();
                //   this.backButtonPressedOnceToExit = true;
                //   setTimeout(() => {

                //     this.backButtonPressedOnceToExit = false;
                //   },2000)
                // }

                if(this.nav.canGoBack()){
                  this.nav.pop();
                }else{
                  if(this.alert){ 
                    this.alert.dismiss();
                    this.alert =null;     
                  }else{
                    this.showAlert();
                   }
                }
              });
            });

          }

          showAlert() {
          this.alert = this.alertCtrl.create({
            title: 'Exit?',
            message: 'Do you want to exit the app?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  this.alert =null;
                }
              },
              {
                text: 'Exit',
                handler: () => {
                  this.platform.exitApp();
                }
              }
            ]
          });
          alert.present();
        }

          showToast() {
            let toast = this.toastCtrl.create({
              message: 'Press Again to exit',
              duration: 2000,
              position: 'bottom'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
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
  
  logout() {
       this.storage.set('userData','');
        this.nav.setRoot('WelcomePage');
         console.log("here");
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // console.log(page);
    if(page.component=='AboutPage' && this.userLanguage=='hi'){
       this.nav.setRoot('AboutHindiPage');
    }else if(page.component=='PrivacyPage' && this.userLanguage=='hi'){    
       this.nav.setRoot('PrivacyHindiPage');
    }else{
       this.nav.setRoot(page.component);
    }
  }
  openPageWithP(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
     console.log(page);
    this.nav.setRoot('SettingsPage',{pTitle:page});
  }

  setLanguage(lang){
    this.storage.set('userLang',lang);
    this.userLanguage = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    window.location.reload(true);
    this.nav.setRoot('TabsPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ngAfterViewInit(){
      this.platform.ready().then(() => {
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
