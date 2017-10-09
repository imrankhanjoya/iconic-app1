import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CropsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crops',
  templateUrl: 'crops.html',
})
export class CropsPage {
  public lang:any;
  public cropList:any;

   public ionicNamedColor: string = '#101c00';
   public tump:boolean = true;
   public temp:boolean = true;
   buttonColor: string = '#dbdbdb';
   peon:string =  '#101c00';
   public shoPage:any;
   public skipDataList: Array<Object>;
   public userPhone:any;
   public userOTP:any;
   public userName:any;
   public userPassword:any;
   public userState:any;
   public userKharif:any;
   public userDictrictId:any;
   public userStateId:any;
   public userLat:any;
   public userLong:any;
   public loading:any;
   public kharifImage='cropselected.png';
   public hortiImage='fruitunselected.png';

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public cityStateProvider:CityStateProvider,public storage:Storage,
      public loadingCtrl: LoadingController,public user: User) {

      this.loading = this.loadingCtrl.create({
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
    console.log('ionViewDidLoad CropsPage');
    this.getUserData();
  }

  getCrops() {
    this.loading.present();
    this.cityStateProvider.sendCrop(this.lang).map(res => res.json()).subscribe((resp) => {
      this.cropList=resp.data;
      console.log(this.cropList);
      this.loading.dismiss();
    }, (err) => {
      console.log('my name is khan');
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
          this.userRigister(selectedCrops);
          //lag,long,mobile,name,password,language,state,district,village,crops,vegetables

          //this.navCtrl.push('MarketselectPage');
        }
      }
    }
  }
  userRigister(selectedCrops){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
    console.log(this.userLat+'-----'+this.userLong+'-----'+this.userPhone+'-----'+
      this.userName+'-----'+this.userPassword+'-----'+this.lang+'-----'+this.userStateId+'-----'+
      this.userDictrictId+'-----'+'village'+'-----'+JSON.stringify(selectedCrops)+'-----');

    this.user.userRegister(this.userLat,this.userLong,this.userPhone,this.userName,this.userPassword,this.lang,
      this.userStateId,this.userDictrictId,'village',JSON.stringify(selectedCrops)).map(res => res.json()).subscribe((resp) => {
      loading.dismiss();
     if(resp.status==true){
       this.storage.set('userData',resp.data);
       this.navCtrl.push('LoginPage');
      }else{
        console.log(resp.status);
        alert(resp.msg);
      }
     }, (err) => {
      loading.dismiss();
    });
  }
  getUserData(){
    this.storage.get('userPhone').then((val) => {
      this.userPhone=val;
    });
    this.storage.get('userOTP').then((val) => {
      this.userOTP=val;
    });
    this.storage.get('userName').then((val) => {
      this.userName=val;
    });
    this.storage.get('userPassword').then((val) => {
      this.userPassword=val;
    });
    this.storage.get('userState').then((val) => {
       this.userState=val;
    });
    this.storage.get('userDictrictId').then((val) => {
       this.userDictrictId=val;
    });
    this.storage.get('userStateId').then((val) => {
       this.userStateId=val;
    });
    this.storage.get('userLat').then((val) => {
       this.userLat=val;
    });
    this.storage.get('userLong').then((val) => {
       this.userLong=val;
    });
  }
}
