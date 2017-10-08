import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CropsProvider } from '../../providers/crops/crops';


/**
 * Generated class for the CropslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cropslist',
  templateUrl: 'cropslist.html',
})
export class CropslistPage {
	public cropList:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public cropsProvider:CropsProvider,public loadingCtrl: LoadingController) {
  
  }

  ionViewDidLoad() {

		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present();
		this.cropsProvider.sendCrop('hi_IN').map(res => res.json()).subscribe((resp) => {
		this.cropList=resp.data;
		console.log(this.cropList);
		loading.dismiss();
		}, (err) => {
		console.log('my name is khan')
		});
		console.log('ionViewDidLoad CropslistPage');
  }

}
