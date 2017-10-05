import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KrishCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-krish-center',
  templateUrl: 'krish-center.html',
})
export class KrishCenterPage {
	// public krishblogData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KrishCenterPage');
  }
  //  getkrish(){
  //  	// console.log('ionViewDidLoad '+this.questionaddData.title);

  //   this.KrishCenterProvider.krish_centerlist().map(res => res.json()).subscribe((res) => {
      
  //       this.krishblogData.data = res.data;
  //       this.krishblogData.msg = res.msg;
  //       this.krishblogData.status = res.status;
  //       console.log(this.krishblogData.data);
  //     }, (err) => {
  //       // Unable to log in
  //       console.log(err);
  //     });

  // }


}
