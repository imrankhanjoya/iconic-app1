import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { CropsProvider } from '../../providers/crops/crops';
import { MandiDetailsPage } from '../mandi-details/mandi-details';

/**
 * Generated class for the CropdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cropdetail',
  templateUrl: 'cropdetail.html',
})
export class CropdetailPage {
	public id:any;
	public cropdetail: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
	Crop: string = "General";
  	constructor(public navCtrl: NavController, public navParams: NavParams,
  		public cropsProvider:CropsProvider,public loadingCtrl: LoadingController,
  		 public mandi:MandiProvider){
  		this.id=navParams.get('crop_id');
  		//this.id=navParams.get('crop_id');

  	}

	ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present();
		this.cropsProvider.sendCropDetail(this.id).then((res)=>{
      	this.cropdetail=res.data;
			console.log(this.cropdetail);
			console.log(this.id+'send for crop detail');
			loading.dismiss();
	    });
		
		console.log('ionViewDidLoad CropslistPage');
  	}
  	 getMandiData(){
  	 		this.navCtrl.push(MandiDetailsPage,{crop_id:this.id});
}

}
