import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CroptyeProvider } from '../../providers/croptye/croptye';

/**
 * Generated class for the CroptypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-croptype',
  templateUrl: 'croptype.html',
})
export class CroptypePage {
	public cropType: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};

  	constructor(public navCtrl: NavController, public navParams: NavParams,public CroptyeProvider:CroptyeProvider,public loadingCtrl: LoadingController) {
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CroptypePage');

	let loading = this.loadingCtrl.create({
	content: 'Please wait...'
	});
	loading.present();
	this.CroptyeProvider.apicroptype().map(res => res.json()).subscribe((resp) => {
	this.cropType=resp;
	console.log(this.cropType);
	loading.dismiss();
	}, (err) => {
	console.log('error in crop type')
	});
  }
  gotocroplist(croptype){
  	console.log(croptype);
    this.navCtrl.push('CroplistPage',{croptype:croptype});
  }

}
