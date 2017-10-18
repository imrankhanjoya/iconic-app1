import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { LoadingController } from 'ionic-angular';
import { CallProvider } from '../../providers/call/call';

/**
 * Generated class for the MarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  public productDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public loadingCtrl: LoadingController, navCtrl: NavController, public navParams: NavParams,
    public market:MarketproProvider,public callProvider:CallProvider) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
      this.loading.present();
      this.cat_id = 0;
  }


  ionViewDidLoad() {
    this.getCategory();
    this.getmarkets(this.cat_id);
    console.log('ionViewDidLoad MarketPage');
  }


  getmarkets(cat_id){
    this.market.productlistview(cat_id).map(res => res.json()).subscribe((res) => {
      
        this.productDatas.data = res.data;
        this.productDatas.msg = res.msg;
        this.productDatas.status = res.status;
        console.log('market data start');
        console.log(this.productDatas.data);
        this.loading.dismiss();
      }, (err) => {
        // Unable to log in
        this.loading.dismiss();
        console.log(err);
      });
  }

  getCategory(){
    this.market.productcat().map(res => res.json()).subscribe((res) => {
      
        this.catDatas.data = res.data;
        this.catDatas.msg = res.msg;
        this.catDatas.status = res.status;
        console.log('cat data');
        console.log(this.catDatas.data);
        console.log('cat data END ');
        //this.loading.dismiss();
      }, (err) => {
        // Unable to log in
        //this.loading.dismiss();
        console.log(err);
      });
  }

  mackCall(){
    this.callProvider.makeCall();
  }
  onChange(selectedData){
      this.getmarkets(selectedData);
  }
  gotoMarketViewPage(product_id){
    this.navCtrl.push('MarketViewPage',{id:product_id});
  }
}
