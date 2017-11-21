import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, ViewController } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl:ModalController,public rentals:RentalsProvider,
    public loadingCtrl: LoadingController, public storage:Storage ,
    public viewCtrl:ViewController) {

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
  openFilter(){
    let modal = this.modalCtrl.create('RentalFilterPage');
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
      
        this.Rental_detaildata = res;
        this.Rental_detaildata.data = res.data;
        this.Rental_detaildata.msg = res.msg;
        this.Rental_detaildata.status = res.status;
        this.loading.dismiss();
        console.log(this.Rental_detaildata);
        // setTimeout(() => {
        //   this.startAnimitio();
        // }, 1000);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  mackCall(){
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
