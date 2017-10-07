import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskquestionPage } from './askquestion';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AskquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(AskquestionPage),
    TranslateModule.forChild()
  ],
})
export class AskquestionPageModule {}
