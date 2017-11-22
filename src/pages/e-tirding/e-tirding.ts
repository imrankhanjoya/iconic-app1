import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, ViewController,LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { EtradingProvider } from '../../providers/etrading/etrading';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { TranslateService } from '@ngx-translate/core';



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
          public toastCtrl: ToastController,
  				public viewCtrl:ViewController, 
  				private formBuilder: FormBuilder,
  	 			public EtradingProvider:EtradingProvider,
  	 			public loc:CityStateProvider,
  	 			public storage:Storage,
          public translateService: TranslateService
  	 		) {

      this.translateService.get('E_TRADING_FORM').subscribe((value) => {
        this.E_TRADING_FORM = value;
        console.log(this.validnumber+'tesrtinnng');
      });


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
		            etrading_quantity_unit: ['', Validators.required],
		            user_state_id: [this.userData._user_state, Validators.required],
		            user_district_id: [this.userData._user_district, Validators.required],
		            user_tahsil_id: [this.userData._user_tehsil, Validators.required]
	          	});

            this.getCrops_etriding();
          	this.getAllState();
          	this.onStateSelect(this.userData._user_state);
          	this.onDistrictSelect(this.userData._user_district);
          	//this.getvarieties_etriding() ;

        });
    
  }
  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
    this.EtradingProvider.trading_send(this.changemarket.value);
      this.presentToast(this.E_TRADING_FORM);
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data); 
    }

    dismiss(){
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }
    
	getItems(ksseys) {
	    console.log(ksseys);
	    this.EtradingProvider.crop_find(ksseys).then((res)=>{

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
    this.EtradingProvider.sendCrop_etriding(this.lang).then((res)=>{
        this.cropList=res.data;
      //console.log('vvvvvvv'+this.cropList);
    }); 
    } 
     onCropSelect(crop_id) {
	      console.log('im a crops'+crop_id);
    this.EtradingProvider.send_varieties_etriding(crop_id).then((res)=>{
        this.varieties_List=res.data;
     console.log(this.varieties_List);
    }); 
    }       
   
}
