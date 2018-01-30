import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductlistviwePage } from './productlistviwe';

@NgModule({
  declarations: [
    ProductlistviwePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductlistviwePage),
  ],
})
export class ProductlistviwePageModule {}
