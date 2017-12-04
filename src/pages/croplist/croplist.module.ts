import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CroplistPage } from './croplist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CroplistPage,
  ],
  imports: [
    IonicPageModule.forChild(CroplistPage),
    TranslateModule.forChild()

  ],
})
export class CroplistPageModule {}
