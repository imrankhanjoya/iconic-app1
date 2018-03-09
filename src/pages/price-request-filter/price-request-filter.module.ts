import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceRequestFilterPage } from './price-request-filter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PriceRequestFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceRequestFilterPage),
    TranslateModule.forChild()
  ],
})
export class PriceRequestFilterPageModule {}
