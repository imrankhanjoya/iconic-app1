import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ModalController, ViewController, AlertController } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { CallProvider } from '../../providers/call/call';
import { ContactusProvider } from '../../providers/contactus/contactus';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the MarketViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-view',
  templateUrl: 'market-view.html',
})
export class MarketViewPage {
  public id:any;
  public loading :any;
  public aniName:any;
  public textSlide:any;
  public textGotoBack:any;
  public buttonOnCloseCSS:any;
  public ContactSendData:{user_id:number,name:string,email:string,state:string,district:string,tehsil:string,mobile:string,message:string,subject:string,contact_type:string} = {user_id:'',name:'',email:'',state:'',district:'',tehsil:'',mobile:'',message:'',subject:'',contact_type:''};
  public ProductViewData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(
      private alertCtrl: AlertController,
      public translateService: TranslateService,
      public navCtrl: NavController,
      public navParams: NavParams,
        public market:MarketproProvider,
        public callProvider:CallProvider,
        public loadingCtrl: LoadingController,
        public contactus:ContactusProvider,
        public modalCtrl:ModalController,
        public storage:Storage
        ) {
        this.textSlide='';
        this.buttonOnCloseCSS='';

          this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
            this.CANCEL_BUTTON= value;
          });
          this.translateService.get('CALL').subscribe((value) => {
            this.CALL= value;
          });
          this.translateService.get('CALL_TOLLFREE').subscribe((value) => {
            this.CALL_TOLLFREE= value;
          });
        
			  this.id=navParams.get('id');
			   console.log('Market View ID '+this.id);
        this.storage.get('userData').then((val) => { 
          this.ContactSendData = val; 
          console.log(val);
        });
    }
  ionViewDidLoad() {
   dataLayer : [];
    dataLayer.push({
      'screenName': 'MarketViewPage'
    });
    dataLayer.push({'event': 'appScreenView'});
    this.getProductView();
    console.log("page loaded MarketViewPage");
    
  }

  getProductView(){
    let loading = this.loadingCtrl.create({
       content: 'Please wait...'
     });
     loading.present();
     setTimeout(() => {
          loading.dismiss();
        }, 2000);
     this.market.ProductView(this.id).then((res)=>{
        this.ProductViewData.data = res.data;
        this.ProductViewData.msg = res.msg; 
        this.ProductViewData.status = res.status;
        console.log('market data start');
        console.log(this.ProductViewData.data.detail);
        loading.dismiss();
        if (res.status!=true) {
            this.navCtrl.push('MarketPage');
        }
        setTimeout(() => {
          this.startAnimitio();
        }, 1000);
      });
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
              console.log('Cancel clicked');
            }
          },
          {
            text: this.CALL,
            handler: () => {
              window.location.href = "tel:18001200800";
              this.contactus.Send(this.ContactSendData);
              this.callProvider.makeCall();
            }
          }
        ]
      });
      alert.present();
      }

  mackCall(){
    this.presentConfirm();
  }

  openFilter(){
    this.ContactSendData.contact_type = 'product';
    this.ContactSendData.contact_id = this.ProductViewData.data.id;
    this.ContactSendData.user_id = this.ContactSendData.ID;
    this.ContactSendData.subject = this.ProductViewData.data.name;
    this.ContactSendData.message = this.ProductViewData.data.slug;
    this.ContactSendData.sku = this.ProductViewData.data.sku;
    let modal = this.modalCtrl.create('PriceRequestFilterPage',{formdata:this.ContactSendData});
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        //this.navCtrl.push(WeatherPage,{formdata:popoverData.data, fromFilter:true}); 
      }
    });
  }
  /*mackCall(){
    console.log('-----------------------------');
  }*/
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

}
