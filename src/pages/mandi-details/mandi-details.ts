import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { FilterModelPage } from '../filter-model/filter-model';


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
  public loading:any;
  public filterMarket:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public mandi:MandiProvider,
    public loadingCtrl: LoadingController,public modalCtrl:ModalController,public viewCtrl:ViewController) {
    
    this.filterMarket = navParams.get('filter_market');

    console.log(this.filterMarket);
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
    
    var marketId = ( typeof this.filterMarket != 'undefined' )?this.filterMarket:0;
    
    this.mandi.mandiRates(marketId).map(res => res.json()).subscribe((res) => {
        this.mandiData= res;
        this.loading.dismiss();
        console.log(this.mandiData);
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
      });

  }

  openFilter(){
    let modal = this.modalCtrl.create('FilterModelPage');
    
    modal.present();
  }
  
  dismiss(){
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

}
