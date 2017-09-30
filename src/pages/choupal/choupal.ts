import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChoupalProvider } from '../../providers/choupal/choupal';

/**
 * Generated class for the ChoupalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.pack
 */

@IonicPage()
@Component({
  selector: 'page-choupal',
  templateUrl: 'choupal.html',
})
export class ChoupalPage {
	public choupaldata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public ChoupalProvider:ChoupalProvider ) {
  }

  ionViewDidLoad() {
    this.choupalget();
    console.log('ionViewDidLoad ChoupalPage');
  }
  choupalget(){
   	// console.log('ionViewDidLoad '+this.questionaddData.title);
    this.ChoupalProvider.getChoupal().map(res => res.json()).subscribe((res) => {
        this.choupaldata.data = res.data;
        this.choupaldata.msg = res.msg;
        this.choupaldata.status = res.status;
        console.log(this.choupaldata.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }
 


}
