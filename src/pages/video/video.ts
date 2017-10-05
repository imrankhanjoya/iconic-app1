import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  public videolistData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 }


  ionViewDidLoad() {

  	this.getvideo();
    console.log('ionViewDidLoad VideoPage');
  }
   getvideo(){
    this.VideoProvider.video_list().map(res => res.json()).subscribe((res) => {
      	this.videolistData=res;
        // this.videolistDatamsg = res.msg;
        // this.videolistDatastatus = res.status;
        console.log(this.videolistData);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
   gotoVediodetail(){
  this.navCtrl.push('VideoDetailPage');
  }


}
