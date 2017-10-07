  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
    searchQuery: string = '';
    public showList:boolean=false;
    private items: string[];

    public userLat:any;
    public userLong:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
      public alertCtrl: AlertController,public cityStateProvider:CityStateProvider,private nativeGeocoder: NativeGeocoder,
      private geolocation: Geolocation) {
      this. storage.get('userLang').then((val) => {
        this.lang=val;
        this.items = [];
        this.getAllState();
      });
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SelectLocationPage');
      this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.userLat=resp.coords.latitude;
       this.userLong=resp.coords.longitude;
       //this.storage.set('userLoction',resp.coords);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    change(ev){
      
       if( ev.length>2){
         this.initializeItems();
          this.showList=true;
          let val = ev;
          if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
              //this.items.remove();
              console.log(item.toLowerCase().indexOf(val.toLowerCase()));
                console.log('---'+val.toLowerCase());
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
         }else{
          this.showList=false;
             console.log("less");
         }
  }

    getAllState() {
      this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
        this.stateList=resp.data;
        this.initializeItems();
      });
    }
    getCourrnt(){
      this.nativeGeocoder.reverseGeocode(this.userLat, this.userLong)
      .then((result: NativeGeocoderReverseResult) => {
        console.log(JSON.stringify(result));

        this.navCtrl.push('CropsPage');
      })
      .catch((error: any) => console.log(error));
      //this.navCtrl.push('CropsPage');
    }


    initializeItems() {
      for (var i = 0;  i < this.stateList.length ; i++) {
        this.items.push(this.stateList[i].state_name);
      }
    }
    userSelectedState(state){
      this.storage.set('userState',state);
      this.navCtrl.push('CropsPage');
    }

  }
