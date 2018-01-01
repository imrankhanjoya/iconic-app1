
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { KrishProvider } from '../../providers/krish/krish';
import { Events } from 'ionic-angular';


/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
	public krishDataList:any;
  public krishData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,
   public KrishProvider: KrishProvider,
   public modalCtrl:ModalController,
   public events: Events,
   public viewCtrl:ViewController){
    
  }
  openFilter(){
    dataLayer.push({
       'appEventCategory': 'Agro Services',
       'appEventAction': 'Filter',
       'appEventLabel': ' Agro Services -  E-Trading'
     });
     dataLayer.push({'event': 'appEvent'});

    let modal = this.modalCtrl.create('ETirdingPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        //this.navCtrl.push(WeatherPage,{formdata:popoverData.data, fromFilter:true}); 
      }
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }
 
   gotoRental(){
    dataLayer.push({
       'appEventCategory': 'Agro Services',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Agro Services - Rental'
     });
     dataLayer.push({'event': 'appEvent'});

    this.navCtrl.push('RentalsPage');
  }
 gotoMarketPage(){
  dataLayer.push({
        'appEventCategory': 'Agro Services',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Agro Services - Market'
     });
     dataLayer.push({'event': 'appEvent'});

    this.navCtrl.push('MarketPage');
    
  }
  gotoMarket(){
    this.navCtrl.push('MarketPage');
  }
   gotoservices_detailPage(){
    this.navCtrl.push('ServicDetalisPage');
  }
   gotocroplist(){
    this.navCtrl.push('CroplistPage');
  }
   RentalsPage(id){
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }


}
// import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';

// /**
//  * Generated class for the ServicesPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-services',
//   templateUrl: 'services.html',
// })
// export class ServicesPage {
//   public krishDataList:any;
//   public krishData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
//   constructor(public navCtrl: NavController, public navParams: NavParams,
//     public loadingCtrl: LoadingController,
//    public modalCtrl:ModalController,
//     public viewCtrl:ViewController) {
//     //  this.loading = this.loadingCtrl.create({
//     //     content: 'Please wait...'
//     // });

//     //  this.loading.present();
     
//   }

//   ionViewDidLoad() {
//   //  this.getkrish();
//     console.log('ionViewDidLoad ServicesPage');
//   }
//    // openFilter(){
//    //  let modal = this.modalCtrl.create('ETirdingPage');
//    //  modal.present();
//    //  }


 
//   gotoRental(){
//     this.navCtrl.push('RentalsPage');
//   }
//  gotoMarketPage(){
//     this.navCtrl.push('MarketPage');
//   }
//   gotoMarket(){
//     this.navCtrl.push('MarketPage');
//   }
//    gotoservices_detailPage(){
//     this.navCtrl.push('ServicDetalisPage');
//   }
//    gotocroplist(){
//     this.navCtrl.push('ETirdingPage');
//   }
//    RentalsPage(id){
//     this.navCtrl.push('RentalDetailPage',{rid:id});
//   }
