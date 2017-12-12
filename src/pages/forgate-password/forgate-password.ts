import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';

/**
 * Generated class for the ForgatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgate-password',
  templateUrl: 'forgate-password.html',
})
export class ForgatePasswordPage {
	public phoneNumber:any;
	public passErrorMsg:any;
	public passError : any;
	public passConpError : any;
	public phoneNumberError:any;
  public OK:any;
	RegisterData = {password:'', confirmPassword:''}

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public user: User,public loadingCtrl: LoadingController,public storage:Storage,public events: Events,public translateService: TranslateService) {
  	 this.storage.get('userPhone').then((val) => {
    this.phoneNumber = val; 
    console.log(this.phoneNumber);
  });

         this.translateService.get('CHANGE_YOUR_PASSWORD').subscribe((value) => {
                this.CHANGE_YOUR_PASSWORD = value;
                console.log(this.validnumber+'tesrtinnng');
              });
         this.translateService.get('OK').subscribe((value) => {
                this.OK = value;
                console.log(this.validnumber+'tesrtinnng');
              });
  	//userPhonethis.phoneNumber=navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgatePasswordPage');
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: [this.OK]
    });
    alert.present();
  }

  ResetPassword(){
     dataLayer.push({
         'appEventCategory': 'Forgot Password',
         'appEventAction': 'Submit',
         'appEventLabel': 'New Password'
       });
     dataLayer.push({'event': 'appEvent'});
    var sendForm = true;
    if(this.RegisterData.password.length<6){
        this.passError = true;
        this.passErrorMsg='Password week';
        sendForm = false;
    }else{
      this.passError = false;
    }

    if(this.RegisterData.password!=this.RegisterData.confirmPassword){
        this.passConpError = true;
        this.passErrorMsg='Password Not Match';
        sendForm = false;
    }else{
      this.passConpError = false;
    }
    if(sendForm){
      	//console.log('passsss')
		this.user.ResetPassword(this.phoneNumber,this.RegisterData.password).map(res => res.json()).subscribe((resp) => {
		    console.log(resp.status);
        this.presentAlert(this.CHANGE_YOUR_PASSWORD);
			this.navCtrl.push('LoginPage');
		 }, (err) => {
		this.navCtrl.push('LoginPage');
		});
    }

  }
LoginPage(){
  this.navCtrl.push('LoginPage');
}
}
