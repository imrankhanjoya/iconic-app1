import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

/*
  Generated class for the MarketproProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarketproProvider {

	constructor(public http: Http, public api: Api) {
	   	console.log('Hello MarketproProvider Provider');
	}
    productlist(dataLimit) {

		var paramCond ={limit:dataLimit,lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/product/all', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });


	  	// var paramCond ={page:0,limit:limit,lang:'en_US'};
	   //  let seq = this.api.get('v1/product/all', paramCond).share();

	   //  seq
	   //    .map(res => res.json())
	   //    .subscribe(res => {
	   //      if (res.status == 'success') {
	   //        console.log(res);
	   //      } else {
	   //      }
	   //    }, err => {
	   //      console.error('ERROR', err);
	   //    });

	   //  	return seq;
  	}
  	

    productlistview(cat_id,productbrand,sortby) {


  		var paramCond ={lang:this.api.userLanguage,category_id:cat_id,sortby:sortby};
  		return new Promise((resolve)=>{
      	this.api.getCache('v1/product/all-view', paramCond).then((productlistviewData)=>{
	        resolve(productlistviewData);
	      });  
	    });
	    // let seq = this.api.get('v1/product/all-view', paramCond).share();

	    // seq
	    //   .map(res => res.json())
	    //   .subscribe(res => {
	    //     if (res.status) {
	    //       console.log('im here');
	    //       console.log(cat_id);
	    //     } else {
	    //     }
	    //   }, err => {
	    //     console.error('ERROR', err);
	    //   });

	    // 	return seq;
  	}

    ProductView(id) {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
	  	var paramCond ={product_id:id,lang:this.api.userLanguage};
	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/product/view', paramCond).then((ProductViewData)=>{
	        resolve(ProductViewData);
	      });  
	    });

	    // let seq = this.api.get('v1/product/view', paramCond).share();
	    // seq
	    //   .map(res => res.json())
	    //   .subscribe(res => {
	    //     if (res.status) {
	    //       console.log('im here');
	    //       console.log(id);
	    //     } else {
	    //     }
	    //   }, err => {
	    //     console.error('ERROR', err);
	    //   });

	    // 	return seq;
  	}

    productcat() {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
	  	var paramCond ={lang:this.api.userLanguage};

	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/product/category', paramCond).then((productcatData)=>{
	        resolve(productcatData);
	      });  
	    });
  	}
  	brandcat() {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
	  	var paramCond ={lang:this.api.userLanguage};

	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/product/brand', paramCond).then((productcatData)=>{
	        resolve(productcatData);
	      });  
	    });
}
SpecialList() {
  		//http://205.147.100.82/agriboloapiv2/api/web/index.php?r=v1/mandi/all&page=2&state_id=12
	  	var paramCond ={lang:this.api.userLanguage};

	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/wp/post-cat', paramCond).then(()=>{
	        resolve();
	      });  
	    });
}

}
