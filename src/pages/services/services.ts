import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public KrishProvider: KrishProvider) {
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
        console.log(this.krishData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
   gotoRental(){
    this.navCtrl.push('RentalsPage');
  }

 gotoMarket(){
    this.navCtrl.push('MarketPage');
  }
   gotoservices_detailPage(){
    this.navCtrl.push('ServicDetalisPage');
  }


}
