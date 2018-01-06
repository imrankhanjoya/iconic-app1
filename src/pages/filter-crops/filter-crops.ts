import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';
import { MandiDetailsPage } from '../mandi-details/mandi-details';
import { Events } from 'ionic-angular';


//import { ModalController, ViewController,LoadingController } from 'ionic-angular';


/**
 * Generated class for the FilterCropsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-crops',
  templateUrl: 'filter-crops.html',
})
export class FilterCropsPage {
    public loading:any;
    public lang:any;
    public cropList:any=[];
    public shoPage:any;
    public search:any;
    public filterCrops:Array<number>;
    constructor(
    public mandiProvider:MandiProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public event: Events,
    public viewCtrl:ViewController) {
      this.cropList    = [];
      this.filterCrops = [];
    	this.shoPage = 'Kharif';
    	this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      
    }

    ionViewDidLoad() {
     dataLayer : [];
    dataLayer.push({
      'screenName': 'FilterCropsPage'
    });
    dataLayer.push({'event': 'appScreenView'});
      this.getCommudity();
      console.log('ionViewDidLoad FilterCropsPage');
    }
    dismiss(){
      dataLayer : [];
      dataLayer.push({
     'appEventCategory': 'mandi',
       'appEventAction': 'Filter',
       'appEventLabel': ' Cancel Filter'
     });
     dataLayer.push({'event': 'appEvent'});

        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }


    getCommudity() {
        this.loading.present();

        this.mandiProvider.commudity(this.lang).then((res)=>{
          this.cropList = res.data;
          this.loading.dismiss();
        });
        // this.mandiProvider.commudity(this.lang).map(res => res.json()).subscribe((resp) => {
        // this.cropList = resp.data;
        // console.log(this.cropList);
        
        // this.loading.dismiss();
        // }, (err) => {
        // console.log('my name is khan');
        // this.loading.dismiss();
        // });
    }
    addValue(cropIndex,commodityIndex) {
        console.log(this.cropList);
        if (this.cropList[cropIndex].commodity[commodityIndex].crop_type=='true') {
          this.cropList[cropIndex].commodity[commodityIndex].crop_type='-';
        }else {
          this.cropList[cropIndex].commodity[commodityIndex].crop_type='true';
        } 
     }
    gotoFilter(){
       dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'mandi',
       'appEventAction': 'Submit',
       'appEventLabel': ' Filter - crop'
     });
      this.filterCrops=[];
    console.log(this.cropList);
    for (var i = 0; i < this.cropList.length; i++) {
      for (var j = 0; j < this.cropList[i].commodity.length; j++) {
        if (this.cropList[i].commodity[j].crop_type=='true') {
          this.filterCrops.push(this.cropList[i].commodity[j].id);
        }
     }
      if (i==this.cropList.length-1) {
        console.log(this.filterCrops.toString());
        let data = { 'filter_crops': this.filterCrops.toString() };
        this.viewCtrl.dismiss(data);
        // this.navCtrl.push(MandiDetailsPage,{filter_crops:this.filterCrops.toString()});
      }
    }
  }

}
