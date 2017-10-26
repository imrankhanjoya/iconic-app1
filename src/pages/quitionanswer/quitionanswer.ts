import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QuitionanswerpProvider } from '../../providers/quitionanswerp/quitionanswerp';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicStorageModule, Storage } from '@ionic/storage';

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
  public answer : FormGroup;
  public  answerformData = {user_id:'',title:'',description:''};
	public answerData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(
                  public navCtrl: NavController, 
                  public navParams: NavParams,
                  public questionanswer: QuitionanswerpProvider,
                  public formBuilder:FormBuilder,
                  public storage:Storage,
                  public viewCtrl: ViewController
                ) {
    		        this.qid=navParams.get('QuitionID');
                this.storage.get('userData').then((val) => {
                  this.user_id = val.ID; 
                });

                  this.answer = this.formBuilder.group({
                      description: ['', Validators.required]
                  });
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad QuitionanswerPage');
  	}   

  	submitanswer(){
      
   		 console.log('ionViewDidLoad '+this.answer.value.description);
    	this.questionanswer.answerquestion(this.user_id,this.qid,this.answer.value).map(res => res.json()).subscribe((res) => {
          this.viewCtrl.dismiss();
        	//this.navCtrl.push('QuitionviewPage',{QuitionID:this.qid});
        	//console.log(this.qid);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
