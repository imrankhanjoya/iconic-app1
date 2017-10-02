import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MandiDetailsPage } from './mandi-details';

@NgModule({
  declarations: [
    MandiDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MandiDetailsPage),
  ],
})
export class MandiDetailsPageModule {}
