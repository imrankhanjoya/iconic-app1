import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { MainPage } from '../pages';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

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
    public platform: Platform,public storage:Storage) {
    this.dir = platform.dir();
    
    setTimeout(()=>{
      this.platform.ready().then((readySource) => {
          
          storage.get('userData').then((userlogin) => {
              console.log(userlogin);
              if (userlogin) {
                this.navCtrl.setRoot(MainPage, {}, {
                  animate: true,
                  direction: 'forward'
                });
              }else if(!userlogin){
                this.navCtrl.setRoot('WelcomePage', {}, {
                  animate: true,
                  direction: 'forward'
                });
              }
              
           });
      });
      },3000);


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
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


}
