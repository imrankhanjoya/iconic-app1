import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductFilterPage } from './product-filter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductFilterPage),
    TranslateModule.forChild()
  ],
})
export class ProductFilterPageModule {}
