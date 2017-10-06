import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalDetailPage } from './rental-detail';

@NgModule({
  declarations: [
    RentalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalDetailPage),
  ],
})
export class RentalDetailPageModule {}
