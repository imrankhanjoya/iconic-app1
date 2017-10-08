import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the MarketselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-marketselect',
  templateUrl: 'marketselect.html',
})
export class MarketselectPage {

  public userPhone:any;
   public userOTP:any;
   public userName:any;
   public userPassword:any;
   public userState:any;
   public userKharif:any;
   public userCrops:any;
   public userVegetables:any;
   public loading:any;	

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,
      public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  	this.getUserData();
    console.log('ionViewDidLoad MarketselectPage');
  }
  getUserData(){
    this.storage.get('userPhone').then((val) => {
      this.userPhone=val;
    });
    this.storage.get('userOTP').then((val) => {
      this.userOTP=val;
    });
    this.storage.get('userName').then((val) => {
      this.userName=val;
    });
    this.storage.get('userPassword').then((val) => {
      this.userPassword=val;
    });
    this.storage.get('userState').then((val) => {
       this.userState=val;
    });
    this.storage.get('userCrops').then((val) => {
       this.userCrops=val;
    });
    this.storage.get('userVegetables').then((val) => {
       this.userVegetables=val;
    });
  }

}
