import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  public loading :any;
  public activetabs :any;
  public ParentCats: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public GroupCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public ChildCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public PopularProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  
  constructor(public modalCtrl:ModalController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) {
  }

  ionViewDidLoad() { 
    this.activetabs = 'home';   
    console.log('ionViewDidLoad ProductPage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getParentCat();
    this.getPopularProduct();
    this.getGroupCatProduct();
  }
  
  gotoProductViewPage(id){
    this.navCtrl.push('ProductlistviwePage',{id:id});
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
      this.loading.dismiss();
    },3000);     
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


  GetParentCatProduct(cat_id,type){
      this.Crop = cat_id;  
      this.activetabs = type;
      if (type!='home') { this.Crop = cat_id;  
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.productpro.ParentCatProduct(cat_id).then((res)=>{
          this.ChildCatProducts.data = res.data;
          this.ChildCatProducts.msg = res.msg;
          this.ChildCatProducts.status = res.status;
          this.loading.dismiss();
        });
    }

  }

  openFilter(){
    let modal = this.modalCtrl.create('ProductFilterPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
          this.product_cat = popoverData.data.product_cat;
          this.productbrand = popoverData.data.productbrand;
          this.sortby = popoverData.data.sortby;
          //this.getmarkets();
        this.navCtrl.push('ProductFilterPage'); 
      }
    });
  }
}
