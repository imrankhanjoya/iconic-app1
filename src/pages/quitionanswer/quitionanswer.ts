import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuitionanswerpProvider } from '../../providers/quitionanswerp/quitionanswerp';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the QuitionanswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quitionanswer',
  templateUrl: 'quitionanswer.html',
})
export class QuitionanswerPage {
	public qid:any;
  private answer : FormGroup;
  	public  answerformData = {user_id:1,title:'',description:''};
	public answerData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(public navCtrl: NavController, public navParams: NavParams,public questionanswer: QuitionanswerpProvider,public formBuilder:FormBuilder) {
  		this.qid=navParams.get('QuitionID');
      //Change Password
        this.answer = this.formBuilder.group({
            description: ['', Validators.required],
        });
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad QuitionanswerPage');
  	}   

  	submitanswer(){
   		// console.log('ionViewDidLoad '+this.questionaddData.title);
    	this.questionanswer.answerquestion(this.answerformData,this.qid).map(res => res.json()).subscribe((res) => {
      
        	this.navCtrl.push('QuitionviewPage',{QuitionID:this.qid});
        	//console.log(this.qid);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
