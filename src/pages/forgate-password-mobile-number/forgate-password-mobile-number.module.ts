import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgatePasswordMobileNumberPage } from './forgate-password-mobile-number';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgatePasswordMobileNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgatePasswordMobileNumberPage),
    TranslateModule.forChild(TranslateModule)
  ],
})
export class ForgatePasswordMobileNumberPageModule {}
