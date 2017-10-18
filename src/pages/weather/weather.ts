import { Component ,ViewChild} from '@angular/core';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController,ModalController, ViewController } from 'ionic-angular';
import { FilterLocationPage } from '../filter-model/FilterLocationPage';

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
@ViewChild('mySlider') slider;
  public loading:any;
  public lang:any;
  public location:any
  public tehsilId:any;
  public filterLocation:any;
	public wheaterdetailall: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	public weatherfiveday: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public storage:Storage,
              public weather:WeatherProvider,
              public modalCtrl:ModalController,
              public viewCtrl:ViewController
              ) {

              this.tehsilId = navParams.get('filter_tehsil');
      }

  ionViewDidLoad() {
    this.weatherdetail(1);
    this.weatherfivedays(1);
    console.log('ionViewDidLoad WeatherPage');
  }

 weatherdetail(tehsil){

        var tehsil = ( typeof this.tehsilId != 'undefined' )?this.tehsilId:tehsil;
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        console.log('send tehsil'+tehsil);
        this.weather.weatherdetail(tehsil).map(res => res.json()).subscribe((res) => {

        this.wheaterdetailall.data = res.data;
        this.wheaterdetailall.msg = res.msg;
        this.wheaterdetailall.status = res.status;
        this.tehsilId=this.wheaterdetailall.data.tehsil_id;

        //this.weatherfivedayD=res.data.headline.Text;
        //console.log(JSON.stringify());

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
  
  weatherget(tehsil){
    this.weatherdetail(tehsil);
    this.weatherfivedays(tehsil);
  }
  slideChanged(index){
    console.log(index);
  }
  openFilter(){
    let modal = this.modalCtrl.create('FilterLocationPage');
    modal.present();
  }
  
  dismiss(){
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
  }




}
