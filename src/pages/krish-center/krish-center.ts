import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,
    public krish:KrishProvider,public loadingCtrl: LoadingController,public platform:Platform) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }


  ionViewDidLoad() {
     this.getkrish();
     console.log('ionViewDidLoad KrishCenterPage');
  }

  getkrish(lat:any,long:any){
    console.log('Run getkrish API');

    this.krish.kendraList().then((res)=>{
      this.kendraData.data = res.data;
      this.kendraData.msg = res.msg;
      this.kendraData.status = res.status;
      this.kendraHome.data = res.data.results;
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
}
