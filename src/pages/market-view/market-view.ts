import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { LoadingController } from 'ionic-angular';
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
	public id :any;
	public loading :any;
  	public productDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  

	constructor(
			public loadingCtrl: LoadingController, 
			navCtrl: NavController,
			public navParams: NavParams,
    		public market:MarketproProvider,
    		public callProvider:CallProvider
    		) {
			this.id=navParams.get('id');
			console.log('Market View ID '+this.id);
		    /*this.loading = this.loadingCtrl.create({
		      content: 'Please wait...'
		    });
		   this.loading.present();*/
  	}

  ionViewDidLoad() {
  	//this.getmarkets(this.cat_id);
    console.log('ionViewDidLoad MarketViewPage');
  }

}
