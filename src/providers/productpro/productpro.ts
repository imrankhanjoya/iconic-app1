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

    PromoBanner() {
		var paramCond ={lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/promo-banner', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}

    ParentCat() {
		var paramCond ={lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/parent-cat', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}

    ChildCat(parent_id) {
		var paramCond ={parent_id:parent_id,lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/child-cat', paramCond).then((productlistData)=>{
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

    ChildCatProduct(parent_id) {
		var paramCond ={parent_id:parent_id,lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/child-cat-product', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}

    ParentCatProduct(parent_id,category_id=0) {
		var paramCond ={parent_id:parent_id,category_id:category_id,lang:this.api.userLanguage};
	    return new Promise((resolve)=>{
	      this.api.getCache('v1/products/parent-cat-product', paramCond).then((productlistData)=>{
	        resolve(productlistData);
	      });  
	    });
  	}
  	
    ProductView(id) {
	  	var paramCond ={product_id:id,lang:this.api.userLanguage};
	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/products/view', paramCond).then((ProductViewData)=>{
	        resolve(ProductViewData);
	      });  
	    });
  	}
  	
    ChartCount() {
	  	var paramCond ={user_id:this.api.userData.ID,lang:this.api.userLanguage};
	    let seq = this.api.get('v1/products/chart-count', paramCond).share();
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
  	
    OrderCount() {
	  	var paramCond ={user_id:this.api.userData.ID,lang:this.api.userLanguage};


	    let seq = this.api.get('v1/products/order-count', paramCond).share();
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
  
	OrderList() {
		console.log(this.api.userData);
	  	var paramCond ={user_id:this.api.userData.ID,lang:this.api.userLanguage};
	    let seq = this.api.get('v1/products/order-list', paramCond).share();
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

	AddtoChart(pid,sku,quantity) {
		let body = new FormData();
        body.append('user_id',this.api.userData.ID);
        body.append('product_id',pid);
        body.append('sku',sku);
        body.append('quantity',quantity);
		let seq = this.api.post('/v1/products/add-chart',body).share();
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

	Order(pid,sku,quantity,amount) {
		let body = new FormData();
        body.append('user_id',this.api.userData.ID);
        body.append('product_id',pid);
        body.append('sku',sku);
        body.append('quantity',quantity);
        body.append('amount',amount);
		let seq = this.api.post('/v1/products/single-order',body).share();
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

	CartOrder() {
		let body = new FormData();
        body.append('user_id',this.api.userData.ID);
		let seq = this.api.post('/v1/products/order-chart',body).share();
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

	RemoveChart(id) {
	  	var paramCond ={user_id:this.api.userData.ID,id:id};
	  	return new Promise((resolve)=>{
      	this.api.getCache('v1/products/remove-chart', paramCond).then((ProductViewData)=>{
	        resolve(ProductViewData);
	      });  
	    });
	}

}
