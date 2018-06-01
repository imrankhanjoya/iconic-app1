import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var dataLayer: Array<Object>;

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  public user_id:any;
  public loading:any;

  public ChartLists: { status:boolean, msg: string,data: any } = {status:true,msg: 'test',data:''};
  constructor(private alertCtrl: AlertController,public loadingCtrl: LoadingController,
    public navCtrl: NavController, public viewCtrl: ViewController,
    public navParams: NavParams, public productpro: ProductproProvider,
    public translateService: TranslateService, public event:Events) {    
    this.user_id=navParams.get('user_id'); 
    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON= value;
    });
    this.translateService.get('ORDER_ALERT').subscribe((value) => {
      this.ORDER_ALERT = value;
    }); 
    this.translateService.get('ORDER_ALERT_DESC').subscribe((value) => {
      this.ORDER_ALERT_DESC= value;
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.getChartList();
  }

  gotoproducttype(){
    this.navCtrl.push('ProducattypePage');
  }

  gotoproductlist(){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Cart List',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Click on See More'
     });
    dataLayer.push({'event': 'appEvent'});

    this.navCtrl.push('ProductPage');
  }

  getChartList(){
      this.productpro.ChartListsPro('add').map(res => res.json()).subscribe((res) => {
      this.ChartLists.data = res.data;
      this.ChartLists.msg = res.msg; 
      this.ChartLists.status = res.status;
      this.loading.dismiss();
    });
  }

  RemoveProduct(id){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Cart List',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Remove Add to Cart'
     });
    dataLayer.push({'event': 'appEvent'});

    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    this.productpro.RemoveChart(id).then((res)=>{
    this.getChartList();
    });
  }

  OrderpProduct(){
    dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Cart List',
       'appEventAction': 'Clicked',
       'appEventLabel': 'Click Place Order'
     });
    dataLayer.push({'event': 'appEvent'});

    this.BuyConfirm();
  }

  BuyConfirm(sku) {
    let alert = this.alertCtrl.create({
      title: this.ORDER_ALERT,
      message: this.ORDER_ALERT_DESC,
      buttons: [
        {
          text: this.ORDER_ALERT,
          handler: () => {
            dataLayer : [];
              dataLayer.push({
               'appEventCategory': 'Cart List',
               'appEventAction': 'Clicked',
               'appEventLabel': 'Confirm Place Order'
             });
            dataLayer.push({'event': 'appEvent'});

            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.loading.present();
            this.productpro.CartOrder().map(res => res.json()).subscribe((resp) => {
            this.loading.dismiss();

              const index = this.viewCtrl.index;
              this.navCtrl.push('ProducattypePage').then(() => {
              this.navCtrl.remove(index);});

              // this.navCtrl.push('ProducattypePage');
            }, (err) => {
              console.log('you have error');
              console.log(err);
            });
          }
        },
        {
          text: this.CANCEL_BUTTON,
          role: 'cancel',
          handler: () => {
            dataLayer : [];
              dataLayer.push({
               'appEventCategory': 'Cart List',
               'appEventAction': 'Clicked',
               'appEventLabel': 'Cancel Place Order'
             });
            dataLayer.push({'event': 'appEvent'});

            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
