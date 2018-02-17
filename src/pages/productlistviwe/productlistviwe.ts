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
  public aniName:any;
  public textSlide:any;
  public ProductViewDatas: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public translateService: TranslateService,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams, public productpro: ProductproProvider) { 
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

  AddtoChart(sku){
    this.productpro.AddtoChart(this.id,sku).map(res => res.json()).subscribe((res) => {
      this.navCtrl.push('ProductlistPage');
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
        if (res.status!=true) {
            this.navCtrl.push('MarketPage');
        }
        setTimeout(() => {
          this.startAnimitio();
        }, 1000);
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

}
