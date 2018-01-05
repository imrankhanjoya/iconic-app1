import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { Storage } from '@ionic/storage';
import { FilterModelPage } from '../filter-model/filter-model';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the MandiDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-mandi-details',
  templateUrl: 'mandi-details.html',
})
export class MandiDetailsPage {
  public mandiData:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public loading:any;
  public filterMarket:any;
  public filterDistrict:any;
  public filter_crops:any;
  public tehsilId:any;
  public topMenu:string='';
  
  public toolbarClass:any;

  constructor(public storage:Storage, public events: Events,
public navCtrl: NavController, public navParams: NavParams,public mandi:MandiProvider,
    public loadingCtrl: LoadingController,public modalCtrl:ModalController,public viewCtrl:ViewController,public translateService: TranslateService) {

      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      this.loading.present();

      this.translateService.get('NO_MARKET_MANDI').subscribe((value) => {
        this.NO_MARKET_MANDI = value;
        console.log(this.validnumber+'tesrtinnng');
      });
    
    /*this.filterMarket = navParams.get('filter_market');
    this.filterDistrict = navParams.get('filter_district');
    this.filter_crops = navParams.get('filter_crops');*/
    this.crop_id=navParams.get('crop_id');

    storage.get('userData').then((userlogin) => {
      this.tehsilId=userlogin._user_tehsil;
      this.getMandiDetails(this.tehsilId);
    });
  }

  ionViewDidLoad() {
     
     console.log('ionViewDidLoad MandiDetailsPage');
  }
   getMandiDetails(tehsilId){
    var DistrictId = ( typeof this.filterDistrict != 'undefined' )?this.filterDistrict:0;
    var marketId = ( typeof this.filterMarket != 'undefined' )?this.filterMarket:0;
    var filter_crops = ( typeof this.filter_crops != 'undefined' )?this.filter_crops:0;
    var crop_id = ( typeof this.crop_id != 'undefined' )?this.crop_id:0;
    this.mandi.mandiRates(DistrictId,marketId,filter_crops,crop_id,tehsilId).then((res)=>{
      this.loading.dismiss();
      if (res.data=='') {
        alert(this.NO_MARKET_MANDI);
      }
      if (res.data!='') {
        this.mandiData= res;
      }
    });

  }

  openFilter(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'mandi',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Filter - Change Location'
     });
     dataLayer.push({'event': 'appEvent'});


      this.toolbarClass="toolbarClosed";
    this.topMenu ="toolbarOpen";
    this.topMenu = "toolbarClosed";
    let modal = this.modalCtrl.create('FilterModelPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      if (popoverData.data!="") {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.filterDistrict = popoverData.filter_district;
        this.filterMarket = popoverData.filter_market;
        this.getMandiDetails();
        //this.navCtrl.push(MandiDetailsPage,{filter_district:popoverData.filter_district,filter_market:popoverData.filter_market});
      }
    });
  }
  openCropFilter(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'mandi',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Filter - Change Crop'
     });
     dataLayer.push({'event': 'appEvent'});
  
    this.toolbarClass="toolbarClosed";
    this.topMenu ="toolbarOpen";
    this.topMenu = "toolbarClosed";
    let modal = this.modalCtrl.create('FilterCropsPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.filter_crops = popoverData.filter_crops;
        console.log(this.filter_crops);
        this.getMandiDetails();
        //this.navCtrl.push(MandiDetailsPage,{filter_crops:popoverData.filter_crops});
      }
    });
  }
  
 
  showFilter(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'mandi',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Filter'
     });
     dataLayer.push({'event': 'appEvent'});
  

    if(this.topMenu=='toolbarClosed' || this.topMenu=='' ){
      
      this.toolbarClass="toolbarOpen";
      this.topMenu ="toolbarOpen";
    }else{
      
      this.toolbarClass="toolbarClosed";
      this.topMenu ="toolbarOpen";
      this.topMenu = "toolbarClosed";
    }
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
 
  
//--------------- chat end ----------


}
