import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  public user_id:any;
  public loading:any;

  public ChartLists: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) {    
    this.user_id=navParams.get('user_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getChartList();
  }
  gotoproducttype(){
    this.navCtrl.push('ProducattypePage');
  }
  gotoproductlist(){
    this.navCtrl.push('MarketPage');
  }

  getChartList(){
    this.productpro.ChartListsPro('add').map(res => res.json()).subscribe((res) => {
      this.ChartLists.data = res.data;
      this.ChartLists.msg = res.msg; 
      this.ChartLists.status = res.status;
      this.loading.dismiss();
      if (res.status!=true) {
          this.navCtrl.push('MarketPage');
      }
    });
  }


}
