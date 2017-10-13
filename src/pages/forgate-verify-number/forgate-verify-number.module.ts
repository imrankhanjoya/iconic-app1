import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgateVerifyNumberPage } from './forgate-verify-number';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgateVerifyNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgateVerifyNumberPage),
    TranslateModule.forChild()
  ],
})
export class ForgateVerifyNumberPageModule {}
