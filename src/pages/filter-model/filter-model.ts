import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';
import { MandiDetailsPage } from '../mandi-details/mandi-details';

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


    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    public cityStateProvider:CityStateProvider,public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,public events: Events
    ) {
        //Change Profile Details
        this.changemarket = this.formBuilder.group({
        user_state_id: ['', Validators.required],
        user_district_id: ['', Validators.required],
        user_market_id: ['']
        });
        this.getMandiAllState();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilterModelPage');
    }
    

    onMandiStateSelect() {

        console.log(this.changemarket.value.user_state_id);
        var stateid = this.changemarket.value.user_state_id;
        this.cityStateProvider.getMandiDistrict(this.lang,stateid).then((res)=>{
            this.districtList=res.data;
        }); 
        // this.cityStateProvider.getDistrict(this.lang,stateid).map(res => res.json()).subscribe((resp) => {
        //   this.districtList=resp.data;
        //   //console.log(this.districtList);
        //   //  this.loading.dismiss();
        // }); 
    }
    onMandiDistrictSelect(districtId){
        var districtId = this.changemarket.value.user_district_id;
        this.cityStateProvider.getMarket(this.lang,districtId).then((res)=>{
            this.marketList=res.data;
        }); 
        // this.cityStateProvider.getMarket(this.lang,districtId).map(res => res.json()).subscribe((resp) => {
        //   this.marketList=resp.data;
        //   //  this.loading.dismiss();
        // });

    }

    getMandiAllState() {
        this.cityStateProvider.getMandiState(this.lang).then((res)=>{
            this.stateList=res.data;
        }); 
        // this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
        //   this.stateList=resp.data;
        //   //this.loading.dismiss();
        // });
    }

    filterLocaltionForm(){
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
