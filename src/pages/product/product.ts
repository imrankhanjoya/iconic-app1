import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  Crop: string = "home";
  public ParentCats: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public GroupCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public PopularProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) {
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad ProductPage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getParentCat();
    this.getPopularProduct();
    this.getGroupCatProduct();
  }
  
  gotoProductViewPage(){
    this.navCtrl.push('ProductlistviwePage');
  }

  gotoproductlist(){
    this.navCtrl.push('ProductlistPage');
  }
  
  getParentCat(){     
    this.productpro.ParentCat().then((res)=>{
      this.ParentCats.data = res.data;
      this.ParentCats.msg = res.msg;
      this.ParentCats.status = res.status;
    });
  }

  getPopularProduct(){ 
    setTimeout(() => {
      loading.dismiss();
    }, 6000);     
    this.productpro.PopularProduct().then((res)=>{
      this.PopularProducts.data = res.data;
      this.PopularProducts.msg = res.msg;
      this.PopularProducts.status = res.status;
      this.loading.dismiss();
    });
  }

  getGroupCatProduct(){     
    this.productpro.GroupCatProduct().then((res)=>{
      this.GroupCatProducts.data = res.data;
      this.GroupCatProducts.msg = res.msg;
      this.GroupCatProducts.status = res.status;
    });
  }
}
