import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the ProductproProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductproProvider {

  	constructor(public http: Http, public api: Api) {
    	console.log('Hello ProductproProvider Provider');
	}

    ParentCat() {
		var paramCond ={lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/parent-cat', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}

    PopularProduct() {
		var paramCond ={lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/popular-product', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}

    GroupCatProduct() {
		var paramCond ={lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/group-cat-product', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}
  	
    ProductView(id) {
	  	var paramCond ={product_id:id,lang:this.api.userLanguage};
	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/product/view', paramCond).then((ProductViewData)=>{
	        resolve(ProductViewData);
	      });  
	    });
  	}

}
