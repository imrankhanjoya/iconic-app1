import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { KrishProvider } from '../../providers/krish/krish';

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
    public viewCtrl:ViewController){
    
  }
   openFilter(){
    let modal = this.modalCtrl.create('ETirdingPage');
    modal.present();
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }
 
   gotoRental(){
    this.navCtrl.push('RentalsPage');
  }
 gotoMarketPage(){
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
