import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RentalsPage } from './rentals';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RentalsPage,
  ],
  imports: [
    IonicPageModule.forChild(RentalsPage),
    TranslateModule.forChild()

  ],
})
export class RentalsPageModule {}
