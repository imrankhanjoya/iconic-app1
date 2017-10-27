import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AgriInfoPage } from './agri-info';

@NgModule({
  declarations: [
    AgriInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgriInfoPage),
      TranslateModule.forChild()

  ],
})
export class AgriInfoPageModule {}
