import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { KrishProvider } from '../../providers/krish/krish';
import { Events } from 'ionic-angular';



/**
 * Generated class for the KrishCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-krish-center',
  templateUrl: 'krish-center.html',
})
export class KrishCenterPage {
   public kendraData: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public kendraHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public geoLoc:{lat:any,lng:any} = {lat:23,lng:24};

  public loading:any;
  public alert:any;
  public isGetLocation:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,
    public krish:KrishProvider,public loadingCtrl: LoadingController,public platform:Platform,
    public alertCtrl: AlertController,public events: Events) {
    this.isGetLocation=true;
    this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          this.loading.present();
    
  }


  ionViewDidLoad() {
     console.log('ionViewDidLoad KrishCenterPage');
     this.getLocation();
     this.startTimer();
  }

    getLocation(){

      var watchID = navigator.geolocation.watchPosition((resp)=>{
        console.log('=========='+JSON.stringify(resp));
      },
      (resp)=>{
          console.log('-------------');
      },
      { enableHighAccuracy: false,timeout: 15000,maximumAge:60000 });

      this.geolocation.getCurrentPosition({ maximumAge: 60000, timeout: 15000, enableHighAccuracy: true }).then((resp) => {
          console.log(resp.coords.latitude+" --:-----// "+resp.coords.longitude+"==========="+this.isGetLocation);
            console.log("===chal bhai mil gai location--");
            if (this.isGetLocation) {
             this.getkrish(resp.coords.latitude,resp.coords.longitude);
           }
       }).catch((error) => {
         console.log('Error getting location----'+error);
         if (this.isGetLocation) {
             this.locationAlert();
             this.getkrish(26.957740,75.745459);
           }

       });
    }
    startTimer(){
      setTimeout(()=>{
        if (this.isGetLocation) {
          this.locationAlert();
          this.getkrish(26.957740,75.745459);
        }
      },10007);
    }
   back(){
  // this.navCtrl.pop('HomePage');  
   this.navCtrl.push(HomePage);
   }

  getkrish(lat,long){
    this.isGetLocation=false;
    console.log('Run getkrish API with : '+lat+"  :  "+long);
    this.krish.kendraList(lat,long).then((res)=>{
      this.kendraData.data = res.data;
      this.kendraData.msg = res.msg;
      this.kendraData.status = res.status;
      this.kendraHome.data = res.data;
      this.loading.dismiss();

    });  

  }

  gotoMap(latitude,longitude,name){
    console.log(latitude+'---'+longitude+'----'+name);
   if (this.platform.is('android')) {
      //  window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
        window.open('geo://' +latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(' + name + ')', '_system');
      };
  }
  makeCall(){
   
  }
  locationAlert() {
      this.alert = this.alertCtrl.create({
        title: 'Note',
        message: 'Your Location is Off ?',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.alert =null;
            }
          }
        ]
      });
      this.alert.present();
    }
}
