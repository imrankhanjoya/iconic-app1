import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { ContactusProvider } from '../../providers/contactus/contactus';
import { CityStateProvider } from '../../providers/city-state/city-state';

/**
 * Generated class for the PriceRequestFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price-request-filter',
  templateUrl: 'price-request-filter.html',
})
export class PriceRequestFilterPage {
	public lang:any;
	public loading:any;
	public priceRequest : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,public cityStateProvider:CityStateProvider,public contactus: ContactusProvider, private toastCtrl: ToastController
    ) {
      this.formdata=navParams.get('formdata');
    	this.priceRequest = this.formBuilder.group({
            phoneNumber: [this.formdata.user_login, Validators.required],
	          display_name: [this.formdata.display_name, Validators.required],
            description: [this.formdata.message, Validators.required]
        });
  }
   presentToast(message) {
              let toast = this.toastCtrl.create({
                message: message,
                showCloseButton:true,
                position: 'middle'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceRequestFilterPage');
  }

  priceRequestForm(){
      console.log(this.priceRequest.value);
      this.formdata.user_login = this.priceRequest.value.phoneNumber;
      this.formdata.display_name = this.priceRequest.value.display_name;
      this.formdata.description = this.priceRequest.description;
      console.log(this.formdata);
      this.contactus.ProductSend(this.formdata);
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data); 
      this.presentToast('your order generate successfully');
     

  }

  dismiss(){
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data);
  }


  //End Location Section

}
