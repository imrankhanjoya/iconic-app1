import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketViewPage } from './market-view';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MarketViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketViewPage),
    TranslateModule.forChild()
  ],
})
export class MarketViewPageModule {}
