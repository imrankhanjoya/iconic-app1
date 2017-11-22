import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams,ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { RentalsProvider } from '../../providers/rentals/rentals';


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
    public RentalMarket : FormGroup;
    public selectState: any;
    public stateList: any;
    public districtList: any;
    public tehsilList: any;
    public loading:any;
    public pageTitle:any;
    Crop: string = "General";
    

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public storage:Storage,public rentals:RentalsProvider,
  	private formBuilder: FormBuilder,public viewCtrl:ViewController,public loc:CityStateProvider) {

        this.storage.get('userData').then((val) => {
          this.userData = val;
          this.pageTitle = 'onstorageload';
          //Change Profile Details
          this.RentalMarket = this.formBuilder.group({
            user_id: [this.userData.ID],
            product: [''],
            type: [''],
            expected_price: [''],
            farmer_name: [this.userData.display_name, Validators.required],
            date_from: ['', Validators.required],
            to_date: [''],
            time_from: [''],
            to_time: [''],
            duration: ['daily', Validators.required],
            user_state_id: [this.userData._user_state, Validators.required],
            user_district_id: [this.userData._user_district, Validators.required],
            user_tahsil_id: [this.userData._user_tehsil, Validators.required],
            address: ['', Validators.required]
          });

        this.getAllState();
        this.onStateSelect(this.userData._user_state);
        this.onDistrictSelect(this.userData._user_district);
        //this.getvarieties_etriding() ;
      });
              
  }
   presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RentalFilterPage');
  }
   onStateSelect(stateid) {
     var districtId = this.RentalMarket.value.user_state_id;
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

 dismiss(){
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data);
  }

  filterRentalForm(){
      console.log('rental contact data is here');
      console.log(this.RentalMarket.value);
      this.rentals.Contact(this.RentalMarket.value);
      let data = { 'data': '' };
      this.viewCtrl.dismiss(data); 
      this.presentToast('your order generate successfully');
  }

}
 	