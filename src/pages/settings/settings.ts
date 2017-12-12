import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController, ViewController,ToastController, AlertController } from 'ionic-angular';
//import { Settings } from '../../providers/providers';
import { User } from '../../providers/providers';
import { CityStateProvider } from '../../providers/city-state/city-state';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public profile_picture : any;
  private changepass : FormGroup;
  private changeprofile : FormGroup;
  private changelocation : FormGroup;
  public pageTitle:any;
  public phoneNumber:any;
  public user_id:any;
  public userData:any;
  public passErrorMsg:any;
  public passError : any;
  public passConpError : any;
  public phoneNumberError:any;
  public villageName:any;
  public lang:any;
  public selectState: any;
  public stateList: any;
  public districtList: any;
  public tehsilList: any;
  public loading:any;
  public passresError:any;
  public changeprofiledata:any;
  public changepassformdata = {oldpass:'',newpass:'',confirmpass:''};
  public changelocationformdata = {user_state_id:'',user_district_id:'',user_tahsil_id:''};
  public loc:{state:string,district:string} = {state:'',district:''};

    constructor(
          public navCtrl: NavController,
          public user: User,
          public navParams: NavParams,
          private formBuilder: FormBuilder,
          public translateService: TranslateService,
          public loadingCtrl: LoadingController,
          public storage:Storage,
          public viewCtrl: ViewController,
           private toastCtrl: ToastController,
          public cityStateProvider:CityStateProvider,
          public alertCtrl: AlertController
          ) {
          this.translateService.get('LOCATION_UPDATA_SUCCESSFULLY').subscribe((value) => {
          this.LOCATION_UPDATA_SUCCESSFULLY = value;
           });
          

            this.profile_picture = 'assets/img/appicon.png';
            this.storage.get('userData').then((val) => {
              this.phoneNumber = val.user_login; 
              this.user_id = val.ID; 
              this.userData = val; 
              this.phoneNumber = val.user_login;
              this.profile_picture = val.profile_picture;
              this.pageTitle = navParams.get('pTitle');
               
              //Change Password
              this.changepass = this.formBuilder.group({
                oldpass: ['', Validators.required],
                newpass: ['', Validators.required],
                confirmpass: ['', Validators.required],
              });
              this.changeprofile = this.formBuilder.group({
                display_name: [this.userData.display_name, Validators.required],
                user_irrigation_type: [this.userData._user_irrigation_type, Validators.required],
                user_irrigation_source: [this.userData._user_irrigation_source, Validators.required],
                user_landholding_size_unit: [this.userData.user_landholding_size_unit, Validators.required],
                user_landholding_size: [this.userData._user_landholding_size, Validators.required]
              });
              //Change Profile Details
              this.changelocation = this.formBuilder.group({
                user_state_id: [this.userData._user_state, Validators.required],
                user_district_id: [this.userData._user_district, Validators.required],
                user_tahsil_id: [this.userData._user_tehsil, Validators.required]
              });
              this.onStateSelect(this.userData._user_state);
              this.onDistrictSelect(this.userData._user_district);

            });

            this.translateService.get('PROFILE_UPDATE').subscribe((value) => {
                this.PROFILE_UPDATE = value;
                console.log(this.validnumber+'tesrtinnng');
              });

            this.translateService.get('OK').subscribe((value) => {
                this.OK= value;
              });

            this.translateService.get('DONE_BUTTON').subscribe((value) => {
                this.DONE_BUTTON = value;
              });

              this.translateService.get('CHANGE_YOUR_PASSWORD').subscribe((value) => {
                this.CHANGE_YOUR_PASSWORD = value;
                console.log(this.validnumber+'tesrtinnng');
              });

          this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          this.loading.present();
    }
     presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        position: 'middle',
        //dismissOnPageChange:true,
        showCloseButton:true
      });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ionViewDidLoad() {
    
  }

    presentAlert(message) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: message,
        buttons: [this.OK]
      });
      alert.present();
    }

  changeprofileform(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.changeprofiledata = this.changeprofile.value;
    this.user.UpdateProfile(this.user_id,this.changeprofiledata).map(res => res.json()).subscribe((resp) => {
            console.log(resp.data);
            if (resp.status==true) {
              this.storage.set('userData',resp.data);
              this.loading.dismiss();
              this.viewCtrl.dismiss();
              this.presentAlert(this.PROFILE_UPDATE);
              //this.navCtrl.push('ItemCreatePage');
            }else {
              this.loading.dismiss();
            }

     }, (err) => {
      this.loading.dismiss();
    });
  }

  changelocaltionform(){

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.changelocationformdata = this.changelocation.value;
    var statearray = this.changelocationformdata.user_state_id;
    var districtarray = this.changelocationformdata.user_district_id;
    var tehsilarray = this.changelocationformdata.user_tahsil_id;
    this.user.UpdateLocation(this.user_id,statearray,districtarray,tehsilarray).map(res => res.json()).subscribe((resp) => {
            this.storage.set('userData',resp.data);if (resp.status==true) {
              this.passresError='Change Location Sucessfully';
              this.presentAlert(this.LOCATION_UPDATA_SUCCESSFULLY);
              this.navCtrl.push('ItemCreatePage');
            }
          this.loading.dismiss();
     }, (err) => {
    this.loading.dismiss();
    });
  }


  changepassform(){
    this.changepassformdata = this.changepass.value;
    var sendForm = true;
    if(this.changepassformdata.newpass.length<6){
        this.passError = true;
        this.passErrorMsg='Password week';
        sendForm = false;
    }else{
      this.passError = false;
    }

    if(this.changepassformdata.newpass!=this.changepassformdata.confirmpass){
        this.passConpError = true;
        this.passErrorMsg='Password Not Match';
        sendForm = false;
    }else{
      this.passConpError = false;
    }
    if(sendForm){
        this.user.ChangePassword(this.phoneNumber,this.changepassformdata.newpass,this.changepassformdata.oldpass).map(res => res.json()).subscribe((resp) => {
            if (resp.status==true) {
              this.passresError='Password Reset Sucessfully';
              this.presentAlert(this.CHANGE_YOUR_PASSWORD);
              this.viewCtrl.dismiss();
            }else{
              this.passresError=resp.msg;
            }

            //this.navCtrl.push('ItemCreatePage');
     }, (err) => {
    });
    }
  }

  ionViewWillEnter() {
    
  }
   
  onStateSelect(stateid) {
    this.cityStateProvider.getDistrict(this.lang,stateid).then((res)=>{
      this.districtList=res.data;
      this.tehsilList=[];
    });
  }
  onDistrictSelect(districtId){
    this.cityStateProvider.getTehsil(this.lang,districtId).then((res)=>{
            this.tehsilList=res.data;
            this.loading.dismiss();
        }); 
  }
  
  getAllState() {

    this.cityStateProvider.getState(this.lang).then((res)=>{
          this.stateList=res.data;

      }); 
    
    // this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
    //   this.stateList=resp.data;
    this.loading.dismiss();
    // });
  }
}
