import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public phoneNumber:any;
  public name='allanoor';
  public userInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user: User,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpNumberPage');
  }

  sendOtp(){
  this.user.sendOtp(this.phoneNumber,this.name).map(res => res.json()).subscribe((resp) => {
  if(resp.status === true){
  this.storage.set('userInfo', resp);
  console.log(resp.status);
  this.navCtrl.push('VerifyNumberPage',{phoneNumber:this.phoneNumber});}
  else{
  this.navCtrl.push('VerifyNumberPage',{phoneNumber:this.phoneNumber});
  console.log('number unValid');
  }
  }, (err) => {
  console.log('--unsuccess');

   });
  }

}
