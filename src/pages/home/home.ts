import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';

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
  public topMenu:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mandi:MandiProvider, public news:NewsProvider) {
      this.getMandiData();
      this.getNews();
  		this.topMenu = false;
  }

  ionViewDidLoad() {
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
}
