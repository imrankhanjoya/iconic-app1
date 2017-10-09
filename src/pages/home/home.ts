import { Component, ViewChild ,ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';
import { WeatherProvider } from '../../providers/weather/weather';
import { KrishProvider } from '../../providers/krish/krish';
import { ExpertsProvider } from '../../providers/experts/experts';
import { Geolocation } from '@ionic-native/geolocation';
import { ExpertproviderProvider } from '../../providers/expertprovider/expertprovider';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AnnouncementproProvider } from '../../providers/announcementpro/announcementpro';

import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

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
@ViewChild('man_id') elem:ElementRef;
@ViewChild('karsi_id') karsi_id:ElementRef;
@ViewChild('tongl_id') tongl_id:ElementRef;
@ViewChild('main_div') main_div:ElementRef;
@ViewChild(Content) content: Content;

  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandidata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandidata1:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandidata2:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};  
  public newsData: { status:string, msg: string,data: any } =   {status:'false',msg:'test',data:''};
  public kendraData: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public kendraHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public wheaterHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public productHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public announceList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public geoLoc:{lat:any,lng:any} = {lat:26.957740,lng:75.745459};
  public topMenu:string='';
  public rotateClass:any;
  public toolbarClass:any;
  public maindiIconClass:any;
  public userDisplayName:any;
  public userKm:any;
  

  constructor(public platform:Platform,private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,
    public mandi:MandiProvider, public news:NewsProvider, public Announce:AnnouncementproProvider, public krish:KrishProvider, public weather:WeatherProvider, 
    public experts:ExpertsProvider,public market:MarketproProvider, private iab: InAppBrowser,public api:Api,
    public storage:Storage,private youtube: YoutubeVideoPlayer,private rd: Renderer2) {
    this.rotateClass="";
      
       storage.get('userData').then((userdata) => {
          if (userdata) {
            this.userDisplayName=userdata.display_name;
          }
       });
  		//this.topMenu = 'toolbarClosed';
  }

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       this.storage.set('userLoction',resp.coords);
       this.getkrish(resp.coords.latitude,resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    this.getMandiData();
    this.getNews();
    this.getweather(127900);
    this.get_expert();
    this.getmarkets();
    this.getannouncement();
    
  }

  toggleMenu(){
  	if(this.topMenu=='toolbarClosed' || this.topMenu=='' ){
      this.rotateClass="rotateimage1";
      this.toolbarClass="toolbarOpen";
  		this.topMenu ="toolbarOpen";
  	}else{
      console.log(this.rotateClass);
      this.rotateClass="rotateimage2";
      this.toolbarClass="toolbarClosed";
      this.topMenu ="toolbarOpen";
  		this.topMenu = "toolbarClosed";
  	}

  }
  
  get_expert(){
    this.experts.Experts_list().map(res => res.json()).subscribe((res) => {
      
        this.expertdata = res;
        console.log(this.expertdata);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

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
        this.mandidata= res.data[0] ;
        this.mandidata1= res.data[1];
        this.mandidata2= res.data[2];        
        console.log(this.mandidata.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  getNews(){
    this.news.homeNews(3).map(res => res.json()).subscribe((res) => {
      
        this.newsData.data = res.data;
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
        
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
        
        console.log(res['data']);
        console.log(res['data'].results);
        this.geoLoc.lat = res.data.results[0].geometry.location.lat;
        this.geoLoc.lng = res.data.results[0].geometry.location.lng;
        this.userKm = this.krish.getDistanceFromLatLonInKm(this.geoLoc.lat,this.geoLoc.lng,lat,long);
        console.log(this.userKm);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }

  getannouncement(){
    this.Announce.announcementList(1).map(res => res.json()).subscribe((res) => {
      
        this.announceList.data = res.data;
        this.announceList.msg = res.msg;
        this.announceList.status = res.status;
        console.log('Add for Announcement');
        console.log(this.announceList.data[0].title);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
  

  gotoAskquestion(){
    this.navCtrl.push('QuestionlistPage');
  }

  gotoWebView(URL){
    console.log("baran"+URL); 
    var ref = this.iab.create(URL, '_blank', 'location=yes');

  }
  gotoWeatherPage(){
    this.navCtrl.push('WeatherPage');
  }
  gotoservicesPage(){
    this.navCtrl.push('ServicesPage');
  }
  goToExpertDetial(id){
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }
  gotomandiDetail(){
    this.navCtrl.push('MandiDetailsPage');
  }
  gotoNewsPage(){
    this.navCtrl.push('NewsPage');
  }
  gotoMarketPage(){
    this.navCtrl.push('MarketPage');
  }
  gotoVedio(){
  this.navCtrl.push('VideoPage');
  }
  gotoRentals(){
  this.navCtrl.push('RentalsPage');
  }
  gotoAnounsePage(){
  this.navCtrl.push('AnnouncementPage');
  }

  goToBlogPage(){
   this.navCtrl.push('CardsPage'); 
  }
  goToSetting(){
   this.navCtrl.push('SettingsPage'); 
  }

  //----------------------Hader Animiation Start------
public isRun1=true;
public isRun2=false;
public isRun3=false;
public isCount=true;
public oneForSize:any;
  onScroll(ev){
    if(this.isCount){
      this.isCount=false
       this.oneForSize=ev.scrollHeight/4;
    }
    if(this.isRun1){
      if (ev.scrollTop >= this.oneForSize) {
          this.changeClass('1');
          this.isRun1=false;
          this.isRun2=true;
          this.isRun3=true;
          //console.log('--------'+JSON.stringify(ev));
        }
    }
    if(this.isRun2){
     
      if (ev.scrollTop >= (this.oneForSize*2)) {
          this.changeClass('2');
          this.isRun2=false;
          this.isRun1=false;
          this.isRun3=true;
        }
    }
    if(this.isRun3){
      
      if (ev.scrollTop >= (this.oneForSize*3)) {
          this.changeClass('3');
          this.isRun2=false;
          this.isRun1=false;
          this.isRun3=true;
        }
    }
  }

async changeClass(count): Promise<string> {
   // console.log('-------------------');
      if (count=='1') {
        this.rd.addClass(this.elem.nativeElement, 'fadeInLeft');
        this.rd.removeClass(this.elem.nativeElement, 'opacityGone');
        return 'datarebjnj';  
      }
      if (count=='2') {
        this.rd.addClass(this.karsi_id.nativeElement, 'fadeInLeft');
        this.rd.removeClass(this.karsi_id.nativeElement, 'opacityGone');
        return 'datarebjnj';  
      }
      if (count=='3') {
        this.rd.addClass(this.tongl_id.nativeElement, 'fadeInLeft');
        this.rd.removeClass(this.tongl_id.nativeElement, 'opacityGone');
        return 'datarebjnj';  
      }
      
      return 'datarebjnj';
   }
//----------------------Hader Animiation End------

// ngAfterViewInit() {
//   this.content.ionScroll.subscribe((data)=>{
//    // console.log(data);
//     if (data.scrollTop >= 206) {
//       if(this.isRun){
//         console.log(this.main_div.nativeElement.offsetHeight);
//         this.rd.addClass(this.elem.nativeElement, 'fadeInLeft');
//         this.rd.removeClass(this.elem.nativeElement, 'opacityGone');
//         this.isRun=false;
//       }
//     }
//   });
// }
  gotoMap(latitude,longitude){
    console.log(latitude+'---'+longitude+'----');
   if (this.platform.is('android')) {
      //  window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
        window.open('geo://' +latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(no)', '_system');
      };
  }

}
