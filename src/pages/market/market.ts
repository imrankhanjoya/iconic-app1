import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';

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
  public productDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public market:MarketproProvider) {
  }

  ionViewDidLoad() {
      this.getmarkets();
    console.log('ionViewDidLoad MarketPage');
  }

  getmarkets(){
    this.market.productlist(40).map(res => res.json()).subscribe((res) => {
      
        this.productDatas.data = res.data;
        this.productDatas.msg = res.msg;
        this.productDatas.status = res.status;
        console.log('market data start');
        console.log(this.productDatas.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
