import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementPage } from './announcement';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementPage),
    TranslateModule.forChild()
  ],
})
export class AnnouncementPageModule {}
