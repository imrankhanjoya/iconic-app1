import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';

/**
 * Generated class for the MandiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mandi',
  templateUrl: 'mandi.html',
})
export class MandiPage {
	public mandidata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public MandiProvider: MandiProvider) {
  }


  ionViewDidLoad() {
    this.getmandi
    console.log('ionViewDidLoad MandiPage');
  }
   getmandi(){
   	// console.log('ionViewDidLoad '+this.questionaddData.title);
    this.MandiProvider.mandiRates().map(res => res.json()).subscribe((res) => {
        this.mandidata.data = res.data;
        this.mandidata.msg = res.msg;
        this.mandidata.status = res.status;
        console.log(this.mandidata.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }

}
