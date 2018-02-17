import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProducattypePage } from './producattype';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProducattypePage,
  ],
  imports: [
    IonicPageModule.forChild(ProducattypePage),
    TranslateModule.forChild()
  ],
})
export class ProducattypePageModule {}
