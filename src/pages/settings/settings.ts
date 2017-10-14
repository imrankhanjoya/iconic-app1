import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
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
  public passErrorMsg:any;
  public passError : any;
  public passConpError : any;
  public phoneNumberError:any;
  public villageName:any;
  public lang:any;
  public selectState: any;
  public stateList: any;
  public districtList: any;
  public loading:any;
  public changepassformdata = {oldpass:'',newpass:'',confirmpass:''};
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

    this.storage.get('userData').then((val) => {
      this.phoneNumber = val.user_login; 
      console.log(val);
    });
    this.pageTitle = navParams.get('pTitle');
      console.log(this.pageTitle);
    //Change Password
    this.changepass = this.formBuilder.group({
      oldpass: ['', Validators.required],
      newpass: ['', Validators.required],
      confirmpass: ['', Validators.required],
    });
    //Change Profile Details
    this.changeprofile = this.formBuilder.group({
      display_name: ['', Validators.required],
      user_language: ['', Validators.required]
    });
    //Change Profile Details
    this.changelocation = this.formBuilder.group({
      display_name: ['', Validators.required],
      user_language: ['', Validators.required]
    });


    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.getAllState();


  }

  ngOnChanges() {
    console.log('Ng All Changes');
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
     }, (err) => {
      //this.navCtrl.push('LoginPage');
    });
    }
  }

  getAllState() {
    this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
      this.stateList=resp.data;
      this.loading.dismiss();
    });
  }

  onStateSelect(stateid) {
    var array = stateid.split('~');
    this.storage.set('userStateId',array[0]);
    this.storage.set('userState',array[1]);
    this.cityStateProvider.getDistrict(this.lang,array[0]).map(res => res.json()).subscribe((resp) => {
        this.districtList=resp.data;
        //  this.loading.dismiss();
      }); 
  }
  onDistrictSelect(districtId){
    var array = districtId.split('~');
    this.storage.set('userDictrictId',array[0]);
    this.storage.set('userDictrict',array[1]);
  }
}
