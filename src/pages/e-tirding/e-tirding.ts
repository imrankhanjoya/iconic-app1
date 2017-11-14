import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ETirdingProvider } from '../../providers/e-tirding/e-tirding';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { SearchProvider } from '../../providers/search/search';



/**
 * Generated class for the ETirdingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-e-tirding',
  templateUrl: 'e-tirding.html',
})
export class ETirdingPage {
    public changemarket : FormGroup;
    public districtList: any;
    public districtList: any;
 	public tehsilList: any;
 	public stateList: any;
 	public userdetail:any;
 	public ustateid:any;
 	public udid:any;
 	public utid:any;
 	public varieties_List:any;
 	public cropList:any;
 	public pageTitle:any;
  	currentItems: any = [];

  constructor(public navCtrl: NavController, 
  				public navParams: NavParams,
  				public viewCtrl:ViewController, 
  				private formBuilder: FormBuilder,
  	 			public etanding:ETirdingProvider,
  	 			public SearchProvider:SearchProvider,
  	 			public loc:CityStateProvider,
  	 			public storage:Storage
  	 		) {


  		this.storage.get('userData').then((val) => {
              this.userData = val;
              this.pageTitle = 'onstorageload';
	          	//Change Profile Details
	          	this.changemarket = this.formBuilder.group({
		            user_id: [this.userData.ID],
		            etrading_crop: ['', Validators.required],
		            etrading_varieties: ['', Validators.required],
		            etrading_prices: ['', Validators.required],
		            etrading_address: ['', Validators.required],
		            etrading_quantity: ['', Validators.required],
		            user_state_id: [this.userData._user_state, Validators.required],
		            user_district_id: [this.userData._user_district, Validators.required],
		            user_tahsil_id: [this.userData._user_tehsil, Validators.required]
	          	});

          	this.getAllState();
          	this.onStateSelect(this.userData._user_state);
          	this.onDistrictSelect(this.userData._user_district);
          	this.getCrops_etriding();
          	//this.getvarieties_etriding() ;

        });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ETirdingPage');
  }
   onStateSelect(stateid) {
   	 var districtId = this.changemarket.value.user_state_id;
    this.loc.getDistrict(this.lang,stateid).then((res)=>{
      this.districtList=res.data;
      
    });
   
  }
  onDistrictSelect(districtId){
    this.loc.getTehsil(this.lang,districtId).then((res)=>{
            this.tehsilList=res.data;
           // this.loading.dismiss();
        });
   
  }
   getAllState() {
    this.loc.getState(this.lang).then((res)=>{
          this.stateList=res.data;

      }); 
  
  //  this.loading.dismiss();
  }
  
  filterLocaltionForm(){
  	console.log(this.changemarket.value);
    this.etanding.crop_e_tirding(this.changemarket.value).then((res)=>{
    this.dismiss();
    //console.log(this.changemarket.value.user_market_id);
   //this.navCtrl.push(MandiDetailsPage,{filter_market:this.changemarket.value.user_market_id});          
    }); 
   }

  dismiss(){
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }
    
	getItems(ksseys) {
	    console.log(ksseys);
	    this.etanding.crop_find(ksseys).then((res)=>{

	      console.log(res.data);
	      this.currentItems = res.data;

	    });
	}

	openItem(item,id) {
	    console.log(item);
	  
	    if (item=='crops') {
	      console.log('im a crops');
	      var newstr=id.toString().replace('10000',"");
	    }
	}
	 getCrops_etriding() {
    this.etanding.sendCrop_etriding(this.lang).then((res)=>{
        this.cropList=res.data;
      //console.log('vvvvvvv'+this.cropList);
    }); 
    } 
     onCropSelect(crop_id) {
	      console.log('im a crops'+crop_id);
    this.etanding.send_varieties_etriding(crop_id).then((res)=>{
        this.varieties_List=res.data;
     console.log(this.varieties_List);
    }); 
    }       
   
}
