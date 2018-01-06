import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController,AlertController  } from 'ionic-angular';
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
 declare var dataLayer: Array;

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
    private formBuilder: FormBuilder,public cityStateProvider:CityStateProvider,public contactus: ContactusProvider,
    public translateService: TranslateService,public alertCtrl: AlertController
    ) {
      this.formdata=navParams.get('formdata');
    	this.priceRequest = this.formBuilder.group({
            phoneNumber: [this.formdata.user_login, Validators.required],
	          display_name: [this.formdata.display_name, Validators.required],
            description: ['', Validators.required]
        });
       this.translateService.get('PRICE_REQUEST_SUCCESS').subscribe((value) => {
          this.PRICE_REQUEST_SUCCESS = value;
        });

        this.translateService.get('OK').subscribe((value) => {
          this.OK= value;
        });
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: [this.OK]
    });
    alert.present();
  }

  ionViewDidLoad() {
   dataLayer : [];
    dataLayer.push({
      'screenName': 'PriceRequestFilterPage'
    });
    dataLayer.push({'event': 'appScreenView'});
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
      this.presentAlert(this.PRICE_REQUEST_SUCCESS);
     

  }

  dismiss(){
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data);
  }


  //End Location Section

}
