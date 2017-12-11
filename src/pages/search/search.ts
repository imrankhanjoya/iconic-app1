import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProvider:SearchProvider) { 

  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    console.log(val);
    this.searchProvider.find(val).then((res)=>{

      console.log(res.data.response.docs);
      this.currentItems = res.data.response.docs;

    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item,id) {
    console.log(item);
    if (item=='products') {
      console.log('im a products');
      var newstr=id.toString().replace('20000',"");
      this.navCtrl.push('MarketViewPage',{id:newstr});
    }
    if (item=='crops') {
      console.log('im a crops');
      var newstr=id.toString().replace('10000',"");
      this.navCtrl.push('CropdetailPage',{crop_id:newstr});
    }
    if (item=='blog') {
      console.log('im a blogs');
      this.navCtrl.push('ExpertsDetailPage',{id:id}); 
    }
    if (item=='questions') {
      var newstr=id.toString().replace('30000',"");
      console.log('im a questions'+newstr);
      this.navCtrl.push('QuitionviewPage',{QuitionID:newstr});
    }
    if (item=='rental') {
      var newstr=id.toString().replace('80000',"");
      console.log('im a questions'+newstr);
      this.navCtrl.push('RentalDetailPage',{rid:newstr});
    }
  }

}
