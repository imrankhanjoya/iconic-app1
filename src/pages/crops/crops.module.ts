import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropsPage } from './crops';

@NgModule({
  declarations: [
    CropsPage,
  ],
  imports: [
    IonicPageModule.forChild(CropsPage),
  ],
})
export class CropsPageModule {}
