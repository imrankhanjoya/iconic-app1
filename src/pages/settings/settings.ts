import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
          public translate: TranslateService,
          public loadingCtrl: LoadingController,
          public storage:Storage,
          public cityStateProvider:CityStateProvider
          ) {

          console.log("I am here");
          this.storage.get('userData').then((val) => {

            this.phoneNumber = val.user_login; 
            this.user_id = val.ID; 
            this.userData = val; 
            console.log(val);
          
            this.pageTitle = navParams.get('pTitle');
              console.log(this.pageTitle);
             
            //Change Password
            this.changepass = this.formBuilder.group({
              oldpass: ['', Validators.required],
              newpass: ['', Validators.required],
              confirmpass: ['', Validators.required],
            });
            //Change Profile Details
            console.log('this is stroge data ffor profile');
            console.log(this.phoneNumber);
            this.changeprofile = this.formBuilder.group({
              display_name: [this.userData.display_name, Validators.required],
              user_language: [this.userData._user_language, Validators.required],
              user_irrigation_type: [this.userData._user_irrigation_type, Validators.required],
              user_irrigation_source: [this.userData._user_irrigation_source, Validators.required],
              user_landholding_size_unit: [this.userData.user_landholding_size_unit, Validators.required],
              user_landholding_size: [this.userData._user_landholding_size, Validators.required]
            });
            //Change Profile Details
            this.changelocation = this.formBuilder.group({
              user_state_id: [this.userData._user_district, Validators.required],
              user_district_id: [this.userData._user_state, Validators.required],
              user_tahsil_id: [this.userData._user_tehsil, Validators.required]
            });

            this.storage.get('userData').then((val) => {
              this.phoneNumber = val.user_login; 
              this.user_id = val.ID; 
              console.log(val);
            });
          });

          this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          this.loading.present();
          this.getAllState();
    }
  ionViewDidLoad() {
    
  }

  changeprofileform(){
    this.changeprofiledata = this.changeprofile.value;
    this.user.UpdateProfile(this.user_id,this.changeprofiledata).map(res => res.json()).subscribe((resp) => {
            console.log(resp.status);
            this.storage.set('userData',resp.data);
            if (resp.status==true) {
              this.passresError='Profile Update Sucessfully';
            }
     }, (err) => {
      //this.navCtrl.push('LoginPage');
    });
  }

  changelocaltionform(){
    this.changelocationformdata = this.changelocation.value;
    var statearray = this.changelocationformdata.user_state_id.split('~');
    var districtarray = this.changelocationformdata.user_district_id.split('~');
    var tehsilarray = this.changelocationformdata.user_tahsil_id.split('~');
    this.user.UpdateLocation(this.user_id,statearray[0],districtarray[0],tehsilarray[0]).map(res => res.json()).subscribe((resp) => {
            console.log(resp.status);
            this.storage.set('userData',resp.data);if (resp.status==true) {
              this.passresError='Change Location Sucessfully';
            }

     }, (err) => {
      //this.navCtrl.push('LoginPage');
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
            console.log(resp.status);
            console.log(resp.msg);
            if (resp.status==true) {
              this.passresError='Password Reset Sucessfully';
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
    var array = stateid.split('~');
    this.cityStateProvider.getDistrict(this.lang,array[0]).map(res => res.json()).subscribe((resp) => {
        this.districtList=resp.data;
        //console.log(this.districtList);
        //  this.loading.dismiss();
      }); 
  }
  onDistrictSelect(districtId){
    var array = districtId.split('~');
    this.cityStateProvider.getTehsil(this.lang,array[0]).map(res => res.json()).subscribe((resp) => {
      this.tehsilList=resp.data;
      //this.loading.dismiss();
    }); 
  }
  
    getAllState() {
      this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
        this.stateList=resp.data;
        this.loading.dismiss();
      });
    }
}
