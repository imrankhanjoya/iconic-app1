import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeatherPage } from './weather';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(WeatherPage),
    TranslateModule.forChild()
  ],
})
export class WeatherPageModule {}
