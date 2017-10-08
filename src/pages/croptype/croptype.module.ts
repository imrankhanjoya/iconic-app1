import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CroptypePage } from './croptype';

@NgModule({
  declarations: [
    CroptypePage,
  ],
  imports: [
    IonicPageModule.forChild(CroptypePage),
  ],
})
export class CroptypePageModule {}
