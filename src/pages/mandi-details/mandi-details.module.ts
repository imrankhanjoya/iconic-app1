import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MandiDetailsPage } from './mandi-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MandiDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MandiDetailsPage),
    TranslateModule.forChild()
  ],
})
export class MandiDetailsPageModule {}
