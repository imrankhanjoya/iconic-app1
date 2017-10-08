  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
  import { CityStateProvider } from '../../providers/city-state/city-state';
  import { Storage } from '@ionic/storage';
  import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
  import { Geolocation } from '@ionic-native/geolocation';


  /**
   * Generated class for the SelectLocationPage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-select-location',
    templateUrl: 'select-location.html',
  })
  export class SelectLocationPage {
    public villageName:any;
    public lang:any;
    public selectState: any;
    public stateList: any;
    public districtList: any;
    searchQuery: string = '';
    public showList:boolean=false;
    
    public userLat:any;
    public userLong:any;
    public loading:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
      public alertCtrl: AlertController,public cityStateProvider:CityStateProvider,private nativeGeocoder: NativeGeocoder,
      private geolocation: Geolocation,public loadingCtrl: LoadingController) {
      this. storage.get('userLang').then((val) => {
        this.lang=val;
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.getAllState();
      });
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SelectLocationPage');
      this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.userLat=resp.coords.latitude;
       this.userLong=resp.coords.longitude;
       this.storage.set('userLat',this.userLat);
       this.storage.set('userLong',this.userLong);
       //this.storage.set('userLoction',resp.coords);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }


    getAllState() {
      this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
        this.stateList=resp.data;
        this.loading.dismiss();
      });
    }
    getCourrnt(){
      this.navCtrl.push('CropsPage');
      // this.nativeGeocoder.reverseGeocode(this.userLat, this.userLong)
      // .then((result: NativeGeocoderReverseResult) => {
      //   console.log(JSON.stringify(result));
      //   this.navCtrl.push('CropsPage');
      // })
      // .catch((error: any) => console.log(error));
      //this.navCtrl.push('CropsPage');
    }


    userSelectedState(state){
      this.storage.set('userState',state);
      this.navCtrl.push('CropsPage');
    }

  onStateSelect(stateid) {
    //this.loading.present();
    this.storage.set('userStateId',stateid);
    this.cityStateProvider.getDistrict(this.lang,stateid).map(res => res.json()).subscribe((resp) => {
        this.districtList=resp.data;
        //  this.loading.dismiss();
      }); 
  }
  onDistrictSelect(districtId){
    this.storage.set('userDictrictId',districtId);
    this.navCtrl.push('CropsPage');
  }
}
