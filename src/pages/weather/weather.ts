import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

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
//public weatherfivedayD:any;
	public wheaterdetailall: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	public weatherfiveday: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	constructor(public navCtrl: NavController, public navParams: NavParams,public weather:WeatherProvider) {
  }

  ionViewDidLoad() {

    this.weatherdetail(127900);
    this.weatherfivedays(127900);
    console.log('ionViewDidLoad WeatherPage');
  }

 weatherdetail(location:any){
    this.weather.weatherdetail().map(res => res.json()).subscribe((res) => {
      
        this.wheaterdetailall.data = res.data;
        this.wheaterdetailall.msg = res.msg;
        this.wheaterdetailall.status = res.status;
        //this.weatherfivedayD=res.data.headline.Text;
        console.log(this.wheaterdetailall);
        
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
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

}
