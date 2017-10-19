import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { CallProvider } from '../../providers/call/call';

/**
 * Generated class for the MarketViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-view',
  templateUrl: 'market-view.html',
})
export class MarketViewPage {
	public id:any;
	public loading :any;
	public ProductViewData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
	Crop: string = "General";
	constructor(
			navCtrl: NavController,
			public navParams: NavParams,
    		public market:MarketproProvider,
    		public callProvider:CallProvider,
    		public loadingCtrl: LoadingController
    		) {
			this.id=navParams.get('id');
			console.log('Market View ID '+this.id);
  	}

  ionViewDidLoad() {
    this.getProductView();
  }

  getProductView(){
  	let loading = this.loadingCtrl.create({
	content: 'Please wait...'
	});
	loading.present();
    this.market.ProductView(this.id).map(res => res.json()).subscribe((res) => {
      	
        this.ProductViewData.data = res.data;
        this.ProductViewData.msg = res.msg;
        this.ProductViewData.status = res.status;
        console.log('market data start');
        console.log(this.ProductViewData.data.detail);
        loading.dismiss();
      }, (err) => {
        // Unable to log in
        loading.dismiss();
        console.log(err);
      });
  }

}
