import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';

/**
 * Generated class for the QuestionlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

  @IonicPage()
  @Component({
    selector: 'page-questionlist',
    templateUrl: 'questionlist.html',
  })
  export class QuestionlistPage {
    public questionsDatalist: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
    constructor(public navCtrl: NavController, public navParams: NavParams,public QuestionsProvider: QuestionsProvider) {
  }

  ionViewDidLoad() {
  	this. getquestions();
    console.log('ionViewDidLoad QuestionlistPage');
  }
  getquestions(){

    this.QuestionsProvider.questionList().then((res)=>{
      this.questionsDatalist.data = res.data;
        this.questionsDatalist.msg = res.msg;
        this.questionsDatalist.status = res.status;
    });
    
    // this.QuestionsProvider.questionList().map(res => res.json()).subscribe((res) => {
      
    //     this.questionsDatalist.data = res.data;
    //     this.questionsDatalist.msg = res.msg;
    //     this.questionsDatalist.status = res.status;
    //     console.log(this.questionsDatalist.data);
    //   }, (err) => {
    //     // Unable to log in
    //     console.log(err);
    //   });

  }
  gotoAskquestion(){
    this.navCtrl.push('AskquestionPage');
  } 
  gotoViewquestion(Qid){
    console.log(Qid);
    this.navCtrl.push('QuitionviewPage',{QuitionID:Qid});
  }   

}
