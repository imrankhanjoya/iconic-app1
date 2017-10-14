import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgatePasswordPage } from './forgate-password';

@NgModule({
  declarations: [
    ForgatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgatePasswordPage),
  ],
})
export class ForgatePasswordPageModule {}
