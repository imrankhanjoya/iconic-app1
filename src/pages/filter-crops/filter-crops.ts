import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';

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
    public cropList:any;
    public shoPage:any;
    public search:any;
    public filterCrops:Array<number>;
    constructor(
    public mandiProvider:MandiProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl:ViewController) {
      this.filterCrops=[];
    	this.shoPage='Kharif';
    	this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      
    }

    ionViewDidLoad() {
      this.getCommudity();

      console.log('ionViewDidLoad FilterCropsPage');
    }
    dismiss(){
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

    addValue(id){


       
        
      console.log(id);
      //this.filterCrops.push({id:id});
      console.log(this.filterCrops);
    }

    gotoFilter(){
      console.log(this.filterCrops);
      this.navCtrl.push('MandiDetailsPage',{filter_crops:this.filterCrops});          
    }

    getCommudity() {
        this.loading.present();
        this.mandiProvider.commudity(this.lang).map(res => res.json()).subscribe((resp) => {
        this.cropList=resp.data;
        console.log(this.cropList[0]);
        this.loading.dismiss();
        }, (err) => {
        console.log('my name is khan');
        this.loading.dismiss();
        });
    }

}
