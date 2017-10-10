import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

//import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Menu', component: 'MenuPage'},
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' },
    { title: 'News', component: 'NewsPage' },
    { title: 'Home', component: 'HomePage' },
    { title: 'marketselect', component: 'MarketselectPage' },



  ]

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings,
    private config: Config, private statusBar: StatusBar) {
    this.initTranslate();

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('hi');

    if (this.translate.getBrowserLang() !== undefined) {
      //this.translate.use(this.translate.getBrowserLang());
      this.translate.use('hi');
    } else {
      this.translate.use('hi'); // Set your language here
    }


    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log(page);
    this.nav.setRoot(page.component);
  }
}
