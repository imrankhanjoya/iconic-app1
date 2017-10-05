import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertsDetailPage } from './experts-detail';

@NgModule({
  declarations: [
    ExpertsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertsDetailPage),
  ],
})
export class ExpertsDetailPageModule {}
