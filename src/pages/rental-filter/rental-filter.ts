import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


/**
 * Generated class for the RentalFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-filter',
  templateUrl: 'rental-filter.html',
})
export class RentalFilterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private formBuilder: FormBuilder,public viewCtrl:ViewController) {
  		this.RentalMarket = this.formBuilder.group({
  		        Date_from: [''],
  		        to_Date: [''],
  		        AVERAGE: [''],
  		        DURATION: [''],
  		        Address: [''],

          });
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalFilterPage');
  }

   dismiss(){
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }

    filterRentalForm(){
      let data = { 'data': this.RentalMarket.value };
      this.viewCtrl.dismiss(data);
    }

}
 	