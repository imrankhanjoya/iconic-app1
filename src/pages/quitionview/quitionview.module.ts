import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuitionviewPage } from './quitionview';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuitionviewPage,
  ],
  imports: [
    IonicPageModule.forChild(QuitionviewPage),
    TranslateModule.forChild()

  ],
})
export class QuitionviewPageModule {}
