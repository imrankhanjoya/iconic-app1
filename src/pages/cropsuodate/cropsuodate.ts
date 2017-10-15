import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { CityStateProvider } from '../../providers/city-state/city-state';

/**
 * Generated class for the CropsuodatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-cropsuodate',
  templateUrl: 'cropsuodate.html',
})
export class CropsuodatePage {
  	public lang:any;
	public loading:any;
   	public shoPage:any;
  	public cropList:any;
   	public kharifImage='cropselected.png';
   	public hortiImage='fruitunselected.png';
   	public skipDataList: Array<Object>;
   	public tump:boolean = true;
   	public temp:boolean = true;
   	buttonColor: string = '#dbdbdb';
  	constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
      public loadingCtrl: LoadingController,public cityStateProvider:CityStateProvider) {      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      this.shoPage='Kharif';
      this.skipDataList = [];
      this. storage.get('userLang').then((val) => {
      this.lang=val;
      this.getCrops();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropsuodatePage');
  }
  getCrops() {
    this.loading.present();
    this.cityStateProvider.sendCrop(this.lang).map(res => res.json()).subscribe((resp) => {
      this.cropList=resp.data;
      console.log(this.cropList);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }
  addEvent(index){
    this.shoPage=index;
    console.log(this.tump);
    if(this.tump && this.shoPage=='Horticulture'){
      this.tump=false;
      this.buttonColor = '#101c00';
      this.peon='#dbdbdb';
      this.kharifImage = 'cropunselected.png';
      this.hortiImage='fruitselected.png';
    }else if(this.shoPage=='Kharif'){
      this.tump=true;
      this.buttonColor = '#dbdbdb';
      this.peon='#101c00';
      this.kharifImage = 'cropselected.png';
      this.hortiImage='fruitunselected.png';

    }
  }

}
