import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuitionviewpProvider } from '../../providers/quitionviewp/quitionviewp';

/**
 * Generated class for the QuitionviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quitionview',
  templateUrl: 'quitionview.html',
})
export class QuitionviewPage {
	public qid:any;
	public questionviewData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(public navCtrl: NavController, public navParams: NavParams,public questionview:QuitionviewpProvider) {
  		this.qid=navParams.get('QuitionID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuitionviewPage');
  	this. getquestionsview();
  }
  getquestionsview(){
    this.questionview.Quitionviews(this.qid).map(res => res.json()).subscribe((res) => {
      
        this.questionviewData.data = res.data;
        this.questionviewData.msg = res.msg;
        this.questionviewData.status = res.status;
        console.log(this.questionviewData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  } 
  gotoAnswerquestion(Qid){
    console.log(Qid);
    this.navCtrl.push('QuitionanswerPage',{QuitionID:Qid});
  }

}
