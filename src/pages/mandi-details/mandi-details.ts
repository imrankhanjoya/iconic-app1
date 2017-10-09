import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';

/**
 * Generated class for the MandiDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mandi-details',
  templateUrl: 'mandi-details.html',
})
export class MandiDetailsPage {
   public mandiData:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
//  public mandiData:any;
  public loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mandi:MandiProvider,
    public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
     this.loading.present();
  }

  ionViewDidLoad() {
  	 this.getMandiDetails();
    console.log('ionViewDidLoad MandiDetailsPage');
  }
   getMandiDetails(){
    this.mandi.mandiRates().map(res => res.json()).subscribe((res) => {
        this.mandiData= res;
        this.loading.dismiss();
        console.log(this.mandiData);
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
      });

  }

}
