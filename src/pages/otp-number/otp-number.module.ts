import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpNumberPage } from './otp-number';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OtpNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpNumberPage),
    TranslateModule.forChild()
  ],
})
export class OtpNumberPageModule {}
