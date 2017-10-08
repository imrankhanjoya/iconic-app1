import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropdetailPage } from './cropdetail';

@NgModule({
  declarations: [
    CropdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CropdetailPage),
  ],
})
export class CropdetailPageModule {}
