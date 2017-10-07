import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OtpNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-number',
  templateUrl: 'otp-number.html',
})
export class OtpNumberPage {
 
  public phoneNumberError:any;
  public name='allanoor';
  public userInfo:any;

  RegisterData = {phoneNumber:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public storage:Storage,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpNumberPage');
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
        this.user.sendOtp(this.RegisterData.phoneNumber,this.name).map(res => res.json()).subscribe((resp) => {
        if(resp.status === true){
          console.log(resp.status);
          this.navCtrl.push('VerifyNumberPage',{phoneNumber:this.RegisterData.phoneNumber});
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
