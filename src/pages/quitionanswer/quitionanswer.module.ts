import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuitionanswerPage } from './quitionanswer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuitionanswerPage,
  ],
  imports: [
    IonicPageModule.forChild(QuitionanswerPage),
    TranslateModule.forChild()
  ],
})
export class QuitionanswerPageModule {}
