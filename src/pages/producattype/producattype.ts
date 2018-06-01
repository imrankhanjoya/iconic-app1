import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProducattypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var dataLayer: Array<Object>;

@IonicPage()
@Component({
  selector: 'page-producattype',
  templateUrl: 'producattype.html',
})
export class ProducattypePage {
  public loading:any;

  public OrderLists: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,
   public navParams: NavParams, public productpro: ProductproProvider, public event:Events) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProducattypePage');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    
    this.loading.present();
    setTimeout(() => {
        loading.dismiss();
      }, 6000);
    this.getOrderList();
  }

  gotoproductlist(){
    dataLayer : [];
    dataLayer.push({
     'appEventCategory': 'Order List',
     'appEventAction': 'Clicked',
     'appEventLabel': 'Click to See More'
      });
     dataLayer.push({'event': 'appEvent'});

    this.navCtrl.push('ProductPage');
  }

  getOrderList(){
    this.productpro.OrderList().map(res => res.json()).subscribe((res) => {
      console.log(res);
      this.OrderLists.data = res.data;
      this.OrderLists.msg = res.msg; 
      this.OrderLists.status = res.status;
      this.loading.dismiss();
    });
  }

}
