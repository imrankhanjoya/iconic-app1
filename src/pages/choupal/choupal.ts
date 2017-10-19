import { Component,NgModule, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, PopoverController, Scroll} from 'ionic-angular';
import { ChoupalProvider } from '../../providers/choupal/choupal';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChoupalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.pack
 */

@IonicPage()
@Component({
  selector: 'page-choupal',
  templateUrl: 'choupal.html',
})
export class ChoupalPage {
  @ViewChild('chatScroll') chatScroll: Scroll;
  public userId:any;
  public isSend:boolean=false;
  public newMessge:string='';
  public selectedImg:any;
  public sendIcon: string ="assets/img/agri bolo icon/hdpi/senddis.png";
	public choupaldata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public ChoupalProvider:ChoupalProvider,
  public api:Api, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public camera:Camera,
  public storage:Storage) {

    this.userId=api.userData.ID;
    console.log('user id--- : '+this.userId);
    this.selectedImg='';
  }
  ionViewDidLoad() {
    this.choupalget();
    console.log('ionViewDidLoad ChoupalPage');
  }
  scrollToBottom(scroll) {
    scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
  }
  goBottomBtnClick() {
     this.scrollToBottom(this.chatScroll._scrollContent.nativeElement);
  }
  choupalget(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
   	// console.log('ionViewDidLoad '+this.questionaddData.title);
    this.ChoupalProvider.getChoupal().map(res => res.json()).subscribe((res) => {
        this.choupaldata.data = res.data;
        this.choupaldata.msg = res.msg;
        this.choupaldata.status = res.status;
        console.log(this.choupaldata.data);
        setTimeout(() => {
          this.goBottomBtnClick();
        });
        loading.dismiss();
      }, (err) => {
        alert(err)
        loading.dismiss();
        console.log(err);
      });
  }
 change(value){
  
  if(value.length>0){
    console.log('-----'+value.length);
    this.isSend=true;
    this.sendIcon='assets/img/agri bolo icon/hdpi/senddis.png';
  }else {
    console.log('----++-'+value.length);
    this.isSend=false;
    this.sendIcon='assets/img/agri bolo icon/hdpi/send.png';
  }
 }

 postCopal(){
    if (this.isSend) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    loading.present();
    // console.log('ionViewDidLoad '+this.questionaddData.title);
    this.ChoupalProvider.postChoupal(this.userId,this.newMessge,'').map(res => res.json()).subscribe((res) => {
        this.selectedImg='';
        console.log(this.choupaldata.data);
        this.newMessge='';
        this.isSend=false;
        this.choupalget();
        loading.dismiss();
      }, (err) => {
        alert(err)
        loading.dismiss();
        console.log(err);
      });
    }
  }

  uploadeImg(){
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
             this.selectedImg=imageData;
             this.postCopal();
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
              this.selectedImg=imageData;
             this.postCopal();
             }, (err) => {
              console.log(err);
            });
        }
     });
  }

}
