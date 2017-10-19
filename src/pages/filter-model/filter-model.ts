import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    ) {
        //Change Profile Details
        this.changemarket = this.formBuilder.group({
        user_state_id: ['', Validators.required],
        user_district_id: ['', Validators.required],
        user_market_id: ['', Validators.required]
        });
        this.getAllState();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FilterModelPage');
    }
    ionViewWillUnload(){
      console.log('bye bye view');
    }

    onStateSelect() {

        console.log(this.changemarket.value.user_state_id);
        var stateid = this.changemarket.value.user_state_id;
        this.cityStateProvider.getDistrict(this.lang,stateid).map(res => res.json()).subscribe((resp) => {
          this.districtList=resp.data;
          //console.log(this.districtList);
          //  this.loading.dismiss();
        }); 
    }
    onDistrictSelect(districtId){
        var districtId = this.changemarket.value.user_district_id;
        this.cityStateProvider.getMarket(this.lang,districtId).map(res => res.json()).subscribe((resp) => {
          this.marketList=resp.data;
          //  this.loading.dismiss();
        });

    }

    getAllState() {
        this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
          this.stateList=resp.data;
          //this.loading.dismiss();
        });
    }

    filterLocaltionForm(){

        console.log(this.changemarket.value.user_market_id);
        this.navCtrl.push('MandiDetailsPage',{filter_market:this.changemarket.value.user_market_id});          
    }

    dismiss(){
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

}
