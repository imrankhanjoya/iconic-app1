import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CallProvider } from '../../providers/call/call';

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var dataLayer: Array<Object>;

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  public limit:'100';
  public id :any;
  public loading :any;
  public cat_id :any;
  public product_id :any;
  public productbrand :any;
  public product_cat :any;
  public productbrand :any;
  public sortby :any;
  public productDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,
    public market:MarketproProvider,public callProvider:CallProvider,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController) {
  }


  ionViewDidLoad() {
    this.getmarkets(this.product_cat,this.productbrand,this.sortby);
    console.log('ionViewDidLoad MarketPage');
  }
  


  getmarkets(){
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
      this.loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 6000);
      
      this.market.productlistview(this.product_cat,this.productbrand,this.sortby).then((res)=>{
      this.productDatas.data = res.data;
      this.productDatas.msg = res.msg;
      this.productDatas.status = res.status;
      this.loading.dismiss();
    });
    // this.market.productlistview(cat_id).map(res => res.json()).subscribe((res) => {      
    //     this.productDatas.data = res.data;
    //     this.productDatas.msg = res.msg;
    //     this.productDatas.status = res.status;
    //     console.log('market data start');
    //     console.log(this.productDatas.data);
    //     this.loading.dismiss();
    //   }, (err) => {
    //     // Unable to log in
    //     this.loading.dismiss();
    //     console.log(err);
    //   });
  }


  makeCall(){
    
  }

  gotoMarketViewPage(product_id){
    this.navCtrl.push('MarketViewPage',{id:product_id});
  }
  back(){
  // this.navCtrl.pop('HomePage');  
   this.navCtrl.push(HomePage);
   }
  openFilter(){
    let modal = this.modalCtrl.create('MarketFilterPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
          this.product_cat = popoverData.data.product_cat;
          this.productbrand = popoverData.data.productbrand;
          this.sortby = popoverData.data.sortby;
          this.getmarkets();
        //this.navCtrl.push(MarketPage,{product_cat:popoverData.data.product_cat,sortby:popoverData.data.sortby,productbrand:popoverData.data.productbrand, fromFilter:true}); 
      }
    });
  }

}
