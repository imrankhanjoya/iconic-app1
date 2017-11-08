import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialistPage } from './specialist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SpecialistPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialistPage),
    TranslateModule.forChild()

  ],
})
export class SpecialistPageModule {}
