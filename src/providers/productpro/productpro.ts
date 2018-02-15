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
  	
    ChartList() {
	  	var paramCond ={user_id:this.api.userData.ID,lang:this.api.userLanguage};
	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/products/chart-list', paramCond).then((ProductViewData)=>{
	        resolve(ProductViewData);
	      });  
	    });
  	}
  
	ChartListsPro(type) {
	  	var paramCond ={type:type,user_id:this.api.userData.ID,lang:this.api.userLanguage};
	    let seq = this.api.get('v1/products/chart-list', paramCond).share();

	    seq
	      .map(res => res.json())
	      .subscribe(res => {
	        if (res.status == 'success') {
	          console.log(res);
	        } else {
	        }
	      }, err => {
	        console.error('ERROR', err);
	      });
	     console.log('get function for chatlist');

	    return seq;
	}

	AddtoChart(pid,sku) {
		let body = new FormData();
        body.append('user_id',this.api.userData.ID);
        body.append('pid',pid);
        body.append('sku',pid);
		let seq = this.api.post('/v1/products/add-chart&user_id=1&id=1',body).share();
	    seq
	      .map(res => res.json())
	      .subscribe(res => {
	        if (res.status == 'success') {
	          console.log(res);
	        } else {
	        }
	      }, err => {
	        console.error('ERROR', err);
	      });

	    return seq;
	}

}
