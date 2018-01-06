import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CropsProvider } from '../../providers/crops/crops';
import { Events } from 'ionic-angular';


/**
 * Generated class for the CropslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-cropslist',
  templateUrl: 'cropslist.html',
})
export class CropslistPage {
  public cropList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};


  constructor(public navCtrl: NavController, public navParams: NavParams,public cropsProvider:CropsProvider,public loadingCtrl: LoadingController, public event: Events) {
  
  }

  ionViewDidLoad() {
  			 dataLayer : [];
                dataLayer.push({
                'screenName': 'PriceRequestFilterPage'
           });
             dataLayer.push({'event': 'appScreenView'});
		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present();

		this.cropsProvider.sendCrop('hi_IN').then((res)=>{
            this.cropList=resp;
				console.log(this.cropList);
				loading.dismiss();
        });
		// this.cropsProvider.sendCrop('hi_IN').map(res => res.json()).subscribe((resp) => {
		// this.cropList=resp;
		// console.log(this.cropList);
		// loading.dismiss();
		// }, (err) => {
		// console.log('my name is khan')
		// });
		console.log('ionViewDidLoad CropslistPage');
  }

}
