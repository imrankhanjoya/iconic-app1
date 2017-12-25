import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, NavParams ,ViewController} from 'ionic-angular';
import { MainPage } from '../pages';
import { Storage } from '@ionic/storage';
import { WeatherPage } from '../weather/weather';

import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController,public translate: TranslateService,
    public platform: Platform,public storage:Storage, public navParams: NavParams,public viewCtrl:ViewController,
    public splashScreen: SplashScreen) {
    this.dir = platform.dir();
    console.log('----- : '+navParams.get("data"));
    // setTimeout(()=>{
      
    //   },3000);


  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    this.splashScreen.hide();
 
    //setTimeout(() => {
      this.platform.ready().then((readySource) => {
          this.viewCtrl.dismiss();
          this.storage.get('userData').then((userlogin) => {
              if (userlogin) {
                this.navCtrl.setRoot(MainPage, {}, {
                  animate: true,
                  direction: 'forward'
                });
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
                this.navCtrl.setRoot('WelcomePage', {}, {
                  animate: true,
                  direction: 'forward'
                });
              }
              
           });
      });
    //});
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  gotoAnounsePage(type,type_value){
    console.log(type+'  ------ '+type_value);
    if (type=='product') {
      this.navCtrl.push('MarketViewPage',{id:type_value}).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
                    
    }
    if (type=='crop') {
      this.navCtrl.push('CropdetailPage',{crop_id:type_value}).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }
    if (type=='rental') {
      this.navCtrl.push('RentalDetailPage',{rid:type_value}).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }
    if (type=='blogs') {
      this.navCtrl.push('ExpertsDetailPage',{id:type_value}).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }
    if (type=='news') {
     this.navCtrl.push(WeatherPage).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }
    if (type=='weather') {
      this.navCtrl.push(WeatherPage).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });
    }
  }

}
