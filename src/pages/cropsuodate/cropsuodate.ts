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
  public cropList:any;
   public kharifImage='cropselected.png';
   public hortiImage='fruitunselected.png';

   public ionicNamedColor: string = '#101c00';
   public tump:boolean = true;
   public temp:boolean = true;
   buttonColor: string = '#dbdbdb';
   peon:string =  '#101c00';
   public shoPage:any;
   public skipDataList: Array<Object>;
   public userKharif:any;
   public loading:any;
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
  addValue(e) {
    this.skipDataList.push({key: e});
    console.log(this.cropList);
    if (this.cropList[e].sub_type=='true') {
      this.cropList[e].sub_type='-';
    }else {
      this.cropList[e].sub_type='true';
    } 
    //this.storage.set('Kharif',this.skipDataList);
    console.log('--------'+this.skipDataList);
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
  selected(){
  //  this.loading.present();
    console.log(this.cropList);
    var isSelect=0;
    var selectedCrops=[];
    var selectedVegetables=[];
    for (var i = 0; i < this.cropList.length; i++) {
      if (this.cropList[i].sub_type=='true') {
        
            selectedCrops.push({'crop_id':this.cropList[i].id,'crop_type':this.cropList[i].crop_type});
          
        isSelect++;
      }
      if (i==this.cropList.length-1) {
        if (isSelect<3) {
          alert('Select Minimum 3')
        }else {
          //this.userRigister(selectedCrops);
          //lag,long,mobile,name,password,language,state,district,village,crops,vegetables

          //this.navCtrl.push('MarketselectPage');
        }
      }
    }
  }

}
