import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { Events } from 'ionic-angular';
import { AskquestionPage } from '../askquestion/askquestion';
import { HomePage } from '../home/home';


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
    public items:any = [];
    private page:number=0;
    public questionsDatalist: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
    constructor(public navCtrl: NavController,public viewCtrl: ViewController,public navParams: NavParams,
    public events: Events,public loadingCtrl: LoadingController,public QuestionsProvider: QuestionsProvider) {
     this.loading = this.loadingCtrl.create({
         content: 'Please wait...'
        });

     this.loading.present();
  }

  ionViewDidLoad() {
  	this. getquestions();
    console.log('ionViewDidLoad QuestionlistPage');
  }
  getquestions(){

    this.QuestionsProvider.questionList(this.page).then((res)=>{
      this.questionsDatalist.data = res.data;
        this.questionsDatalist.msg = res.msg;
        this.questionsDatalist.status = res.status;
        for(let person of this.questionsDatalist.data) {
          this.items.push(person);
        }
        this.loading.dismiss();
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
      dataLayer.push({
         'appEventCategory': 'Ask Expert',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Ask Question'
       });
     dataLayer.push({'event': 'appEvent'});
     // this.navCtrl.push('AskquestionPage');
   this.navCtrl.push('AskquestionPage').then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  } 
  back(){
    // this.navCtrl.pop('HomePage');  
    this.navCtrl.pop();
  }
  gotoViewquestion(Qid){
    console.log(Qid);
    this.navCtrl.push('QuitionviewPage',{QuitionID:Qid}).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  } 

  //Loader Question List
  doInfinite(infiniteScroll:any) {
     console.log('doInfinite, start is currently '+this.start);
     this.page+=1;
     console.log('page  '+this.page);
     
    this.QuestionsProvider.questionList(this.page).then((res)=>{
      this.questionsDatalist.data = res.data;
        this.questionsDatalist.msg = res.msg;
        this.questionsDatalist.status = res.status;
        if (res.status==true) {
          for(let person of this.questionsDatalist.data) {
            this.items.push(person);
          }
        }
        infiniteScroll.complete();
        console.log(this.items);
    });
  }  

}
