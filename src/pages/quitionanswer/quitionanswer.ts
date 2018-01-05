import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-quitionanswer',
  templateUrl: 'quitionanswer.html',
})
export class QuitionanswerPage {
  public qid:any;
  public ADDED_ANSWER:any;
  public user_id:any;
	public OK:any;
  public answer : FormGroup;
  public  answerformData = {user_id:'',title:'',description:''};
	public answerData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(public alertCtrl: AlertController,
                  public navCtrl: NavController, 
                  public navParams: NavParams,
                  public questionanswer: QuitionanswerpProvider,
                  public formBuilder:FormBuilder,
                  public storage:Storage,
                  public event: Events,
                  public translateService: TranslateService,
                  public viewCtrl: ViewController,
                ) {
    		        this.qid=navParams.get('QuitionID');
                this.storage.get('userData').then((val) => {
                  this.user_id = val.ID; 
                });
                this.translateService.get('ADDED_ANSWER').subscribe((value) => {
                  this.ADDED_ANSWER = value;
                  console.log(this.validnumber+'tesrtinnng');
                });
              this.translateService.get('OK').subscribe((value) => {
                this.OK = value;
              });
              this.answer = this.formBuilder.group({
                  description: ['', Validators.required]
              });
	}


  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: [{
              text: this.OK,
              handler: () => {
                this.back();
              }
            }]
    });
    alert.present();
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
          this.presentAlert(this.ADDED_ANSWER);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
  back(){
    const index = this.viewCtrl.index;
    this.navCtrl.push('QuitionviewPage',{QuitionID:this.qid}).then(() => {
      this.navCtrl.remove(index);
    });
  }

}
