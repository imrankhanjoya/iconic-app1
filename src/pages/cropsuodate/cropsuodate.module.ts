import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CropsuodatePage } from './cropsuodate';

@NgModule({
  declarations: [
    CropsuodatePage,
  ],
  imports: [
    IonicPageModule.forChild(CropsuodatePage),
    TranslateModule.forChild()

  ],
})
export class CropsuodatePageModule {}
