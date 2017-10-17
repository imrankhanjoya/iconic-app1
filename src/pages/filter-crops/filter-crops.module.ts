import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterCropsPage } from './filter-crops';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FilterCropsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterCropsPage),
    TranslateModule.forChild()
  ],
})
export class FilterCropsPageModule {}
