import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalsPage } from './rentals';

@NgModule({
  declarations: [
    RentalsPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalsPage),
  ],
})
export class RentalsPageModule {}
