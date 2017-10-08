import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyNumberPage } from './verify-number';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VerifyNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyNumberPage),
    TranslateModule.forChild()
  ],
})
export class VerifyNumberPageModule {}
