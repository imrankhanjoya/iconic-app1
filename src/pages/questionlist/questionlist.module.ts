import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionlistPage } from './questionlist';

@NgModule({
  declarations: [
    QuestionlistPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionlistPage),
  ],
})
export class QuestionlistPageModule {}
