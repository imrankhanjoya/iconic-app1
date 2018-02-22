import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ProductlistviwePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlistviwe',
  templateUrl: 'productlistviwe.html',
})
export class ProductlistviwePage {
  public id:any;
  public loading:any;
  public quantity:any;
  public aniName:any;
  public textSlide:any;
  public ProductViewDatas: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public ChildCatProducts: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(private alertCtrl: AlertController,public translateService: TranslateService,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) { 
      this.textSlide='';
      this.buttonOnCloseCSS='';

      this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
        this.CANCEL_BUTTON= value;
      });
      this.translateService.get('CALL_TOLLFREE').subscribe((value) => {
        this.CALL_TOLLFREE= value;
      }); 
      this.translateService.get('CALL').subscribe((value) => {
        this.CALL= value;
      }); 
      this.translateService.get('ORDER_ALERT').subscribe((value) => {
        this.ORDER_ALERT = value;
      }); 
      this.translateService.get('ORDER_ALERT_DESC').subscribe((value) => {
        this.ORDER_ALERT_DESC= value;
      }); 
      this.quantity = 1;  

    this.id=navParams.get('id');
    console.log('this is product id'+this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistviwePage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getProductView();
  }

  min (i) { this.quantity--; }

  add (i) { this.quantity++; }
  
  gotoProductViewPage(id){
    this.navCtrl.push('ProductlistviwePage',{id:id});
  }

  AddtoChart(sku){
    this.productpro.AddtoChart(this.id,sku,this.quantity).map(res => res.json()).subscribe((res) => {
      this.navCtrl.push('ProductlistPage');
    });
  }

  Order(sku){
    this.productpro.Order(this.id,sku,this.quantity,this.ProductViewDatas.data.unit_price_mrp).map(res => res.json()).subscribe((res) => {
      this.navCtrl.push('ProducattypePage');
    });
  }

  getProductView(){
     this.productpro.ProductView(this.id).then((res)=>{
        this.ProductViewDatas.data = res.data;
        this.ProductViewDatas.msg = res.msg; 
        this.ProductViewDatas.status = res.status;
        console.log('Order Data Start Here');
        console.log(this.ProductViewDatas);
        this.loading.dismiss();
        this.GetCatProduct(res.data.parent_id,res.data.category_id);
        if (res.status!=true) {
            this.navCtrl.push('ProductPage');
        }
        setTimeout(() => {
          this.startAnimitio();
        }, 1000);
      });
  }

  GetCatProduct(cat_id,child_cat){
      console.log('im here');
      this.productpro.ParentCatProduct(cat_id,child_cat).then((res)=>{
        this.ChildCatProducts.data = res.data;
        this.ChildCatProducts.msg = res.msg;
        this.ChildCatProducts.status = res.status;
        console.log(res);
      });
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

  OrderBuyConfirm(sku){
      this.BuyConfirm(sku);
  }

  BuyConfirm(sku) {
    let alert = this.alertCtrl.create({
      title: this.ORDER_ALERT,
      message: this.ORDER_ALERT_DESC,
      buttons: [
        {
          text: this.CANCEL_BUTTON,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.ORDER_ALERT,
          handler: () => {
            this.Order(sku)
          }
        }
      ]
    });
    alert.present();
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

}
