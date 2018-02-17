import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ProductFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var dataLayer: Array<Object>;

@IonicPage()
@Component({
  selector: 'page-product-filter',
  templateUrl: 'product-filter.html',
})
export class ProductFilterPage {
  	public filterMarket : FormGroup;
  	public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	  public brandDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	  constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				public viewCtrl:ViewController,
  				public marketpro:MarketproProvider,
      		private formBuilder: FormBuilder) {

  			  	this.filterMarket = this.formBuilder.group({
  		        product_cat: [''],
              sortby: ['']
          });
              
  	}
   

    ionViewDidLoad() {
    dataLayer : [];
    dataLayer.push({
      'screenName': 'MarketFilterPage'
    });
    dataLayer.push({'event': 'appScreenView'});
    	this.getCategory();
      console.log('ionViewDidLoad CatBrandPage');
    }
     getCategory(){
      this.marketpro.productcat().then((res)=>{
        this.catDatas.data = res.data;
        this.catDatas.msg = res.msg;
        this.catDatas.status = res.status;
      });
    }
     getbrand(){
      this.marketpro.brandcat().then((res)=>{
        this.brandDatas.data = res.data;
        this.brandDatas.msg = res.msg;
        this.brandDatas.status = res.status;
      });
    }
   dismiss(){
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }



    filterMarketForm(){
      let data = { 'data': this.filterMarket.value };
      this.viewCtrl.dismiss(data);
    }

}
