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
  ni_toggle: boolean;

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

  updateLocalStorage(){
  }
}
