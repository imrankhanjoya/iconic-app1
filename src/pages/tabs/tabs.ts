import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab4Root } from '../pages';
import { Tab5Root } from '../pages';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = "Home";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    
    translateService.get(['Home', 'Krishi Center', 'News', 'Choupal', 'Market']).subscribe(values => {
      this.tab1Title = values['Home'];
      this.tab2Title = values['Krishi Center'];
      this.tab3Title = values['News'];
      this.tab4Title = values['Choupal'];
      this.tab5Title = values['Market'];
    });
  }
}
