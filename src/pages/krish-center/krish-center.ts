import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,public krish:KrishProvider) {
  }


  ionViewDidLoad() {
     this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.getkrish(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    console.log('ionViewDidLoad KrishCenterPage');
  }

  getkrish(lat:any,long:any){
    this.krish.kendraList(lat,long).map(res => res.json()).subscribe((res) => {
      
        this.kendraData.data = res.data;
        this.kendraData.msg = res.msg;
        this.kendraData.status = res.status;
        this.kendraHome.data = res.data.results;
        console.log(res.data);
        //this.geoLoc.lat = res.data.results[0].geometry.location.lat;
        //this.geoLoc.lng = res.data.results[0].geometry.location.lng;
        console.log(this.geoLoc);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
  }
