import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MandiPage } from './mandi';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MandiPage,

  ],
  imports: [
    IonicPageModule.forChild(MandiPage),
    TranslateModule.forChild()
  ],
})
export class MandiPageModule {}
