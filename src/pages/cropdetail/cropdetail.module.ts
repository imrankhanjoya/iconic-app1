import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropdetailPage } from './cropdetail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CropdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CropdetailPage),
    TranslateModule.forChild()
  ],
})
export class CropdetailPageModule {}
