import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropslistPage } from './cropslist';

@NgModule({
  declarations: [
    CropslistPage,
  ],
  imports: [
    IonicPageModule.forChild(CropslistPage),
  ],
})
export class CropslistPageModule {}
