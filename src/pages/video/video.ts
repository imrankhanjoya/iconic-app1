import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';

// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


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
  constructor(public navCtrl: NavController, public navParams: NavParams,public VideoProvider: VideoProvider,
    public loadingCtrl: LoadingController) {

 }


  ionViewDidLoad() {

  	this.getvideo();
    console.log('ionViewDidLoad VideoPage');
  }
  getvideo(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
    this.VideoProvider.video_list().map(res => res.json()).subscribe((res) => {
      	this.videolistData=res;
        // this.videolistDatamsg = res.msg;
        // this.videolistDatastatus = res.status;
        console.log(this.videolistData);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });

  }
  videoByCat(cat_slug){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
    this.VideoProvider.videoByCat(cat_slug).map(res => res.json()).subscribe((res) => {
        this.videolistData=res;
        // this.videolistDatamsg = res.msg;
        // this.videolistDatastatus = res.status;
        loading.dismiss();
        console.log(this.videolistData);
      }, (err) => {
        // Unable to log in
        loading.dismiss();
        console.log(err);
      });

  }
  gotoVediodetail(){
  this.navCtrl.push('VideoDetailPage');
  }

  playVideo(videoid:any){
    console.log('videoid  : '+videoid);
    //this.youtube.openVideo(videoid);
  }



}
