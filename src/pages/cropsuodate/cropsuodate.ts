import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
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
   public user_id:any;
   public userdata:any;
   public userCropIdList:['','',''];
  	constructor(public navCtrl: NavController, 
  		public navParams: NavParams,
  		public storage:Storage,
      	public loadingCtrl: LoadingController,
      	public cityStateProvider:CityStateProvider,
         private viewCtrl: ViewController,public user: User
      	) 
  		{      
  			  this.loading = this.loadingCtrl.create({
        	   content: 'Please wait...'
          });

          this.shoPage='Kharif';
          this.skipDataList = [];
      this. storage.get('userLang').then((val) => {
        this.lang=val;
        this.getCrops();
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
          alert('Select Minimum 3')
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
          this.navCtrl.push('ItemCreatePage');
	      }else{
	        alert(resp.msg);
	      }
	     }, (err) => {
	      loading.dismiss();
	    });
  	}

}
