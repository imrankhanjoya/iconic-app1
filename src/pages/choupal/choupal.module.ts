import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoupalPage } from './choupal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChoupalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoupalPage),
    TranslateModule.forChild()
  ],
})
export class ChoupalPageModule {}
