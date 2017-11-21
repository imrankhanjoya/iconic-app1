import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalFilterPage } from './rental-filter';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RentalFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalFilterPage),
       TranslateModule.forChild()

  ],
})
export class RentalFilterPageModule {}
