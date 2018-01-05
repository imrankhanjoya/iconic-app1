import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController, AlertController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';
import { MandiDetailsPage } from '../mandi-details/mandi-details';
import { TranslateService } from '@ngx-translate/core';

/**
* Generated class for the FilterModelPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-filter-model',
    templateUrl: 'filter-model.html',
})
export class FilterModelPage {

    public lang:any;
    public selectState: any;
    public stateList: any;
    public districtList: any;
    public marketList: any;
    public loading:any;
    public changemarket : FormGroup;


    constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    public cityStateProvider:CityStateProvider,public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,public events: Events,public translateService: TranslateService

    ) {
        //Change Profile Details
        this.changemarket = this.formBuilder.group({
        user_state_id: ['', Validators.required],
        user_district_id: ['', Validators.required],
        user_market_id: ['']
        });
        this.getMandiAllState();
        this.translateService.get('NO_MARKET_DISTRICT').subscribe((value) => {
            this.NO_MARKET_DISTRICT = value;
        });
        this.translateService.get('OK').subscribe((value) => {
            this.OK = value;
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilterModelPage');
    }
    
    presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: message,
        buttons: [this.OK]
      });
      alert.present();
    }

    onMandiStateSelect() {

        let loadingDistrict = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loadingDistrict.present();
        console.log(this.changemarket.value.user_state_id);
        var stateid = this.changemarket.value.user_state_id;
        this.cityStateProvider.getMandiDistrict(this.lang,stateid).then((res)=>{
            this.districtList=res.data;
        }); 
        loadingDistrict.dismiss();
    }
    onMandiDistrictSelect(districtId){
        let loadingSate = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loadingSate.present();
        var districtId = this.changemarket.value.user_district_id;
        this.cityStateProvider.getMarket(this.lang,districtId).then((res)=>{
            this.marketList=res.data;
        }); 
        if (this.marketList=='') {
            this.presentAlert(this.NO_MARKET_DISTRICT);
        }
        loadingSate.dismiss();

    }

    getMandiAllState() {

        this.cityStateProvider.getMandiState(this.lang).then((res)=>{
            this.stateList=res.data;
        }); 
    }

    filterLocaltionForm(){
         dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'mandi',
       'appEventAction': 'Submit',
       'appEventLabel': ' Filter - Location'
     });
     dataLayer.push({'event': 'appEvent'});
        let data = { 'filter_district': this.changemarket.value.user_district_id,'filter_market': this.changemarket.value.user_market_id };
        this.viewCtrl.dismiss(data);
        //console.log(this.changemarket.value.user_market_id);
        //this.navCtrl.push(MandiDetailsPage,{filter_market:this.changemarket.value.user_market_id});          
    }
    dismiss(){
             dataLayer.push({
           'appEventCategory': 'mandi',
           'appEventAction': 'Filter',
           'appEventLabel': ' Cancel Filter'
         });
         dataLayer.push({'event': 'appEvent'});

        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }
   

}
