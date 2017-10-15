import { Component } from '@angular/core';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  public loading:any;
  public lang:any;
  public selectState: any;
  public stateList: any;
  public districtList: any;
  public tehsilList: any;
  public location:any
	public wheaterdetailall: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	public weatherfiveday: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public storage:Storage,
              public weather:WeatherProvider,
              public cityStateProvider:CityStateProvider
              ) {
      }

  ionViewDidLoad() {
    this.getAllState();
    this.weatherdetail(1);
    this.weatherfivedays(1);
    console.log('ionViewDidLoad WeatherPage');
  }

 weatherdetail(tehsil){
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        console.log('send tehsil'+tehsil);
        this.weather.weatherdetail(tehsil).map(res => res.json()).subscribe((res) => {
      
        this.wheaterdetailall.data = res.data;
        this.wheaterdetailall.msg = res.msg;
        this.wheaterdetailall.status = res.status;
        //this.weatherfivedayD=res.data.headline.Text;
        console.log(this.wheaterdetailall);
        
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
      this.loading.dismiss();
  }

  weatherfivedays(location:any){
    this.weather.weatherfivedays().map(res => res.json()).subscribe((res) => {
      
        this.weatherfiveday.data = res.data;
        this.weatherfiveday.msg = res.msg;
        this.weatherfiveday.status = res.status;
        console.log(res.data.headline.Text);
        console.log(this.weatherfiveday.data);
        
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }

  onStateSelect(stateid) {
    var array = stateid.split('~');
    this.cityStateProvider.getDistrict(this.lang,array[0]).map(res => res.json()).subscribe((resp) => {
        this.districtList=resp.data;
        console.log('this is district');
        console.log(this.districtList);
      }); 
  }
  onDistrictSelect(districtId){
    var array = districtId.split('~');
    this.storage.set('userDictrictId',array[0]);
    this.storage.set('userDictrict',array[1]);this.cityStateProvider.getTehsil(this.lang,array[0]).map(res => res.json()).subscribe((resp) => {
      this.tehsilList=resp.data;
      //  this.loading.dismiss();
    }); 
  }
  
  getAllState() {
    this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
      this.stateList=resp.data;
      console.log(this.stateList);
      this.loading.dismiss();
    });
  }
  weatherget(tehsil){
    this.weatherdetail(tehsil);
    this.weatherfivedays(tehsil);
  }

}
