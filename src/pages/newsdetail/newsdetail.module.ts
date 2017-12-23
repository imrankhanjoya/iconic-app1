import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsdetailPage } from './newsdetail';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    NewsdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsdetailPage),
     TranslateModule.forChild()

  ],
})
export class NewsdetailPageModule {}
