import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionlistPage } from './questionlist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuestionlistPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionlistPage),
    TranslateModule.forChild()

  ],
})
export class QuestionlistPageModule {}
