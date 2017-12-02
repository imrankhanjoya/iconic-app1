import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
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
	RegisterData = {password:'', confirmPassword:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public loadingCtrl: LoadingController,public storage:Storage) {
  	 /*this.storage.get('userPhone').then((val) => {
    this.phoneNumber = val; 
    console.log(this.phoneNumber);
  });*/
    this.phoneNumber = '9783555770'; 
  	//userPhonethis.phoneNumber=navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgatePasswordPage');
  }

  ResetPassword(){
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
			this.navCtrl.push('LoginPage');
		 }, (err) => {
		this.navCtrl.push('LoginPage');
		});
    }

  }

}
