import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CropsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crops',
  templateUrl: 'crops.html',
})
export class CropsPage {
  public lang:any;
  public cropList:any;
   selectItem = [];
   public ionicNamedColor: string = '#101c00';
   public tump:boolean = true;
   buttonColor: string = '#dbdbdb';
   peon:string =  '#101c00';
  constructor(public navCtrl: NavController, public navParams: NavParams,public cityStateProvider:CityStateProvider,public storage:Storage) {
  this. storage.get('userLang').then((val) => {
  this.lang=val;
    this.sendCrops();
});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CropsPage');
  }

  sendCrops() {
    this.cityStateProvider.sendCrop(this.lang).map(res => res.json()).subscribe((resp) => {
    this.cropList=resp.data;
    console.log(this.cropList);

    }, (err) => {
  console.log('my name is khan')
    });
  }


  addValue(e) {
  this.selectItem=e;
  this.storage.set('',this.selectItem);
  console.log('--------'+this.selectItem);

 }
 addEvent(){
 console.log(this.tump);
 if(this.tump){
 this.tump=false;
 this.buttonColor = '#101c00';
 this.peon='#dbdbdb';
  }else{
  this.tump=true;
  this.buttonColor = '#dbdbdb';
  this.peon='#101c00';

  }

}
}
