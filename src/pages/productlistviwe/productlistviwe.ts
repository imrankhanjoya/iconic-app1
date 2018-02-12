import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public ProductViewDatas: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) {    this.id=navParams.get('id');
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
  sub (i) {
    i.quantity--;
  }

  add (i) {
    i.quantity++;
  }

  getProductView(){
     this.productpro.ProductView(this.id).then((res)=>{
        this.ProductViewDatas.data = res.data;
        this.ProductViewDatas.msg = res.msg; 
        this.ProductViewDatas.status = res.status;
        console.log('market data start');
        console.log(this.ProductViewDatas);
        this.loading.dismiss();
        if (res.status!=true) {
            this.navCtrl.push('MarketPage');
        }
      });
  }

}
