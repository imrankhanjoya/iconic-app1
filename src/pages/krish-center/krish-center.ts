import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { KrishProvider } from '../../providers/krish/krish';



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
    public alertCtrl: AlertController) {

    this.isGetLocation=true;

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    setTimeout(()=>{
        if (this.isGetLocation) {
          this.locationAlert();
          this.getkrish(26.957740,75.745459);
        }
      },10000);
  }


  ionViewDidLoad() {
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //    console.log(resp.coords.latitude+" : "+resp.coords.longitude);
    //    if (!this.isGetLocation) {
    //       this.getkrish(resp.coords.latitude,resp.coords.longitude);
    //    }
    // }).catch((error) => {
    //   console.log('Error getting location----', error);
    //   if (!this.isGetLocation) {
    //       this.locationAlert();
    //       this.getkrish(26.957740,75.745459);
    //     }

    // });
    let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
          watch.unsubscribe();
          console.log(data.coords.latitude+" --:-- "+data.coords.longitude);
          if (!this.isGetLocation) {
            this.getkrish(data.coords.latitude,data.coords.longitude);
          }
      });
      
      // To stop notifications
      
     console.log('ionViewDidLoad KrishCenterPage');
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
