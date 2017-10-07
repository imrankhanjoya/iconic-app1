import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpertsDetailPage } from './experts-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExpertsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpertsDetailPage),
    TranslateModule.forChild()
  ],
})
export class ExpertsDetailPageModule {}
