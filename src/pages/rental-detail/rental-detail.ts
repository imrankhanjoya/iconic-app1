import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, ViewController, AlertController } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the RentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-detail',
  templateUrl: 'rental-detail.html',
})
export class RentalDetailPage {

  public ContactSendData:{user_id:number,name:string,email:string,state:string,district:string,tehsil:string,mobile:string,message:string,subject:string,contact_type:string} = {user_id:'',name:'',email:'',state:'',district:'',tehsil:'',mobile:'',message:'',subject:'',contact_type:''};
  public Rental_detaildata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public rentalid:any;

  public aniName:any;
  public textSlide:any;
  public textGotoBack:any;
  public buttonOnCloseCSS:any;

  constructor(public translateService: TranslateService,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl:ModalController,public rentals:RentalsProvider,
    public events: Events,public loadingCtrl: LoadingController, 
    public storage:Storage , public viewCtrl:ViewController) {

    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON= value;
    });
    this.translateService.get('CALL').subscribe((value) => {
      this.CALL= value;
    });
    this.translateService.get('CALL_TOLLFREE').subscribe((value) => {
      this.CALL_TOLLFREE= value;
    });

    this.rentalid=navParams.get('rid');
    this.textSlide='';
    this.buttonOnCloseCSS='';
    this.storage.get('userData').then((val) => { 
      this.ContactSendData = val; 
      console.log(val);
    });
     this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
  }  


  ionViewDidLoad() {
  	 this.getRental_detail();
    console.log('ionViewDidLoad RentalDetailPage');
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '',
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
  


   getRental_detail(){
    this.rentals.Rental_Detail(this.rentalid).map(res => res.json()).subscribe((res) => {
      
        //this.Rental_detaildata = res;
        this.Rental_detaildata.data = res.data;
        this.Rental_detaildata.msg = res.msg;
        this.Rental_detaildata.status = res.status;
        this.loading.dismiss();
        if (res.status!=true) {
            this.navCtrl.push('RentalsPage');
        }
        console.log(this.Rental_detaildata);
       setTimeout(() => {
         this.startAnimitio();
       }, 1000);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  mackCall(){
    this.presentConfirm();
    console.log('-----------------------------');
  }
  startAnimitio(){
      this.buttonOnCloseCSS="buttonOnClose";
      this.aniName="openCallButton";
      this.textSlide="fadeInLeftMarket"
      setTimeout(() => {
        this.textSlide="textGoingBack"
      }, 3000);

      setTimeout(() => {
        this.aniName="closeCallButton"
      }, 4000);
  }

  reuqstFoeCall(){
    this.ContactSendData.contact_type = 'rentals';
    this.ContactSendData.contact_id = this.Rental_detaildata.data.id;
    this.ContactSendData.user_id = this.ContactSendData.ID;
    this.ContactSendData.subject = this.Rental_detaildata.data.title;
    this.ContactSendData.message = this.Rental_detaildata.data.slug;
    let modal = this.modalCtrl.create('PriceRequestFilterPage',{formdata:this.ContactSendData});
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        //this.navCtrl.push(WeatherPage,{formdata:popoverData.data, fromFilter:true}); 
      }
    });
  }

}
