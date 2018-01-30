import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductlistviwePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlistviwe',
  templateUrl: 'productlistviwe.html',
})
export class ProductlistviwePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistviwePage');
  }
  sub (i) {
  i.quantity--;
}

add (i) {
  i.quantity++;
}

}
