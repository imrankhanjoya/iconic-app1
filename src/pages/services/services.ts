import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { KrishProvider } from '../../providers/krish/krish';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
	public krishDataList:any;
  public krishData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
public KrishProvider: KrishProvider) {
     this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
     
  }

  ionViewDidLoad() {
  	this.getkrish();
    console.log('ionViewDidLoad ServicesPage');
  }
   getkrish(){
    this.KrishProvider.krishList().map(res => res.json()).subscribe((res) => {
      	this.krishData.data = res.data;
        this.krishData.msg = res.msg;
        this.krishData.status = res.status;
        this.loading.dismiss();
        console.log(this.krishData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
   gotoRental(){
    this.navCtrl.push('RentalsPage');
  }
 gotoMarketPage(){
    this.navCtrl.push('MarketPage');
  }
  gotoMarket(){
    this.navCtrl.push('MarketPage');
  }
   gotoservices_detailPage(){
    this.navCtrl.push('ServicDetalisPage');
  }
   gotocroplist(){
    this.navCtrl.push('CroptypePage');
  }
   RentalsPage(id){
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }


}
