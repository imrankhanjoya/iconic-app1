import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
	  public walletView: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
	  public walletView1: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public wallet:WalletProvider) {
  }

  ionViewDidLoad() {
  	this.getwallet();
    console.log('ionViewDidLoad WalletPage');
  }
   getwallet(){
    this.wallet.Wallet().map(res => res.json()).subscribe((res) => {
      
        this.walletView = res.data;
        this.walletView1 = res.data;
        this.walletView.msg = res.msg;
        this.walletView.status = res.status;
        console.log(this.walletView);
        //this.loading.dismiss();
      }, (err) => {
        // Unable to log in
        //this.loading.dismiss();
        console.log(err);
      });
  }
   gotoMarketPage(){
    this.navCtrl.push('MarketPage');
  }

}
