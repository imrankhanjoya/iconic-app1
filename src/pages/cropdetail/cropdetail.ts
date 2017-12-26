import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { CropsProvider } from '../../providers/crops/crops';
import { MandiDetailsPage } from '../mandi-details/mandi-details';
import { Events } from 'ionic-angular';


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
  		 public events: Events,
  		public cropsProvider:CropsProvider,public loadingCtrl: LoadingController,
  		 public mandi:MandiProvider){
  		this.id=navParams.get('crop_id');
  		this.notification=navParams.get('notification');

  	}

	ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present();
    setTimeout(() => {
        loading.dismiss();
    }, 4000);

		this.cropsProvider.sendCropDetail(this.id).then((res)=>{
      this.cropdetail=res.data; 
      this.cropdetailstatus=res.status;	
			loading.dismiss();
        if (res.status!=true) {
            this.navCtrl.push('CroplistPage',{croptype:'Kharif'});
        }
	    });
		
		console.log('ionViewDidLoad CropslistPage');
  	}
  	get_events(events){
  		 dataLayer.push({
       'appEventCategory': 'Crops',
       'appEventAction': 'Clicked',
       'appEventLabel': events,
     });
     dataLayer.push({'event': 'appEvent'});
  	}
  	 getMandiData(name){
  	 	 dataLayer.push({
       'appEventCategory': 'Crops',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Visit Mandi '+name
     });
     dataLayer.push({'event': 'appEvent'});
  	 	this.navCtrl.push(MandiDetailsPage,{crop_id:this.cropdetail.id});
}

}
