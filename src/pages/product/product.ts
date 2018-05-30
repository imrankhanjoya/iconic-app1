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
 declare var dataLayer: Array<Object>;


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  Crop: string = "home";
  public loading :any;
  public activetabs :any;
  public catshowmore :any;
  public catshowmorebtn :any;
  public catshowmorepbtn :any;
  public ParentCats: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public GroupCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public ChildCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public PopularProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public PromoBanners: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public ChartCount: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public OrderCount: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  
  constructor(public modalCtrl:ModalController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) {
    this.catshowmore='hide';
    this.catshowmorebtn='show';
    this.catshowmorepbtn='hide';
  }

  ionViewDidLoad() { 
    dataLayer : [];
    dataLayer.push({
      'screenName': 'ProductPage'
    });
    dataLayer.push({'event': 'appScreenView'});
    this.activetabs = 'home';   
    console.log('ionViewDidLoad ProductPage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getPromoBanner();
    this.getParentCat();
    this.getPopularProduct();
    this.getGroupCatProduct();
    this.getChartCount();
    this.getOrderCount();
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
  
  getPromoBanner(){     
    this.productpro.PromoBanner().then((res)=>{
      this.PromoBanners.data = res.data;
      this.PromoBanners.msg = res.msg;
      this.PromoBanners.status = res.status;
    });
  }
  
  PromoClick(type,type_value){ 
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Product',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Promo Click ' + type
     });
     dataLayer.push({'event': 'appEvent'});
    if (type=='product') {
      this.navCtrl.push('ProductlistviwePage',{id:type_value}); 
    }
    if (type=='category') {
      this.GetParentCatProduct('','cat',type_value);
    }
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

  GetParentCatProduct(cat_id,type,category_id){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Product',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Tab Click ' + type
     });
     dataLayer.push({'event': 'appEvent'});
      this.Crop = cat_id;  
      this.activetabs = type;
      if (type!='home') { this.Crop = cat_id;  
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.productpro.ParentCatProduct(cat_id,category_id).then((res)=>{
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
          this.parent_cat = popoverData.data.parent_cat;
          this.child_cat = popoverData.data.child_cat;
          this.GetParentCatProduct(this.parent_cat,'cat',this.child_cat);
          //this.navCtrl.push('ProductFilterPage'); 
      }
    });
  }

  getChartCount(){
      this.productpro.ChartCount().map(res => res.json()).subscribe((res) => {
      this.ChartCount.data = res.data;
      this.ChartCount.msg = res.msg; 
      this.ChartCount.status = res.status;
      console.log('ChartCount');
      console.log(res);
      this.loading.dismiss();
    });
  }

  getOrderCount(){
      this.productpro.OrderCount().map(res => res.json()).subscribe((res) => {
      this.OrderCount.data = res.data;
      this.OrderCount.msg = res.msg; 
      this.OrderCount.status = res.status;
      this.loading.dismiss();
    });
  }

  gotoOderList(){
    this.navCtrl.push('ProducattypePage');
  }

  gotoCartList(){
      this.navCtrl.push('ProductlistPage');
  }

  showallcat(){
    this.catshowmore='show';
    this.catshowmorebtn='hide';
    this.catshowmorepbtn='show';
  }

}
