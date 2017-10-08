import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalDetailPage } from './rental-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RentalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalDetailPage),
    TranslateModule.forChild()

  ],
})
export class RentalDetailPageModule {}
