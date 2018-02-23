import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductlistPage } from './productlist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductlistPage),
    TranslateModule.forChild()
  ],
})
export class ProductlistPageModule {}
