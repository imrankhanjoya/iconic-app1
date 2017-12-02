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
    public items:any;
    public loading:any;
    public product_name:any;
    public pageTitle:any;
    Crop: string = "General";
    Rental_Listdata: any = [];
    date_from: String = new Date().toISOString();

  // public Rental_Listdata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};

    

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public storage:Storage,public rentals:RentalsProvider,
private formBuilder: FormBuilder,public viewCtrl:ViewController,public loc:CityStateProvider) {
        this.product_name=navParams.get('product_name');
        console.log('pname'+this.product_name);
        this.storage.get('userData').then((val) => {
          this.NowTimeT = new Date();
          this.userData = val;
          this.pageTitle = 'onstorageload';
          this.RentalMarket = this.formBuilder.group({
            user_id: [this.userData.ID],
            product: [this.product_name, Validators.required],
            type: [''],
            expected_price: [''],
            farmer_name: [this.userData.display_name, Validators.required],
            date_from: [this.NowTimeT, Validators.required],
            to_date: [''],
            time_from: [''],
            to_time: [''],
            duration: ['daily', Validators.required],
            user_state_id: [this.userData._user_state, Validators.required],
            user_district_id: [this.userData._user_district, Validators.required],
            user_tahsil_id: [this.userData._user_tehsil, Validators.required],
            address: ['', Validators.required]
          });
        this.getRentalList();
        this.getAllState();
        this.onStateSelect(this.userData._user_state);
        this.onDistrictSelect(this.userData._user_district);
        //this.getvarieties_etriding() ;
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
    this.NowTimeT = new Date();
    console.log('ionViewDidLoad RentalFilterPage');
  }   

  getRentalList(){
    this.rentals.Rental_list().map(res => res.json()).subscribe((res) => {
    console.log(res.data);
    this.rentallists = res.data;
      }, (err) => {
        console.log(err);
      });
  }

   getItems(ev) {
    console.log('dfhhghjjhk');
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.Rental_Listdata = [];
      return;
    }
    console.log(val);
    this.searchProvider.find(val).then((res)=>{

      console.log(res.data.response.docs);
      this.currentItems = res.data.response.docs;

    });
  }
   openItem(data) {
    console.log(data);
    if (data=='products') {
      console.log('im a ');
      var newstr=data.toStrproductsing().replace('20000',"");
     // this.navCtrl.push('MarketViewPage',{id:newstr});
    }
  }
     getRental(){
    this.rentals.Rental_list().map(res => res.json()).subscribe((res) => {
      
        this.Rental_Listdata = res;
        this.Rental_Listdata.msg = res.msg;
        this.Rental_Listdata.status = res.status;
         this.loading.dismiss();

        console.log(this.Rental_Listdata);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

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
        });
   
  }
  getAllState() {
    this.loc.getState(this.lang).then((res)=>{
      this.stateList=res.data;
    }); 
  }

  dismiss(){
    let data = { 'data': '' };
    this.viewCtrl.dismiss(data);
  }

  filterRentalForm(){
    this.rentals.Contact(this.RentalMarket.value);
    let data = { 'data': '' };
    this.viewCtrl.dismiss(data); 
    this.presentToast('your order generate successfully');
  }

}
 	