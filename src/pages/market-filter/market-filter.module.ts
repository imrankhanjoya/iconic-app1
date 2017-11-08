import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketFilterPage } from './market-filter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MarketFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketFilterPage),
    TranslateModule.forChild()
  ],
})
export class MarketFilterPageModule {}
