import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeciallistFilterPage } from './speciallist-filter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SpeciallistFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeciallistFilterPage),
     TranslateModule .forChild()

  ],
})
export class SpeciallistFilterPageModule {}
