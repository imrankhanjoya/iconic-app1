import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ETirdingPage } from './e-tirding';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ETirdingPage,
  ],
  imports: [
    IonicPageModule.forChild(ETirdingPage),
        TranslateModule.forChild()

  ],
})
export class ETirdingPageModule {}
