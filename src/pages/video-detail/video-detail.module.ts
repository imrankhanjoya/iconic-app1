import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoDetailPage } from './video-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VideoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoDetailPage),
    TranslateModule.forChild()
  ],
})
export class VideoDetailPageModule {}
