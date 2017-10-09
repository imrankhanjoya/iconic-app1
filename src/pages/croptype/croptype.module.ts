import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CroptypePage } from './croptype';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CroptypePage,
  ],
  imports: [
    IonicPageModule.forChild(CroptypePage),
    TranslateModule.forChild()

  ],
})
export class CroptypePageModule {}
