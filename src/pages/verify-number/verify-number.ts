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

  public verifyOtpfirst:any;
  public verifyOtpSecond:any;
  public verifyOtpThired:any;
  public verifyOtpFourth:any;


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
      if(this.verifyOtpfirst.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.verifyOtpSecond.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.verifyOtpThired.length<1){
          alert('Entere OTP');
          sendForm = false;
      }
      if(this.verifyOtpFourth.length<1){
          alert('Entere OTP');
          sendForm = false;
      }

      if(sendForm){
          this.otp=this.verifyOtpfirst+this.verifyOtpSecond+this.verifyOtpThired+this.verifyOtpFourth;
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
