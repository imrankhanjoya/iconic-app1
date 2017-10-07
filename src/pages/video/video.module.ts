import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    VideoPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoPage),
    TranslateModule.forChild()
  ],
})
export class VideoPageModule {}
