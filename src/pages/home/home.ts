import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';
import { KrishProvider } from '../../providers/krish/krish';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public mandiData: { status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public newsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public kendraData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public kendraHome: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public geoLoc:{lat:any,lng:any} = {lat:23,lng:24};
  public topMenu:any;
  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams, public mandi:MandiProvider, public news:NewsProvider, public krish:KrishProvider) {
      

      
  		this.topMenu = false;
  }

  ionViewDidLoad() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.getkrish(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    this.getMandiData();
    this.getNews();

    console.log('ionViewDidLoad HomePage');
  }

  toggleMenu(){

  	if(this.topMenu==false){
  		this.topMenu =true;
  	}else{
  		this.topMenu = false;
  	}

  }
  
  getMandiData(){
    this.mandi.mandiRates().map(res => res.json()).subscribe((res) => {
      
        this.mandiData.data = res;
        //console.log(this.mandiData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
  getNews(){
    this.news.homeNews().map(res => res.json()).subscribe((res) => {
      
        this.newsData.data = res.data;
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
        console.log(this.newsData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  getkrish(lat:any,long:any){
    this.krish.kendraList(lat,long).map(res => res.json()).subscribe((res) => {
      
        this.kendraData.data = res.data;
        this.kendraData.msg = res.msg;
        this.kendraData.status = res.status;
        this.kendraHome.data = res.data.results[0];
        console.log(res.data);
        this.geoLoc.lat = res.data.results[0].geometry.location.lat;
        this.geoLoc.lng = res.data.results[0].geometry.location.lng;
        console.log(this.geoLoc);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
  

  gotoAskquestion(){
    this.navCtrl.push('AskquestionPage');
  }

  gotoWeatherPage(){
    this.navCtrl.push('WeatherPage');
  }
  gotoservicesPage(){
    this.navCtrl.push('ServicesPage');
  }
  gotomandiPage(){
    this.navCtrl.push('MandiPage');
  }
  gotoNewsPage(){
    this.navCtrl.push('NewsPage');
  }

}
