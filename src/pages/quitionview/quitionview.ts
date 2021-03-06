import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { QuitionviewpProvider } from '../../providers/quitionviewp/quitionviewp';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { QuestionlistPage } from '../questionlist/questionlist';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the QuitionviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-quitionview',
  templateUrl: 'quitionview.html',
})
export class QuitionviewPage {
  public qid:any;
	public user_id:any;
	public questionviewData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams,
      public questionview:QuitionviewpProvider,
              public event: Events,public storage:Storage) {
  		this.qid=navParams.get('QuitionID');
      
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    this.loading.present();
    dataLayer : [];
    dataLayer.push({
      'screenName': 'QuitionviewPage'
    });
    dataLayer.push({'event': 'appScreenView'});
    console.log('ionViewDidLoad QuitionviewPage');
    this.storage.get('userData').then((val) => {
        this.user_id = val.ID; 
        this. getquestionsview();
      });
  }
  getquestionsview(){
    this.questionview.Quitionviews(this.qid,this.user_id).map(res => res.json()).subscribe((res) => {
      
        this.questionviewData.data = res.data;
        this.questionviewData.msg = res.msg;
        this.questionviewData.status = res.status;
        console.log(this.questionviewData.data.QuestionAnswer);      
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
      });

  } 
   back(){
    // this.navCtrl.pop('HomePage');  
    //this.navCtrl.push(QuestionlistPage);
    const index = this.viewCtrl.index;
    this.navCtrl.push('QuestionlistPage').then(() => {
      this.navCtrl.remove(index);
    });
   } 

  gotoAnswerquestion(Qid){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Ask Expert',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Add Answer'
       });
      dataLayer.push({'event': 'appEvent'});
      const index = this.viewCtrl.index;
      this.navCtrl.push('QuitionanswerPage',{QuitionID:Qid}).then(() => {
        this.navCtrl.remove(index);
      });
    }  
}
