import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';
import { WeatherProvider } from '../../providers/weather/weather';
import { KrishProvider } from '../../providers/krish/krish';
import { Geolocation } from '@ionic-native/geolocation';
import { ExpertproviderProvider } from '../../providers/expertprovider/expertprovider';
import { MarketproProvider } from '../../providers/marketpro/marketpro';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public ExpertsDatalist: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public mandiData:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandiData1:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandiData2:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};  public newsData: { status:string, msg: string,data: any } =   {status:'false',msg:'test',data:''};
  public kendraData: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public kendraHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public wheaterHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public productHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public geoLoc:{lat:any,lng:any} = {lat:23,lng:24};
  public topMenu:any;
  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams, public mandi:MandiProvider, public news:NewsProvider, public krish:KrishProvider,public weather:WeatherProvider,public experts:ExpertproviderProvider,public market:MarketproProvider) {
      

      
  		this.topMenu = false;
  }

  ionViewDidLoad() {
    
      this.geolocation.getCurrentPosition().then((resp) => {
         console.log(resp);
         this.getkrish(resp.coords.latitude,resp.coords.longitude);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
      this.getweather(127900);
      this.getMandiData();
      this.getNews();
      this.getexperts();
      this.getmarkets();
      console.log('ionViewDidLoad HomePage');
  }

  toggleMenu(){

  	if(this.topMenu==false){
  		this.topMenu =true;
  	}else{
  		this.topMenu = false;
  	}

  }
  
  getweather(location:any){
    this.weather.weatheHourly().map(res => res.json()).subscribe((res) => {
      
        this.wheaterHome.data = res.data;
        this.wheaterHome.msg = res.msg;
        this.wheaterHome.status = res.status;
        console.log(res.data);
        
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
  

  getMandiData(){
    this.mandi.usermandi().map(res => res.json()).subscribe((res) => {
        this.mandiData= res.data[0];
        this.mandiData1= res.data[1];
        this.mandiData2= res.data[2];        
        console.log(this.mandiData.data);
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

  getexperts(){
    this.experts.Experts().map(res => res.json()).subscribe((res) => {
      
        this.ExpertsDatalist.data = res.data;
        this.ExpertsDatalist.msg = res.msg;
        this.ExpertsDatalist.status = res.status;
        console.log(this.ExpertsDatalist.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  getmarkets(){
    this.market.productlist(5).map(res => res.json()).subscribe((res) => {
      
        this.productHome.data = res.data;
        this.productHome.msg = res.msg;
        this.productHome.status = res.status;
        console.log('market data start');
        console.log(this.productHome);
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
        //this.geoLoc.lat = res.data.results[0].geometry.location.lat;
        //this.geoLoc.lng = res.data.results[0].geometry.location.lng;
        console.log(this.geoLoc);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
  

  gotoAskquestion(){
    this.navCtrl.push('QuestionlistPage');
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
   gotomandiDetail(){
    this.navCtrl.push('MandiDetailsPage');
  }
  gotoNewsPage(){
    this.navCtrl.push('NewsPage');
  }
  gotoExpertsPage(){
    this.navCtrl.push('ExpertsPage');
  }
  gotoMarketPage(){
    this.navCtrl.push('MarketPage');
  }


}
