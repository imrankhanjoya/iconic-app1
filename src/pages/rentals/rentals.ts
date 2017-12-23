import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {
  public items:any = [];
  private page:number=0;
  public Rental_Listdata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor( public translateService: TranslateService,public navCtrl: NavController, public navParams: NavParams,public events: Events,
  public rentals:RentalsProvider,
  public modalCtrl:ModalController,
  private alertCtrl: AlertController,
  public loadingCtrl:LoadingController ) 
  {
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

       this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON= value;
    });
    this.translateService.get('CALL').subscribe((value) => {
      this.CALL= value;
    });
    this.translateService.get('CALL_TOLLFREE').subscribe((value) => {
      this.CALL_TOLLFREE= value;
    });
  }

  ionViewDidLoad() {
    this.getRental();
    console.log('ionViewDidLoad RentalsPage');
  }
   mackCall(){
    this.presentConfirm();
    console.log('-----------------------------');
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: this.CALL_TOLLFREE,
      buttons: [
        {
          text: this.CANCEL_BUTTON,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clikkkcked');
          }
        },
        {
          text: this.CALL,
          handler: () => {
            window.location.href = "tel:18001200800";
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


  getRental(){
    this.rentals.Rental_list(this.page,10).then((res)=>{
      this.Rental_Listdata = res;
      this.Rental_Listdata.msg = res.msg;
      this.Rental_Listdata.status = res.status;
      console.log(res);
      for(let person of res.data) {
        this.items.push(person);
      }
      this.loading.dismiss();
    });
  }

  RentalsPage(id,title){
    dataLayer.push({
       'appEventCategory': 'Rental',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Rental Contact-'+id+'~'+title
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }
  
  //Loader Question List
  doInfinite(infiniteScroll:any) {
     console.log('doInfinite, start is currently '+this.start);
     this.page+=1;
     console.log('page  '+this.page);
    this.rentals.Rental_list(this.page,10).then((res)=>{
      this.Rental_Listdata = res;
      this.Rental_Listdata.msg = res.msg;
      this.Rental_Listdata.status = res.status;
      for(let person of this.Rental_Listdata.data) {
        this.items.push(person);
      }
      infiniteScroll.complete();
        console.log(this.items);
    });
  } 
  openFilter(product_name,formtype){
     dataLayer.push({
       'appEventCategory': 'Rental',
       'appEventAction': 'filter',
       'appEventLabel': ' Rental Contact-'+product_name
     });
    let modal = this.modalCtrl.create('RentalFilterPage',{product_name:product_name,formtype:formtype, fromFilter:true});
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        //this.navCtrl.push(WeatherPage,{formdata:popoverData.data, fromFilter:true}); 
      }
    });
  }
  

}
