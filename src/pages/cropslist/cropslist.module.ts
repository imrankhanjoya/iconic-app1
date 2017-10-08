import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CropslistPage } from './cropslist';

@NgModule({
  declarations: [
    CropslistPage,
  ],
  imports: [
    IonicPageModule.forChild(CropslistPage),
    TranslateModule.forChild()
  ],
})
export class CropslistPageModule {}
