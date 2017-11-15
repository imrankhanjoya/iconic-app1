import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the MarketFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-market-filter',
  templateUrl: 'market-filter.html',
})
export class MarketFilterPage {
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
		        productbrand: [''],
            sortby: ['']
        });
            
	}
   

  ionViewDidLoad() {
  	this.getCategory();
  	this.getbrand();
    console.log('ionViewDidLoad CatBrandPage');
  }
   getCategory(){
    this.marketpro.productcat().then((res)=>{
      this.catDatas.data = res.data;
      this.catDatas.msg = res.msg;
      this.catDatas.status = res.status;
         console.log(this.catDatas);

    });
  }
   getbrand(){
    this.marketpro.brandcat().then((res)=>{
      this.brandDatas.data = res.data;
      this.brandDatas.msg = res.msg;
      this.brandDatas.status = res.status;
         console.log(this.brandDatas);

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
