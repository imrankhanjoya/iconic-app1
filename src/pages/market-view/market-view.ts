import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { CallProvider } from '../../providers/call/call';
import { ContactusProvider } from '../../providers/contactus/contactus';
import { Storage } from '@ionic/storage';

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
  public ContactSendData = {user_id:'',name:'',email:'',state:'',district:'',tehsil:'',mobile:'',message:'',subject:''}
	public ProductViewData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
	constructor(
			navCtrl: NavController,
			public navParams: NavParams,
    		public market:MarketproProvider,
    		public callProvider:CallProvider,
    		public loadingCtrl: LoadingController,
        public contactus:ContactusProvider,
        public storage:Storage
    		) {
			  this.id=navParams.get('id');
			   console.log('Market View ID '+this.id);
        this.storage.get('userData').then((val) => { 
          this.ContactSendData = val; 
          console.log(val);
        });
    }
  ionViewDidLoad() {
    this.getProductView();
  }

  getProductView(){
  	let loading = this.loadingCtrl.create({
	     content: 'Please wait...'
	   });
	   loading.present();
     this.market.ProductView(this.id).then((res)=>{
        this.ProductViewData.data = res.data;
        this.ProductViewData.msg = res.msg;
        this.ProductViewData.status = res.status;
        console.log('market data start');
        console.log(this.ProductViewData.data.detail);
        loading.dismiss();
      });
    // this.market.ProductView(this.id).map(res => res.json()).subscribe((res) => {
      	
    //     this.ProductViewData.data = res.data;
    //     this.ProductViewData.msg = res.msg;
    //     this.ProductViewData.status = res.status;
    //     console.log('market data start');
    //     console.log(this.ProductViewData.data.detail);
    //     loading.dismiss();
    //   }, (err) => {
    //     // Unable to log in
    //     loading.dismiss();
    //     console.log(err);
    //   });
  }

  mackCall(){
    this.ContactSendData.contact_type = 'product';
    this.ContactSendData.contact_id = this.ProductViewData.data.id;
    this.ContactSendData.subject = this.ProductViewData.data.name;
    this.ContactSendData.message = this.ProductViewData.data.slug;
    this.contactus.Send(this.ContactSendData);
    this.callProvider.makeCall();
  }

}
