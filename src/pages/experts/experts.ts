import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpertproviderProvider } from '../../providers/expertprovider/expertprovider';

/**
 * Generated class for the ExpertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experts',
  templateUrl: 'experts.html',
})
export class ExpertsPage {
	public ExpertsDatalist: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(public navCtrl: NavController, public navParams: NavParams,public expertprovider:ExpertproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpertsPage');
  }
  getexperts(){
    this.expertprovider.Experts().map(res => res.json()).subscribe((res) => {
      
        this.ExpertsDatalist.data = res.data;
        this.ExpertsDatalist.msg = res.msg;
        this.ExpertsDatalist.status = res.status;
        console.log(this.ExpertsDatalist.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
