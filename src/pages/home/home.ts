import { Component, ViewChild ,ElementRef, Renderer2 } from '@angular/core';
import { Content } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { NewsProvider } from '../../providers/news/news';
import { WeatherProvider } from '../../providers/weather/weather';
import { KrishProvider } from '../../providers/krish/krish';
import { ExpertsProvider } from '../../providers/experts/experts';
import { Geolocation } from '@ionic-native/geolocation';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AnnouncementproProvider } from '../../providers/announcementpro/announcementpro';
import { CallProvider } from '../../providers/call/call';
import { MandiDetailsPage } from '../mandi-details/mandi-details';
import { TabProvider } from '../../providers/tab/tab';
import { WeatherPage } from '../weather/weather';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainPage } from '../pages';
import { AppVersion } from '@ionic-native/app-version';
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
  public weatherfiveday: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:[]};
  public ChartCount: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public ChartCount: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public OrderCount:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public ParentCats:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public geoLoc:{lat:any,lng:any} = {lat:26.957740,lng:75.745459};
  public topMenu:string='';
  public userCropIdList:string='';
  public rotateClass:any;
  public toolbarClass:any;
  public maindiIconClass:any;
  public userDisplayName:any;
  public userKm:any;
  public userId:any;
  public tehsil:any;
  public btn:any;
  public NowTime:any;
  public token:any;
  public toggleMenuText:any;
  public onBording:boolean=false;                                                                               
  public isHeaderAnimition=true;
  public alert:any;
  public exitAlertMess:any;                                                                                                                                                           
  constructor(private appVersion: AppVersion,public user: User,public translateService:TranslateService,public platform:Platform,private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,
    public mandi:MandiProvider, public news:NewsProvider, public Announce:AnnouncementproProvider, public krish:KrishProvider, public weather:WeatherProvider, 
    public experts:ExpertsProvider,public productpro:ProductproProvider,public market:MarketproProvider, private iab: InAppBrowser,public api:Api,
    public storage:Storage,private rd: Renderer2,public callProvider:CallProvider,
    public tabProvider:TabProvider,public event:Events,public loadingCtrl:LoadingController,public alertCtrl: AlertController,
    public viewCtrl:ViewController,public splashScreen:SplashScreen,public modalCtrl:ModalController) {

    //this.CheckappVersion('111');

    //--------homepage----------
    this.translateService.get('EXIT_ALERT').subscribe((value) => {
      this.exitAlertMess = value;
    });
    this.translateService.get('VERSION_CHANGED').subscribe((value) => {
      this.VERSION_CHANGED = value;
    });
    this.translateService.get('UPDATE_NOW').subscribe((value) => {
      this.UPDATE_NOW = value;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON = value;
    });
    this.toggleMenuText="more";
    this.rotateClass="rotateimage1";
      //this.topMenu = 'toolbarClosed';
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
     setTimeout(() => {
          this.loading.dismiss();
        }, 4000);
      storage.get('notificationData').then((notiData) => {
        //console.log("-=-=-=-notiData=-=-=-=-=-= : "+notiData);
        if (notiData) {
            this.loading.dismiss();
            storage.set('notificationData', '');
            this.gotoAnounsePage(notiData.type,notiData.type_value);
          }
        });
      storage.get('userLang').then((lanData) => {
        //console.log("-=-=-=-notiData=-=-=-=-=-= : "+notiData);
        if(lanData =='en'){
            this.appVersion.getAppName("----en",(version)=>{
                
            });
          }
        if(lanData =='hi'){
            this.appVersion.getAppName("----hi",(version)=>{    
            });
          }
        });

      let view = this.navCtrl.getActive();
               //console.log("  current Page  :  " + view);
      platform.ready().then(() => {

              platform.registerBackButtonAction(() => {
               //   let view = this.navCtrl.getActive();
               // //console.log("  current Page  :  " + view);
               //   if (view.name=="HomePage") {
               //      if(this.alert){ 
               //        this.alert.dismiss();
               //        this.alert =null;     
               //      }else{
               //        this.exitConfrom(this.exitAlertMess);
               //      }
               //    }else {
               //      // const index = this.viewCtrl.index;
               //      // this.navCtrl.remove(index);
               //      if(view.name=="ItemCreatePage"){
               //          this.navCtrl.setRoot(MainPage);
               //      }else{
               //          this.navCtrl.pop();
               //      }
               //    }
              });
            });
      //this.updatetoken(1234);

  }

   exitConfrom(message) {
      this.alert = this.alertCtrl.create({
        title: '',
        message: message,
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

   exitConfromVersion(message,btn) {
      this.alert = this.alertCtrl.create({
        title: '',
        message: message,
        buttons: [
          {
            text: btn,
            role: 'cancel',
            handler: () => {
              this.alert =null;
            }
          },
          {
            text: this.UPDATE_NOW,
            handler: () => {
              window.open('https://play.google.com/store/apps/details?id=com.agribolo&hl=en', '_system', 'location=yes');
            }
          }
        ]
      });
      this.alert.present();
    }

  ionViewDidLoad() {
      dataLayer : [];
    dataLayer.push({
      'screenName': 'homepage'
    });
    dataLayer.push({'event': 'appScreenView'});
  
    this.splashScreen.hide();
    this.storage.get('haderAnimition').then((data) => {
        if (data) {
          this.isHeaderAnimition=false;
          this.onBording = true;
          this.allTimeShow();
        }
      });
   
    this.geolocation.getCurrentPosition().then((resp) => {
       this.geoLoc.lat = resp.coords.latitude;
       this.geoLoc.lng = resp.coords.longitude;
       this.storage.set('userLoction.latitude',resp.coords.latitude);
       this.storage.set('userLoction.longitude',resp.coords.longitude);
       this.getkrish(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
    //console.log('Error getting location', error);
    });



      this.storage.get('userData').then((val) => { 
        this.user_id = val.ID;
        this.userdata = val;  
        //this.crops=val.crops;
        //alert(val.crops.length);
        for (var i = 0; i < val.crops.length; i++) {
        //console.log(val.crops[i].id)
          this.userCropIdList += val.crops[i].id;
        }
      });

    this.storage.get('userData').then((userdata) => {
      if (userdata) {
      //console.log(userdata);
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
        this.weatherfivedays(this.tehsil);
        this.getParentCat();
        this.getChartCount();
        this.getOrderCount();
        this.CheckappVersion(this.appVersion.getVersionCode());
        //this.getMandiDetails(this.tehsil);
        //this.weather.weatherdetail(this.tehsil);
        this.storage.get('updated_token').then((token) => {
          if (token) {
          //console.log('token found sucessfully---'+token+'-------');
            this.updatetoken(token,this.userId);
          }
        //console.log('token found sucessfully- NOt--'+token+'-------');
        });
      } 
    
    });


    


    //For tab Scroll
    this.startVisbol=true;
  }

  toggleMenu(){
    if(this.topMenu=='toolbarClosed' || this.topMenu=='' ){
    dataLayer : [];
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
       dataLayer : [];
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
  //console.log('this is current tehsil'+tehsil);
    this.weather.weatheHourly(tehsil).then((res)=>{
        this.wheaterHome.data = res.data;
        this.wheaterHome.msg = res.msg;
        this.wheaterHome.status = res.status;
        this.loading.dismiss();
    });
  }


  /*********Weather 5 days*********/
  weatherfivedays(location:any){

      this.weather.weatherfivedays(location).then((res)=>{
      //console.log(res);
        this.weatherfiveday.data = res.data;
        this.weatherfiveday.msg = res.msg;
        this.weatherfiveday.status = res.status;
      });
  }



  getMandiData(){
    this.mandi.usermandi(this.userId,this.tehsil,this.userCropIdList).then((res)=>{
        this.mandidata= res.data[0] ;
        this.mandidata.graph_months=this.mandidata.graph_months;
        this.mandidata.graph_price=this.mandidata.graph_price;
        this.mandidata1 = '';this.mandidata2='';
        if (res.data[2]) {
          this.mandidata1= res.data[1];
        }
      //console.log('this.mandidata1');
      //console.log(this.mandidata1);
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
  
  getParentCat(){     
    this.productpro.ParentCat().then((res)=>{
      this.ParentCats.data = res.data;
      this.ParentCats.msg = res.msg;
      this.ParentCats.status = res.status;
    });
  }

  getmarkets(){
  //console.log('getmarkets');
    this.productpro.PopularProduct(5).then((res)=>{
        this.productHome.data = res.data;
        this.productHome.msg = res.msg;
        this.productHome.status = res.status;
        //console.log(this.productHome.data);
        this.loading.dismiss();
    });
  //console.log('getmarkets');
  }

  getkrish(lat:any,long:any){
    this.krish.NearestKendra(lat,long).then((res)=>{
        this.kendraData.data = res.data;
        this.kendraData.msg = res.msg;
        this.kendraData.status = res.status;
      //console.log('geoLoc');
      //console.log(this.kendraData);
        //is.userKm = this.krish.getDistanceFromLatLonInKm(this.geoLoc.lat,this.geoLoc.lng,lat,long);
    });
  }

  getannouncement(){
    this.Announce.announcementList(1).map(res => res.json()).subscribe((res) => {
      //console.log(this.announceList);
        this.announceList.data = res.data;
        this.announceList.msg = res.msg;
        this.announceList.status = res.status;
    });
  }



  getUserTopCard(){
    this.Announce.apiusertopcard().map(res => res.json()).subscribe((res) => {
        this.usertopcard.data = res.data;
        this.usertopcard.msg = res.msg;
        this.usertopcard.status = res.status;
    });
  } 

  gotoRental(){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Agro Services',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Agro Services - Rental'
     });
     dataLayer.push({'event': 'appEvent'});

    this.navCtrl.push('RentalsPage');
  }


  goToChoupal(){
    this.navCtrl.push('ChoupalPage');
  }


  gotoOderList(){
    this.navCtrl.push('ProducattypePage');
  }

  gotoCartList(){
      this.navCtrl.push('ProductlistPage');
  }

  gotoAskquestion(numbr){
    if(numbr == 'menu'){
     dataLayer : [];
      dataLayer.push({
           'appEventCategory': 'Top Menu',
           'appEventAction': 'Clicked',
           'appEventLabel': 'Ask Expert'
         });
         dataLayer.push({'event': 'appEvent'});
    }
    if(numbr == 'card'){
      dataLayer : [];
      dataLayer.push({
           'appEventCategory': 'Home',
           'appEventAction': 'Clicked',
           'appEventLabel': 'Krishi Sevayen - Ask the Expert'
         });
         dataLayer.push({'event': 'appEvent'});
    }
    this.navCtrl.push('QuestionlistPage');
  }

  gotoAgriinfo(){
    dataLayer : [];
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


  openFilter(){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Agro Services',
       'appEventAction': 'Filter',
       'appEventLabel': ' Agro Services -  E-Trading'
     });
     dataLayer.push({'event': 'appEvent'});

    let modal = this.modalCtrl.create('ETirdingPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
    //console.log(popoverData)
      if (popoverData.data!="") {
        //this.navCtrl.push(WeatherPage,{formdata:popoverData.data, fromFilter:true}); 
      }
    });
  }

  openNews(id,URL,type,title){
     //this.gotoWebView(URL,title);
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'News - '+title
     });
     dataLayer.push({'event': 'appEvent'});
    if (type=='web') {
    //console.log("baran"+URL);
      this.iab.create(URL, '_blank', 'location=yes');
      //var ref = this.iab.create(URL, '_blank', 'location=yes');
    }else{
    //console.log("kkkbaran"+URL);
      this.navCtrl.push('NewsdetailPage',{id:id});
    }
  }

  gotoWeatherPage(numbr){
    if(numbr == 'menu'){
      dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Top Menu',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Weather'
       });
      dataLayer.push({'event': 'appEvent'});
      this.navCtrl.push(WeatherPage);
    }
    if(numbr == 'card'){
          dataLayer : [];
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
        dataLayer : [];
    dataLayer.push({
      'appEventCategory': 'Home',
      'appEventAction': 'Clicked',
      'appEventLabel': 'Krishi Sevayen'
    });
    dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('ServicesPage');
  }

  goToExpertDetial(id,title){
   dataLayer : [];
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
      dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Top Menu',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Mandi'
      });
    dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push(MandiDetailsPage);
    }

    if(numbr == 'card'){
      dataLayer : [];
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
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'News - View More'
      });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('NewsPage');
  }

  gotoMarketPage(){
   dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Market - View More'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('ProductPage');
  }

  gotoMarketViewPage(product_id,name,sku){
  dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Market - sku: '+sku+'~~~name: '+name
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('ProductlistviwePage',{id:product_id});
  }

  gotoVedio(numbr){
    if(numbr == 'menu'){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Top Menu',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Video'
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('VideoPage');
    }

    if(numbr == 'card'){
     dataLayer : [];
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
  gotoNotificationPage(){
    //alert('test');
    this.navCtrl.push('AnnouncementPage');
  }
  goToBlogPage(){
    dataLayer : [];
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

    goToCrops(croptype){
     this.navCtrl.push('CroplistPage',{croptype:croptype}); 
    }
     goToKharif(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Krishi Sevayen - Kharif'
       });
       dataLayer.push({'event': 'appEvent'});
     this.navCtrl.push('CroplistPage',{croptype:'Kharif'}); 
    }
     goToRabi(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Krishi Sevayen - Rabi'
       });
       dataLayer.push({'event': 'appEvent'});
     this.navCtrl.push('CroplistPage',{croptype:'Rabi'}); 
    }
    goToHorticulture(){
    dataLayer : [];
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
      dataLayer : [];
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
      dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Seva Kendra - View More'
       });
       dataLayer.push({'event': 'appEvent'});
      this.navCtrl.push('KrishCenterPage');
    }

     gotoAnounsePage(type,type_value){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Green Card - '+type+'~'+type_value 
       });
     dataLayer.push({'event': 'appEvent'});
    //console.log(type+'  ------ '+type_value);
      if (type=='product') {
        this.navCtrl.push('ProductlistviwePage',{id:type_value});
      }
      if (type=='crop') {
        this.navCtrl.push('CropdetailPage',{crop_id:type_value});
      }
      if (type=='rental') {
        this.navCtrl.push('RentalDetailPage',{rid:type_value});
      }
      if (type=='blogs') {
        this.navCtrl.push('ExpertsDetailPage',{id:type_value}); 
      }
      if (type=='news') {
       this.navCtrl.push('NewsPage',{id:type_value});
      }
      if (type=='q') {
       this.navCtrl.push('QuitionviewPage',{QuitionID:type_value})
      }
      if (type=='weather') {
        this.navCtrl.push(WeatherPage);
      }
      if (type=='mandi') {
        this.navCtrl.push(MandiPage);
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
        this.startVisbol=false;
         document.querySelector(".tabbar").classList.add('show-tabbar');
        document.querySelectorAll(".tabbar")[0].style.marginBottom = '0px';
        document.querySelector(".tabbar").classList.remove('bottmTabHide');
        // setTimeout(() => {
          
        //   if(this.topMenu=='toolbarOpen'){

        //   }else {
        //     this.rotateClass="rotateimage1";
        //     this.toolbarClass="toolbarClosed";
        //     this.topMenu ="toolbarOpen";
        //     this.topMenu = "toolbarClosed";
        //     this.toggleMenuText="more";
        //   }
        // }, 2000);

        
 
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


     //var start = 0;
    
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


gotoMap(latitude,longitude,name){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Seva Kendra - View Direction'
     });
     dataLayer.push({'event': 'appEvent'});
  //console.log(latitude+'---'+longitude+'----');
   if (this.platform.is('android')) {
      //  window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
          window.open('geo://' +latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(' + name + ')', '_system');
      };
  }

  updatetoken(token,user_id){
       // console.log('videoid');
    this.user.UpdateToken(token,user_id).map(res => res.json()).subscribe((resp) => {}, (err) => {
    });
  }

  CheckappVersion(appVersion){
    console.log(appVersion);
    this.user.CheckappVersion(appVersion).map(res => res.json()).subscribe((res) => {
      console.log('Check Version');
      console.log(res);
      if (res.status==false) {
        this.btn='';
        if (res.data.forcestop=='no') {
          this.btn = this.CANCEL_BUTTON;
        }
        this.exitConfromVersion(this.VERSION_CHANGED,this.btn);
      }
    });
  }

  playVideo(videoid:any){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Home',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Video - https://www.youtube.com/watch?v='+videoid
     });
     dataLayer.push({'event': 'appEvent'});
  //console.log('videoid  : '+videoid);
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
    //console.log('mandi data get succesfully');
    });
}


  getChartCount(){
      this.productpro.ChartCount().map(res => res.json()).subscribe((res) => {
      this.ChartCount.data = res.data;
      this.ChartCount.msg = res.msg; 
      this.ChartCount.status = res.status;
      this.loading.dismiss();
    });
  }

  getOrderCount(){
      this.productpro.OrderCount().map(res => res.json()).subscribe((res) => {
      this.OrderCount.data = res.data;
      this.OrderCount.msg = res.msg; 
      this.OrderCount.status = res.status;
      this.loading.dismiss();
    });
  }
//-------------End Get Mandi Data For Cache-------------//

//--------------- chat end ----------

}

