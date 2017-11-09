import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { QuestionsProvider } from '../../providers/questions/questions';
import { Storage } from '@ionic/storage';
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
  public  questionaddData = {user_id:'',title:'',description:'',privacy:'',Attachments:''};
	public askquestionsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public QuestionsProvider: QuestionsProvider, public camera:Camera,
              public storage:Storage, public popoverCtrl: PopoverController,) {

                this.storage.get('userData').then((val) => {
                  this.user_id = val.ID; 
                });
              }

  ionViewDidLoad() {
    //this.getaskquestions();
    console.log('ionViewDidLoad AskquestionPage');
  }
   getaskquestions(){
   	console.log('questionaddData : '+this.questionaddData);

    this.QuestionsProvider.askquestion(this.user_id,this.questionaddData).map(res => res.json()).subscribe((res) => {
      
        /*this.askquestionsData.data = res.data;
        this.askquestionsData.msg = res.msg;
        this.askquestionsData.status = res.status;*/
        
        this.viewCtrl.dismiss();
        console.log(this.askquestionsData.data);
         this.navCtrl.push('QuestionlistPage');
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  
  goToUsrask(){
 	 this.getaskquestions();
  }
  addImg(){
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
              this.questionaddData.Attachments=imageData;
             }, (err) => {
              console.log(err);
            });
        }
     });
  }

}
