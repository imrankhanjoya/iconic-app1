import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WeatherPage } from '../weather/weather';
import { Events } from 'ionic-angular';


/**
 * Generated class for the FilterLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-location',
  templateUrl: 'filter-location.html',
})
export class FilterLocationPage {
	public lang:any;
	public selectState: any;
	public stateList: any;
	public districtList: any;
	public tehsilList: any;
	public loading:any;
	public changelocation : FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    public cityStateProvider:CityStateProvider,public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,public events: Events
    ) {
        //Change Profile Details
        this.changelocation = this.formBuilder.group({
        user_state_id: ['', Validators.required],
        user_district_id: ['', Validators.required],
        user_teshsil_id: ['', Validators.required]
        });
        this.getAllState();

    }

	ionViewDidLoad() {
        console.log('ionViewDidLoad FilterLocationPage');
    }
    ionViewWillUnload(){
      console.log('bye bye view');
    }

    filterLocaltionForm(){
         dataLayer.push({
       'appEventCategory': 'Weather',
       'appEventAction': 'Filter',
       'appEventLabel': ' Reset Filter'
     });
     dataLayer.push({'event': 'appEvent'});
        let data = { 'data': this.changelocation.value.user_teshsil_id };
        this.viewCtrl.dismiss(data);
        console.log(this.changelocation.value.user_teshsil_id);
        //this.navCtrl.push('WeatherPage',{filter_tehsil:this.changelocation.value.user_teshsil_id});          

    }

    onStateSelect() {

        console.log(this.changelocation.value.user_state_id);
        var stateid = this.changelocation.value.user_state_id;
        this.cityStateProvider.getDistrict(this.lang,stateid).then((res)=>{
            this.districtList=res.data;
        });
        // this.cityStateProvider.getDistrict(this.lang,stateid).map(res => res.json()).subscribe((resp) => {
        //   this.districtList=resp.data;
        //   //console.log(this.districtList);
        //   //  this.loading.dismiss();
        // }); 
    }
    onDistrictSelect(districtId){
        var districtId = this.changelocation.value.user_district_id;
        this.cityStateProvider.getTehsil(this.lang,districtId).then((res)=>{
            this.tehsilList=res.data;
        });
        // this.cityStateProvider.getTehsil(this.lang,districtId).map(res => res.json()).subscribe((resp) => {
        //   this.tehsilList=resp.data;
        //   //  this.loading.dismiss();
        // });
    }

    getAllState() {

        this.cityStateProvider.getState(this.lang).then((res)=>{
            this.stateList=res.data;
        }); 
        // this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
        //   this.stateList=resp.data;
        //   //this.loading.dismiss();
        // });
    }

    dismiss(){
         dataLayer.push({
       'appEventCategory': 'Weather',
       'appEventAction': 'Filter',
       'appEventLabel': ' Cancel Filter'
     });
     dataLayer.push({'event': 'appEvent'});
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }

}
