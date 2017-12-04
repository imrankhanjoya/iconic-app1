import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CropsProvider } from '../../providers/crops/crops';

/**
 * Generated class for the CroplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-croplist',
  templateUrl: 'croplist.html',
})
export class CroplistPage {
	public croptype:any;
	public cropList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};

  	constructor(public navCtrl: NavController, public navParams: NavParams,public cropsProvider:CropsProvider,public loadingCtrl: LoadingController) {
  		this.croptype=navParams.get('croptype');
  	}

  	ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present();
		this.cropsProvider.sendCropGroupType('hi_IN',this.croptype).then((res)=>{
            this.cropList=res;
				console.log(this.cropList);
				loading.dismiss();
        });
		// this.cropsProvider.sendCropGroupType('hi_IN',this.croptype).map(res => res.json()).subscribe((resp) => {
		// this.cropList=resp;
		// console.log(this.cropList);
		// loading.dismiss();
		// }, (err) => {
		// console.log('Error In cropList')
		// });
		console.log('ionViewDidLoad CropslistPage');
  	}
	gotocropdetail(crop_id){
	  	//console.log(crop_id+'send fro list on goto function');
	    this.navCtrl.push('CropdetailPage',{crop_id:crop_id});
	}

}
