import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, AlertController,ModalController } from 'ionic-angular';
import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Deeplinks } from '@ionic-native/deeplinks';
import { FCM } from '@ionic-native/fcm';
import { CacheService } from "ionic-cache";
import { Api } from '../providers/api/api';
import { Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainPage } from '../pages/pages';


//import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-menu [content]="content">
    

    <ion-content style="background-color:white">
    <ion-row class="MenuHeader circle-pic" justify-content-center align-items-center>
      <img class="profilePic"  src="assets/img/appicon.png" style="max-width:30%">
      
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
  <ion-nav #content [root]="MyApp"></ion-nav>`
})
export class MyApp {
  // rootPage = FirstRunPage;
  public username : any;
  public profile_picture : '/assets/img/appicon.png';
  public userLanguage:any;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage'},
    { title: 'Profile', component: 'ItemCreatePage'},
    { title: 'Privacy & Policy', component: 'PrivacyPage' },
    { title: 'About Us', component: 'AboutPage'},
    //{ title: 'About Us', component: 'ModalPage'},





  ]
  public alert:any;
  public display_name : any;
  constructor(public events: Events,private translate: TranslateService, public platform: Platform, settings: Settings,
    private config: Config, private statusBar: StatusBar,public storage:Storage,public deeplinks:Deeplinks,
    public fcm: FCM,public cacheService: CacheService,public api:Api,public alertCtrl: AlertController,
    public splashScreen: SplashScreen,public modalCtrl: ModalController) {
    //console.log("=-=-=-=-=-MyApp=-=-=-=-");
    //this.nav.setRoot('TutorialPage');
    // let splash = modalCtrl.create('TutorialPage');
    // splash.present();

    // this.initializeApp();
    events.subscribe('user:created', (user, userLang) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.userLanguage = userLang;
      //console.log('Welcome   ------', user, 'at', userLang);
    });
    cacheService.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour
        
    this.platform.ready().then((readySource) => {

        //fcm.unsubscribeFromTopic('---------------marketing');
      this.storage.get('userLang').then((userLang) => {
          //console.log(userLang);
          if(userLang){
            //this.userLanguage = userLang;
            this.initTranslate(userLang);
          }else{
            this.initTranslate('hi');
            //this.userLanguage = 'hi';
          }

       });
      storage.set('notificationData','');
      storage.get('userData').then((userlogin) => {

        this.display_name = userlogin.display_name;

        this.profile_picture = userlogin.profile_picture;
      });
        if (this.platform.is('cordova')) {
          fcm.onNotification().subscribe(data=>{
             //console.log("Received in background-----="+JSON.stringify(data));
            if(data.wasTapped){
              storage.set('notificationData',data);
              //console.log("Received in background---");
            } else {
              //console.log("Received in foreground-----");
            };
          });
        }
        

       this.platform.ready().then(() => {
            //this.viewCtrl.dismiss();
            this.storage.get('userData').then((userlogin) => {
                //console.log(userlogin);
                if (userlogin) {
                  //console.log('-----'+userlogin);
                  this.nav.setRoot(MainPage);
                  // storage.get('notificationData').then((notiData) => {
                  //     if (notiData) {
                  //         this.gotoAnounsePage(notiData.type,notiData.type_value);
                  //       }else {
                  //        this.navCtrl.setRoot(MainPage, {}, {
                  //           animate: true,
                  //           direction: 'forward'
                  //         }); 
                  //       }
                  // });
                }else if(!userlogin){
                  this.nav.setRoot('WelcomePage');
                }
                
             });
        });
       if (this.platform.is('cordova')) {
          fcm.subscribeToTopic('marketing');
          //this.storage.set('updated_token','islamsolnkey');
          fcm.getToken(function(token){
              //console.log('--getToken--'+token);
              storage.set('updated_token',token);
          });

          
          fcm.onNotificationReceived(function(data){
            if(data.wasTapped){
              storage.set('notificationData',data);
            } else {
              //console.log("Received in foreground-----");
            };
          });

          fcm.onTokenRefresh(function(token){
              //console.log('--getTokenRefresh--'+token);
              storage.set('updated_token',token);
          });
        }  

    });
    storage.get('notificationData').then(function (noData) {
      storage.set('notificationData', noData);
                  //console.log("     notificationData       :       "+noData);
    });
    this.splashScreen.hide();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.nav.setRoot('TutorialPage');
      // do whatever you need to do here.
      // setTimeout(() => {
      //   this.splashScreen.hide();
      // }, 100);
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
    //console.log('User Lang set : '+userLang)
    this.userLanguage = userLang;
    this.translate.use(userLang); // Set your language here
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  } 
  
  logout() {
      this.storage.set('userData','');
      this.storage.set('userLang','');
      this.storage.clear();
      this.nav.setRoot('TutorialPage', {}, {
        animate: true,
        direction: 'forward'
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // console.log(page);
    if(page.component=='AboutPage' && this.userLanguage=='hi'){
       this.nav.push('AboutHindiPage');
    }else if(page.component=='PrivacyPage' && this.userLanguage=='hi'){    
       this.nav.push('PrivacyHindiPage');
    }else if(page.component=='HomePage'){
      this.nav.setRoot(MainPage);
    }else if(page.component=='ItemCreatePage'){
      this.nav.setRoot('ItemCreatePage');
    }else{
       this.nav.push(page.component);
    }
  }
  openPageWithP(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
     //console.log(page);
    this.nav.push('SettingsPage',{pTitle:page});
  }

  setLanguage(lang){
    //console.log(lang);
    this.storage.set('userLang',lang);
    this.userLanguage = lang;
   this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    //window.location.reload();
    this.api.changelang(lang);
    this.nav.setRoot('TutorialPage', {}, {
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
          // this.viewCtrl.dismiss();
          // this.storage.get('userData').then((userlogin) => {
          //     console.log(userlogin);
          //     if (userlogin) {
          //       this.navCtrl.setRoot(MainPage);
          //     }else if(!userlogin){
          //       this.navCtrl.setRoot('WelcomePage');
          //     }
              
          //  });
        // Convenience to route with a given nav
        this.deeplinks.routeWithNavController(this.nav, {
          '/agribolo/': HomePage,
          '/contact-us': HomePage
        }).subscribe((match) => {
          //console.log('Successfully routed', match);
        }, (nomatch) => {
          //console.warn('Unmatched Route', nomatch);
        });
      });
  }

}
