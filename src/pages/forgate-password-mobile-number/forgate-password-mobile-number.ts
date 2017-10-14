import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
/**
 * Generated class for the ForgatePasswordMobileNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgate-password-mobile-number',
  templateUrl: 'forgate-password-mobile-number.html',
})
export class ForgatePasswordMobileNumberPage {
  RegisterData = {phoneNumber:''}
  public name='agribolo';
  public phoneNumberError:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,  public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgatePasswordMobileNumberPage');
  }
  sendOtp(){


    var sendForm = true;
    if(this.RegisterData.phoneNumber.length<10){
      this.phoneNumberError = true;
        sendForm = false;
    }else{
      this.phoneNumberError = false;
    }
    if(sendForm){
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
        this.user.sendPasswordOtp(this.RegisterData.phoneNumber,this.name).map(res => res.json()).subscribe((resp) => {
        if(resp.status === true){
          console.log(resp.status);
          this.navCtrl.push('ForgateVerifyNumberPage',{phoneNumber:this.RegisterData.phoneNumber});
          loading.dismiss();
        }else{
          alert(resp.msg)
          console.log('number unValid');
          loading.dismiss();
        }
      }, (err) => {
        loading.dismiss();
        console.log('--unsuccess')
      });
    }
  }
}
