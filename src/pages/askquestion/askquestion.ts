import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, 
  LoadingController,ToastController} from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  private user_id :any;
  private base64Image :any;
  public  questionaddData = {user_id:'',title:'',description:'',privacy:'',Attachments:''};
	public askquestionsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public QuestionsProvider: QuestionsProvider, public camera:Camera,
              public events: Events,
              public storage:Storage, public popoverCtrl: PopoverController,
              private toastCtrl: ToastController,
              public loadingCtrl:LoadingController,
              public translateService: TranslateService
              ) {
              this.translateService.get('QUATION_ERROR').subscribe((value) => {
                this.QUATION_ERROR = value;
                console.log(this.validnumber+'tesrtinnng');
              });
              this.translateService.get('QUATION_ADDED').subscribe((value) => {
                this.QUATION_ADDED = value;
                console.log(this.validnumber+'tesrtinnng');
              });
                this.storage.get('userData').then((val) => {
                  this.user_id = val.ID; 
                });
             
          }
          
            presentToast(message) {
              let toast = this.toastCtrl.create({
                message: message,
                position: 'middle',
                //dismissOnPageChange:true,
                showCloseButton:true
              });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    //this.getaskquestions();
    console.log('ionViewDidLoad AskquestionPage');
  }
   getaskquestions(){
     this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

   	console.log('questionaddData : '+this.questionaddData);
    this.QuestionsProvider.askquestion(this.user_id,this.questionaddData).map(res => res.json()).subscribe((res) => {
        this.askquestionsData.msg = res.msg;
        this.askquestionsData.status = res.status;
         this.loading.dismiss();

        if (res.status==false) {
            this.presentToast(this.QUATION_ERROR);
        }else{

          this.viewCtrl.dismiss();
          this.presentToast(this.QUATION_ADDED);
          this.navCtrl.push('QuestionlistPage');
          console.log(this.askquestionsData.data);
        }
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  
  goToUsrask(){
      dataLayer.push({
         'appEventCategory': 'Ask Expert',
         'appEventAction': 'Submit',
         'appEventLabel': 'New Question'
       });
     dataLayer.push({'event': 'appEvent'});
 	 this.getaskquestions();
  }
  addImg(){
       dataLayer.push({
         'appEventCategory': 'Ask Expert',
         'appEventAction': 'Clicked',
         'appEventLabel': 'Add Image'
       });
     dataLayer.push({'event': 'appEvent'});
    let popover = this.popoverCtrl.create('UploadImagePage');
     popover.present({
     });
     popover.onDidDismiss((popoverData) => {
      console.log(popoverData);
        if(popoverData=='camera'){
            this.camera.getPicture({
             sourceType: this.camera.PictureSourceType.CAMERA,
             destinationType: this.camera.DestinationType.DATA_URL
            }).then((imageData) => {
              console.log('=========data:image/jpeg;base64,'+imageData);
              this.base64Image = 'data:image/jpeg;base64,'+imageData;
             this.questionaddData.Attachments=imageData;
             }, (err) => {
              console.log(err);
            });
        }
        if(popoverData=='gallery'){
            this.camera.getPicture({
             sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
             destinationType: this.camera.DestinationType.DATA_URL
            }).then((imageData) => {
              console.log('=========data:image/jpeg;base64,'+imageData);
              this.base64Image = 'data:image/jpeg;base64,'+imageData;
              this.questionaddData.Attachments=imageData;
             }, (err) => {
              console.log(err);
            });
        }
     });
  }

}
