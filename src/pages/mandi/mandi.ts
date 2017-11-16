import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MandiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mandi',
  templateUrl: 'mandi.html',
})
export class MandiPage {
	public mandidata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.id=navParams.get('crop_id');

  }


  ionViewDidLoad() {
    this.getmandi();
    console.log('ionViewDidLoad MandiPage');
  }
   getmandi(){
   	
  }

}
