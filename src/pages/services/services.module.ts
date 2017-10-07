import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesPage } from './services';

@NgModule({
  declarations: [
    ServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesPage),
    TranslateModule.forChild()
  ],
})

export class ServicesPageModule {}
