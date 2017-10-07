import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KrishCenterPage } from './krish-center';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    KrishCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(KrishCenterPage),
    TranslateModule.forChild()

  ],
})
export class KrishCenterPageModule {}
