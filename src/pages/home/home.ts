import { Component, ViewChild ,ElementRef, Renderer2 } from '@angular/core';
import { Content } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController,ViewController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';
import { WeatherProvider } from '../../providers/weather/weather';
import { KrishProvider } from '../../providers/krish/krish';
import { ExpertsProvider } from '../../providers/experts/experts';
import { Geolocation } from '@ionic-native/geolocation';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AnnouncementproProvider } from '../../providers/announcementpro/announcementpro';
import { CallProvider } from '../../providers/call/call';
import { MandiDetailsPage } from '../mandi-details/mandi-details';
import { TabProvider } from '../../providers/tab/tab';
import { WeatherPage } from '../weather/weather';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { FCM } from '@ionic-native/fcm';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loading :any;
@ViewChild('man_id') elem:ElementRef;
@ViewChild('karsi_id') karsi_id:ElementRef;
@ViewChild('tongl_id') tongl_id:ElementRef;
@ViewChild('main_div') main_div:ElementRef;
@ViewChild(Content) content: Content;
@ViewChild("contentRef") contentHandle: Content;

  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandidata:{ status: boolean, msg: string,data: any,graph_months:any, graph_price:any} = {status:false,msg: 'test',data:'', graph_months:[],graph_price:[]};
  public mandidata1:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public mandidata2:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};  
  public newsData: { status:string, msg: string,data: any } =   {status:'false',msg:'test',data:''};
  public kendraData: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public kendraHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public wheaterHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public productHome: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public announceList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:[]};
  public usertopcard: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:[]};
  public geoLoc:{lat:any,lng:any} = {lat:26.957740,lng:75.745459};
  public topMenu:string='';
  public rotateClass:any;
  public toolbarClass:any;
  public maindiIconClass:any;
  public userDisplayName:any;
  public userKm:any;
  public userId:any;
  public tehsil:any;
  public NowTime:any;
  public token:any;
  public toggleMenuText:any;
  public onBording:boolean=false;
  public isHeaderAnimition=true;
  public alert:any;
  public exitAlertMess:any;
  constructor(private fcm: FCM,public user: User,public translateService:TranslateService,public platform:Platform,private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,
    public mandi:MandiProvider, public news:NewsProvider, public Announce:AnnouncementproProvider, public krish:KrishProvider, public weather:WeatherProvider, 
    public experts:ExpertsProvider,public market:MarketproProvider, private iab: InAppBrowser,public api:Api,
    public storage:Storage,private rd: Renderer2,public callProvider:CallProvider,
    public tabProvider:TabProvider,public events:Events,public loadingCtrl:LoadingController,public alertCtrl: AlertController,
    public viewCtrl:ViewController,public splashScreen:SplashScreen) {


    //--------homepage----------
    this.translateService.get('EXIT_ALERT').subscribe((value) => {
      this.exitAlertMess = value;
    });
    this.toggleMenuText="more";
    this.rotateClass="rotateimage1";
      //this.topMenu = 'toolbarClosed';
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      storage.get('notificationData').then((notiData) => {
          console.log("-=-=-=-notiData=-=-=-=-=-= : "+notiData);
        if (notiData) {
            this.loading.dismiss();
            storage.set('notificationData', '');
            this.gotoAnounsePage(notiData.type,notiData.type_value);
          }
        });
      let view = this.navCtrl.getActive();
                 console.log("  current Page  :  " + view);
      platform.ready().then(() => {

              platform.registerBackButtonAction(() => {
                 let view = this.navCtrl.getActive();
                 console.log("  current Page  :  " + view);
                 if (view.name=="HomePage") {
                    if(this.alert){ 
                      this.alert.dismiss();
                      this.alert =null;     
                    }else{
                      this.exitConfrom();
                    }
                  }else {
                    this.navCtrl.pop({});
                    // const index = this.viewCtrl.index;
                    // this.navCtrl.remove(index);
                  }
              });
            });
      //this.updatetoken(1234);

  }

   exitConfrom() {
      this.alert = this.alertCtrl.create({
        title: '',
        message: this.exitAlertMess,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.alert =null;
            }
          },
          {
            text: 'Exit',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.alert.present();
    }

  ionViewDidLoad() {
    this.splashScreen.hide();
    this.storage.get('haderAnimition').then((data) => {
        if (data) {
          this.isHeaderAnimition=false;
          this.onBording = true;
          this.allTimeShow();
        }
      });
   
    this.geolocation.getCurrentPosition().then((resp) => {
       console.log(resp);
       //this.storage.set('userLoction',resp.coords);
       this.geoLoc.lat = resp.coords.latitude;
       this.geoLoc.lng = resp.coords.longitude;
       this.storage.set('userLoction.latitude',resp.coords.latitude);
       this.storage.set('userLoction.longitude',resp.coords.longitude);

       this.getkrish(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.storage.get('userData').then((userdata) => {
      if (userdata) {
        console.log(userdata);
        this.userId=userdata.ID;
        this.userDisplayName=userdata.display_name;
        this.tehsil=userdata._user_tehsil;
        this.getMandiData();
        this.getweather(this.tehsil);
        this.getmarkets();
        this.getUserTopCard();
        this.getNews();
        this.get_expert();
        this.getannouncement();
        this.getMandiDetails(this.tehsil);
        this.weather.weatherdetail(this.tehsil);
        this.storage.get('updated_token').then((token) => {
          if (token) {
            console.log('token found sucessfully---'+token+'-------');
            this.updatetoken(token,this.userId);
          }
          console.log('token found sucessfully- NOt--'+token+'-------');
        });
      } 
    
    });


    


    //For tab Scroll
    this.startVisbol=true;
  }

  toggleMenu(){
    if(this.topMenu=='toolbarClosed' || this.topMenu=='' ){
    dataLayer.push({
       'appEventCategory': 'Top Menu',
       'appEventAction': 'Clicked',
       'appEventLabel': 'View More'
     });
     dataLayer.push({'event': 'appEvent'});

      this.rotateClass="rotateimage2";
      this.toolbarClass="toolbarOpen";
      this.topMenu ="toolbarOpen";
      this.toggleMenuText="less";
      
    }else{
       dataLayer.push({
       'appEventCategory': 'Top Menu',
       'appEventAction': 'Clicked',
       'appEventLabel': 'View Less'
        });
       dataLayer.push({'event': 'appEvent'});

      this.rotateClass="rotateimage1";
      this.toolbarClass="toolbarClosed";
      this.topMenu ="toolbarOpen";
      this.topMenu = "toolbarClosed";
      this.toggleMenuText="more";
    
    }

  }
  
  get_expert(){
    this.experts.Experts_list().then((res)=>{
        this.expertdata = res;
    });
  }

  getweather(tehsil){
    this.NowTime = new Date();
    console.log('this is current tehsil'+tehsil);
    this.weather.weatheHourly(tehsil).then((res)=>{
        this.wheaterHome.data = res.data;
        this.wheaterHome.msg = res.msg;
        this.wheaterHome.status = res.status;
        this.loading.dismiss();
    });
  }
  

  getMandiData(){
    this.mandi.usermandi(this.userId,this.tehsil).then((res)=>{
        this.mandidata= res.data[0] ;
        this.mandidata.graph_months=this.mandidata.graph_months;
        this.mandidata.graph_price=this.mandidata.graph_price;
        this.mandidata1 = '';this.mandidata2='';
        if (res.data[2]) {
          this.mandidata1= res.data[1];
        }
        console.log('this.mandidata1');
        console.log(this.mandidata1);
        if (res.data[2]) {
          this.mandidata2= res.data[2];
        }
        this.mandidata.status=true;
        this.loading.dismiss();
    });
  }

  getNews(){
    this.news.homeNews(3).then((res)=>{
        this.newsData.data = res.data;
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
    });
  }

  getmarkets(){
    console.log('getmarkets');
    this.market.productlist(5).then((res)=>{
        this.productHome.data = res.data;
        this.productHome.msg = res.msg;
        this.productHome.status = res.status;
        console.log(this.productHome.data);
        this.loading.dismiss();
    });
    console.log('getmarkets');
  }

  getkrish(lat:any,long:any){
    this.krish.kendraList(lat,long).then((res)=>{
        this.kendraData.data = res.data;
        this.kendraData.msg = res.msg;
        this.kendraData.status = res.status;
        this.kendraHome.data = res.data[0];
        this.geoLoc.lat = res.data[0].lat;
        this.geoLoc.lng = res.data[0].longe;
        this.userKm = this.krish.getDistanceFromLatLonInKm(this.geoLoc.lat,this.geoLoc.lng,lat,long);
    });
  }

  getannouncement(){
    this.Announce.announcementList(1).then((res)=>{
        console.log(this.announceList);
        this.announceList.data = res.data;
        this.announceList.msg = res.msg;
        this.announceList.status = res.status;
    });
  }



  getUserTopCard(){
    this.Announce.apiusertopcard().then((res)=>{
        this.usertopcard.data = res.data;
        this.usertopcard.msg = res.msg;
        this.usertopcard.status = res.status;
    });
  } 

  gotoAskquestion(numbr){
    if(numbr == 'menu'){
      dataLayer.push({
           'appEventCategory': 'Top Menu',
           'appEventAction': 'Clicked',
           'appEventLabel': 'Ask Expert'
         });
         dataLayer.push({'event': 'appEvent'});
        this.navCtrl.push('QuestionlistPage');
      }
    if(numbr == 'card'){
      dataLayer.push({
           'appEventCategory': 'Home',
           'appEventAction': 'Clicked',
           'appEventLabel': 'Krishi Sevayen - Ask the Expert'
         });
         dataLayer.push({'event': 'appEvent'});
        this.navCtrl.push('QuestionlistPage');
      }
  }

  gotoAgriinfo(){
    dataLayer.push({
       'appEventCategory': 'Top Menu',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Krishi Jankari'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('AgriInfoPage');
  }

  gotoWebView(URL,title){
    this.iab.create(URL, '_blank', 'location=yes');
  }

  openNews(URL,title){
     this.gotoWebView(URL,title);
     dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'News - '+title
     });
     dataLayer.push({'event': 'appEvent'});
  }

  gotoWeatherPage(numbr){
    if(numbr == 'menu'){
      dataLayer.push({
         'appEventCategory': 'Top Menu',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Weather'
       });
      dataLayer.push({'event': 'appEvent'});
      this.navCtrl.push(WeatherPage);
    }
    if(numbr == 'card'){
      dataLayer.push({
        'appEventCategory': 'Home',
        'appEventAction': 'Clicked',
        'appEventLabel': 'Weather Card'
      });
      dataLayer.push({'event': 'appEvent'});
      this.navCtrl.push(WeatherPage);
    }         
  }

  gotoservicesPage(){
    dataLayer.push({
      'appEventCategory': 'Home',
      'appEventAction': 'Clicked',
      'appEventLabel': 'Krishi Sevayen'
    });
    dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('ServicesPage');
  }

  goToExpertDetial(id,title){
    dataLayer.push({
      'appEventCategory': 'Home',
      'appEventAction': 'Clicked',
      'appEventLabel': 'Expert - '+title
    });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }

  gotomandiDetail(numbr){
    if(numbr == 'menu'){
      dataLayer.push({
         'appEventCategory': 'Top Menu',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Mandi'
      });
    dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push(MandiDetailsPage);
    }

    if(numbr == 'card'){
      dataLayer.push({
        'appEventCategory': 'Home',
        'appEventAction': 'Clicked',
        'appEventLabel': 'Mandi - View More'
      });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push(MandiDetailsPage);
    }

  }

  gotoNewsPage(){
    dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'News - View More'
      });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('NewsPage');
  }

  gotoMarketPage(){
   dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Market - View More'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('MarketPage');
  }

  gotoMarketViewPage(product_id,name,sku){
  dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Market - sku: '+sku+'~~~name: '+name
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('MarketViewPage',{id:product_id});
  }

  gotoVedio(numbr){
    if(numbr == 'menu'){
     dataLayer.push({
       'appEventCategory': 'Top Menu',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Video'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('VideoPage');
    }

    if(numbr == 'card'){
     dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Video - View More'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('VideoPage');
    }

  }
  gotoRentals(){
    this.navCtrl.push('RentalsPage');
  }
  /*gotoAnounsePage(){
    this.navCtrl.push('AnnouncementPage');
  }*/
  goToBlogPage(){
  dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Expert - View More'
     });
     dataLayer.push({'event': 'appEvent'});
   this.navCtrl.push('CardsPage'); 
  }
  goToSetting(){
   this.navCtrl.push('SettingsPage'); 
  }
  goToCrops(){
   this.navCtrl.push('CroplistPage',{croptype:'Rabi'}); 
  }
   goToKharif(){
   dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Krishi Sevayen - Kharif'
     });
     dataLayer.push({'event': 'appEvent'});
   this.navCtrl.push('CroplistPage',{croptype:'Kharif'}); 
  }
   goToRabi(){
   dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Krishi Sevayen - Rabi'
     });
     dataLayer.push({'event': 'appEvent'});
   this.navCtrl.push('CroplistPage',{croptype:'Rabi'}); 
  }
  goToHorticulture(){
  dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Krishi Sevayen - Horticulture'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('CroplistPage',{croptype:'Horticulture'});
  }
  gotoWallet(){
    this.navCtrl.push('WalletPage');
  }
  gotoRentalsPage(id){
    //console.log(id);
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }
  SearchPage(){
    //console.log(id);
    dataLayer.push({
       'appEventCategory': 'Top Nav',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Search'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('SearchPage');
  }
  gotoAgroCenter(){
    //console.log(id);
    dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Seva Kendra - View More'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('KrishCenterPage');
  }

   gotoAnounsePage(type,type_value){
   dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Green Card - '+type+'~'+type_value 
     });
   dataLayer.push({'event': 'appEvent'});
    console.log(type+'  ------ '+type_value);
    if (type=='product') {
      this.navCtrl.push('MarketViewPage',{id:type_value});
    }
    if (type=='crop') {
      this.navCtrl.push('CropdetailPage',{crop_id:type_value});
    }
    if (type=='rental') {
      this.navCtrl.push('RentalsPage',{crop_id:type_value});
    }
    if (type=='blogs') {
      this.navCtrl.push('ExpertsDetailPage',{id:type_value}); 
    }
    if (type=='news') {
     this.navCtrl.push('NewsPage',{id:type_value});
    }
    if (type=='weather') {
      this.navCtrl.push(WeatherPage);
    }
  }

  //----------------------Hader Animiation Start------
public isRun1=true;
public isRun2=false;
public isRun3=false;
public isCount=true;
public oneForSize:any;
public startVisbol=true;
public bottom = 0;
public top = 0;

showBar(){
  console.log("Sayooo naara");
  
  // document.querySelector(".tabbar").classList.add('show-tabbar');
  // document.querySelectorAll(".tabbar")[0].style.marginBottom = '0px';
  // document.querySelector(".tabbar").classList.remove('bottmTabHide');
  // document.querySelectorAll(".scroll-content")[1].style.marginBottom = this.bottom;
  // let scroll = document.querySelectorAll('.scroll-content');
  // if (scroll !== null) {
  //     Object.keys(scroll).map((key) => {
  //         scroll[key].style.marginBottom = this.bottom;
  //     });
  // }
  if(this.onBording){
    // document.querySelector(".barCustomAct").classList.add('showTopBar');
    // document.querySelector(".barCustomAct").classList.remove('topBar');
    // document.querySelectorAll(".scroll-content")[1].style.marginTop = '0px';
  }

  
}
  onScroll(ev){
    //console.log(ev);

    if (ev.directionY =="up") {
      if (this.startVisbol==false) {
        this.startVisbol=true;
        document.querySelector(".tabbar").classList.add('show-tabbar');
        document.querySelectorAll(".tabbar")[0].style.marginBottom = '0px';
        document.querySelector(".tabbar").classList.remove('bottmTabHide');
        
      }
    } else if(ev.directionY =="down"){
     
     if(this.startVisbol==true){
          this.startVisbol=false;
          document.querySelector(".tabbar").classList.add('bottmTabHide');
          document.querySelector(".tabbar").classList.remove('show-tabbar');
          let scroll = document.querySelectorAll('.scroll-content');
          if (scroll !== null) {
              Object.keys(scroll).map((key) => {
                  scroll[key].style.marginBottom = '0px';
              });
          }
          
        

          if(this.bottom==0){
            this.bottom = document.querySelectorAll(".scroll-content")[1].style.marginBottom;
            
          }
      }
    }


     var start = 0;
    
    if(this.isCount){
      this.isCount=false
       this.oneForSize=ev.scrollHeight/4;
    }
    if (this.isHeaderAnimition) {
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
            this.onBording = true;
            this.storage.set('haderAnimition',true);
          }
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
   async allTimeShow(): Promise<string> {

        this.rd.removeClass(this.elem.nativeElement, 'opacityGone');
        this.rd.removeClass(this.karsi_id.nativeElement, 'opacityGone');
        this.rd.removeClass(this.tongl_id.nativeElement, 'opacityGone');
      return 'datarebjnj';
   }
//----------------------Hader Animiation End------


gotoMap(latitude,longitude){
    dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Seva Kendra - View Direction'
     });
     dataLayer.push({'event': 'appEvent'});
    console.log(latitude+'---'+longitude+'----');
   if (this.platform.is('android')) {
      //  window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
        window.open('geo://' +latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(no)', '_system');
      };
  }

  updatetoken(token,user_id){
       // console.log('videoid');
    this.user.UpdateToken(token,user_id).map(res => res.json()).subscribe((resp) => {}, (err) => {
    });
  }

  playVideo(videoid:any){
    dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Video - https://www.youtube.com/watch?v='+videoid
     });
     dataLayer.push({'event': 'appEvent'});
    console.log('videoid  : '+videoid);
    this.gotoWebView('https://www.youtube.com/watch?v='+videoid);
    //this.youtube.openVideo(videoid);
  }
  
  
  makeCall(){
    
  }



//----------------  Chart  --------------------


  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
   ]
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
 

//-------------Get Mandi Data For Cache-------------//

getMandiDetails(tehsilId){
    var DistrictId = ( typeof this.filterDistrict != 'undefined' )?this.filterDistrict:0;
    var marketId = ( typeof this.filterMarket != 'undefined' )?this.filterMarket:0;
    var filter_crops = ( typeof this.filter_crops != 'undefined' )?this.filter_crops:0;
    var crop_id = ( typeof this.crop_id != 'undefined' )?this.crop_id:0;
    this.mandi.mandiRates(DistrictId,marketId,filter_crops,crop_id,tehsilId).then((res)=>{
      console.log('mandi data get succesfully');
    });
}

//-------------End Get Mandi Data For Cache-------------//

//--------------- chat end ----------

}

