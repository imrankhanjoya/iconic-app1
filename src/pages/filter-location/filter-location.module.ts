import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterLocationPage } from './filter-location';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FilterLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterLocationPage),
    TranslateModule.forChild()
  ],
})
export class FilterLocationPageModule {}
