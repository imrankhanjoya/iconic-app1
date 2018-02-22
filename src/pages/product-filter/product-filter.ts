import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { ProductproProvider } from '../../providers/productpro/productpro';
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
  	public ParentCats: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	  public ChildCats: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  	  constructor(
          public navCtrl: NavController,
  				public navParams: NavParams,
  				public viewCtrl:ViewController,
          public productpro: ProductproProvider,
      		private formBuilder: FormBuilder) {
  			  this.filterMarket = this.formBuilder.group({
            parent_cat: [''],
            child_cat: ['']
          });
              
  	}
   
    ionViewDidLoad() {
      dataLayer : [];
      dataLayer.push({
        'screenName': 'MarketFilterPage'
      });
      dataLayer.push({'event': 'appScreenView'});
    	this.getParentCat();
      console.log('ionViewDidLoad CatBrandPage');
    }
  
    getParentCat(){     
      this.productpro.ParentCat().then((res)=>{
        this.ParentCats.data = res.data;
        this.ParentCats.msg = res.msg;
        this.ParentCats.status = res.status;
      });
    }
  
    getChildCats(parent_id){     
      this.productpro.ChildCat(parent_id).then((res)=>{
        this.ChildCats.data = res.data;
        this.ChildCats.msg = res.msg;
        this.ChildCats.status = res.status;
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
