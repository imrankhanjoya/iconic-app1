import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgriInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agri-info',
  templateUrl: 'agri-info.html',
})
export class AgriInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgriInfoPage');
  }
   goToCrops(){
   this.navCtrl.push('CroplistPage',{croptype:'Kharif'}); 
  }
  goToHorticulture(){
    this.navCtrl.push('CroplistPage',{croptype:'Horticulture'});
  }

}
