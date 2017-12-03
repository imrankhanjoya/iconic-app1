import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgatePasswordPage } from './forgate-password';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ForgatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgatePasswordPage),
    TranslateModule.forChild(TranslateModule)
  ],
})
export class ForgatePasswordPageModule {}
