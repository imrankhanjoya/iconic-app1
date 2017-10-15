import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterModelPage } from './filter-model';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FilterModelPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterModelPage),
    TranslateModule.forChild()

  ],
})
export class FilterModelPageModule {}
