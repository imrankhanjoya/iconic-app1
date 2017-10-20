import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab4Root } from '../pages';
import { Tab5Root } from '../pages';
import { HomePage } from '../../pages/home/home';
import { NewsPage } from '../../pages/news/news';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = "";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";


  constructor(private translate: TranslateService,public navCtrl: NavController) {

    //this.initTranslate();
    this.translate.get(['Home', 'Krishi Center', 'News', 'Choupal', 'Market' ]).subscribe(values => {
      this.tab1Title = values['Home'];
      this.tab2Title = values['Krishi Center'];
      this.tab3Title = values['News'];
      this.tab4Title = values['Choupal'];
      this.tab5Title = values['Market'];

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
  }
  
}
