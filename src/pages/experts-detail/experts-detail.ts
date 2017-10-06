import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';

/**
 * Generated class for the ExpertsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experts-detail',
  templateUrl: 'experts-detail.html',
})
export class ExpertsDetailPage {
  public expertid:any;
  public expertdetail:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public experts:ExpertsProvider) {
  this.expertid=navParams.get('id');
  }

  ionViewDidLoad() {
  	this.get_expertdetail();
    console.log('ionViewDidLoad ExpertsDetailPage');
  }
  get_expertdetail(){
    this.experts.Experts_detail(this.expertid).map(res => res.json()).subscribe((res) => {
      
        this.expertdetail = res;
        console.log(this.expertdetail);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
