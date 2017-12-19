import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { IonicPage, NavController, NavParams, LoadingController, ViewController, AlertController } from 'ionic-angular';
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
   public kharifImage='corn.svg';
   public VazitabImage='carrot.svg';
   public hortiImage='grapes.svg';


   public ionicNamedColor: string = '#101c00';
   public tump:boolean = true;
   public temp:boolean = true;
   buttonColor: string = '#dbdbdb';
   peon:string =  '#101c00';
   public shoPage:any;
   public skipDataList: Array<Object>;
   public userKharif:any;
   public loading:any;
   public user_id:any;
   public userdata:any;
   public userCropIdList:['','',''];
  	constructor(public alertCtrl: AlertController,
          public navCtrl: NavController, 
  		public navParams: NavParams,
  		public storage:Storage,
      	public loadingCtrl: LoadingController,
      	public cityStateProvider:CityStateProvider,
         private viewCtrl: ViewController,
         public user: User,
          public translateService: TranslateService) 
  		{      
  			  this.loading = this.loadingCtrl.create({
        	   content: 'Please wait...'
          });
           this.translateService.get('CROP_UPDATA_SUCCESSFULLY').subscribe((value) => {
          this.CROP_UPDATA_SUCCESSFULLY = value;
          });
           this.translateService.get('OK').subscribe((value) => {
          this.OK = value;
          });
           this.translateService.get('MINIMUM_CROPS').subscribe((value) => {
          this.MINIMUM_CROPS = value;
          });

          this.shoPage='Kharif';
          this.skipDataList = [];
      this. storage.get('userLang').then((val) => {
        this.lang=val;
        this.getCrops();
        this.getFruit();
        this.getVegetable();
      });
      this.storage.get('userData').then((val) => { 
        this.user_id = val.ID;
        this.userdata = val;  
        this.userCropIdList=val.crops;
        // for (var i = 0; i < val.crops.length; i++) {
        //   console.log(val.crops[i].id)
        //   this.userCropIdList.push(val.crops[i].id);
        // }
        console.log(this.userCropIdList);
      });
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: [this.OK]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CropsuodatePage');
  }
  getCrops() {
    this.loading.present();
    this.cityStateProvider.sendCrop(this.lang).then((res)=>{
      for (var i = 0; i < res.data.length; i++) {
        for (var j = 0; j < this.userCropIdList.length; j++) {
          if (this.userCropIdList[j].id==res.data[i].id) {
            res.data[i].sub_type='true';
          }
        }
      }
      this.cropList=res.data;
      console.log(this.cropList);
      this.loading.dismiss();;
    });
    // this.cityStateProvider.sendCrop(this.lang).map(res => res.json()).subscribe((resp) => {
    //   this.cropList=resp.data;
    //   console.log(this.cropList);
    //   this.loading.dismiss();
    // }, (err) => {
    //   this.loading.dismiss();
    // });
  }

  getFruit(){
    this.loading.present();
    this.cityStateProvider.sendCrop(this.lang,'Fruit').then((res)=>{
      this.crops=res.data;
      console.log('this.crops');
      console.log(this.crops);
      this.loading.dismiss();;
    });
  }

  getVegetable(){
    this.loading.present();
    this.cityStateProvider.sendCrop(this.lang,'Vegetable').then((res)=>{
      this.crops=res.data;
      console.log('this.crops');
      console.log(this.crops);
      this.loading.dismiss();;
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
      this.buttonColor = '#f1f4ed';
      this.peon='#dbdbdb';
      this.kharifImage = 'corn.svg';
     this.VazitabImage = 'carrot.svg';
      this.hortiImage='grapes.svg';
    }else if(this.shoPage=='Kharif'){
      this.tump=true;
      this.buttonColor = '#f1f4ed';
      this.peon='#101c00';
      this.kharifImage = 'corn.svg';
      this.VazitabImage = 'carrot.svg';
      this.hortiImage='grapes.svg';
    }
    else if(this.shoPage=='Vazitable'){
      this.tump=true;
      this.buttonColor = '#f1f4ed';
      this.peon='#101c00';
      this.kharifImage = 'corn.svg';
      this.VazitabImage = 'carrot.svg';
      this.hortiImage='grapes.svg';

    }
  }
  selected(){
  //  this.loading.present();
    console.log('FormSubmit Suceesfully');
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
          this.presentAlert(this.MINIMUM_CROPS);
        }else {
          this.CropUpdate(selectedCrops);
        }
      }
    }
  }


  	CropUpdate(selectedCrops){
	    let loading = this.loadingCtrl.create({
	        content: 'Please wait...'
	      });
	    loading.present();
	    this.user.UpdateCrops(this.user_id,JSON.stringify(selectedCrops),this.lang).map(res => res.json()).subscribe((resp) => {
	      loading.dismiss();
	     if(resp.status==true){
          console.log(resp);
          this.userdata.crop_count = resp.crop_count;
          this.userdata.crops = resp.data;
          console.log(this.userdata);
          this.storage.set('userData',this.userdata);
          this.presentAlert(this.CROP_UPDATA_SUCCESSFULLY);
          this.navCtrl.push('ItemCreatePage');
	      }else{
          this.presentAlert(resp.msg);
	        alert(resp.msg);
	      }
	     }, (err) => {
	      loading.dismiss();
	    });
  	}

}
