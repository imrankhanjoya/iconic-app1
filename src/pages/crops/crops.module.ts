import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropsPage } from './crops';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CropsPage,
  ],
  imports: [
    IonicPageModule.forChild(CropsPage),
    TranslateModule.forChild()
  ],
})
export class CropsPageModule {}
