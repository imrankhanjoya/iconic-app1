import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductlistviwePage } from './productlistviwe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductlistviwePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductlistviwePage),
    TranslateModule.forChild()
  ],
})
export class ProductlistviwePageModule {}
