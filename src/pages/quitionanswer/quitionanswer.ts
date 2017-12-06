import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { QuitionanswerpProvider } from '../../providers/quitionanswerp/quitionanswerp';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
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
                  public events: Events,
                  public translateService: TranslateService,
                  public viewCtrl: ViewController,
                  private toastCtrl: ToastController
                ) {
    		        this.qid=navParams.get('QuitionID');
                this.storage.get('userData').then((val) => {
                  this.user_id = val.ID; 
                });
                this.translateService.get('ADDED_ANSWER').subscribe((value) => {
                this.ADDED_ANSWER = value;
                console.log(this.validnumber+'tesrtinnng');
              });

                  this.answer = this.formBuilder.group({
                      description: ['', Validators.required]
                  });
	}

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'middle',
      showCloseButton:true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  	ionViewDidLoad() {
      //alert('this.data.msg');
    	console.log('ionViewDidLoad QuitionanswerPage');
  	}  
    
  	submitanswer(){
       dataLayer.push({
         'appEventCategory': 'Ask Expert',
         'appEventAction': 'Submit',
         'appEventLabel': 'Submit Answer'
       });
     dataLayer.push({'event': 'appEvent'});
   		 console.log('ionViewDidLoad '+this.answer.value.description);
    	this.questionanswer.answerquestion(this.user_id,this.qid,this.answer.value).map(res => res.json()).subscribe((res) => {
          this.presentToast(this.ADDED_ANSWER);
        	this.navCtrl.push('QuitionviewPage',{QuitionID:this.qid});
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
