import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';

/**
 * Generated class for the AskquestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-askquestion',
  templateUrl: 'askquestion.html',
})
export class AskquestionPage {
  public  questionaddData = {user_id:1,title:'',description:'',privacy:'',Attachments:''};
	public askquestionsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public QuestionsProvider: QuestionsProvider) {
  }

  ionViewDidLoad() {
    //this.getaskquestions();
    console.log('ionViewDidLoad AskquestionPage');
  }
   getaskquestions(){
   	// console.log('ionViewDidLoad '+this.questionaddData.title);


    this.QuestionsProvider.askquestion(this.questionaddData).map(res => res.json()).subscribe((res) => {
      
        /*this.askquestionsData.data = res.data;
        this.askquestionsData.msg = res.msg;
        this.askquestionsData.status = res.status;*/
        this.navCtrl.push('QuestionlistPage');
        console.log(this.askquestionsData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  
  goToUsrask(){
 	 this.getaskquestions();
  	this.navCtrl.push(AskquestionPage);
  }

}
