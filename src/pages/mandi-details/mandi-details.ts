import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public mandi:MandiProvider,) {
  }

  ionViewDidLoad() {
  	 this.getMandiDetails();
    console.log('ionViewDidLoad MandiDetailsPage');
  }
   getMandiDetails(){
    this.mandi.mandiRates().map(res => res.json()).subscribe((res) => {
        this.mandiData= res;
        
        console.log(this.mandiData);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
