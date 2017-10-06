import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the VerifyNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-number',
  templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {

 
  RegisterData = {verifyOtpfirst:'',verifyOtpSecond:'',verifyOtpThired:'',verifyOtpFourth:''}

  public phoneNumber:any;
  public otp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public storage:Storage) {
  this.phoneNumber=navParams.get('phoneNumber');


}
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
  }
    gotoResiter(){
    this.navCtrl.push('SignupPage');
    }
    verifyNumber(){

      var sendForm = true;
      if(this.RegisterData.verifyOtpfirst.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.RegisterData.verifyOtpSecond.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.RegisterData.verifyOtpThired.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.RegisterData.verifyOtpFourth.length<1){
          alert('Entere OTP');
          sendForm = false;
      }

      if(sendForm){
          this.otp=this.RegisterData.verifyOtpfirst+this.RegisterData.verifyOtpSecond+this.RegisterData.verifyOtpThired+this.RegisterData.verifyOtpFourth;
          console.log('------'+this.otp);
          this.user.verifyNumber(this.phoneNumber,this.otp).map(res => res.json()).subscribe((resp) => {
            if(resp.status === true){
              this.navCtrl.push('SignupPage');
             console.log(resp.status);
            }else{
              this.navCtrl.push('SignupPage');
              console.log(resp.status);
            }
          }, (err) => {
           console.log('--unsuccess');
           //this.navCtrl.push('VerifyNumberPage');
         });
      }    
    }

}
