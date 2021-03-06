import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  Crop: string = "favourite";
  public items:any = [];
  public datatypes:any;
  private page:number=1;
  public videolistData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public VideoProvider: VideoProvider,
    private iab: InAppBrowser,public loadingCtrl: LoadingController) {

 }


  ionViewDidLoad() {
   dataLayer : [];
    dataLayer.push({
      'screenName': 'VideoPage'
    });
    dataLayer.push({'event': 'appScreenView'});

  	this.getvideo();
    console.log('ionViewDidLoad VideoPage');
  }
  getvideo(){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
    this.VideoProvider.video_list(this.page).map(res => res.json()).subscribe((res) => {
      	this.videolistData=res;
        for(let person of this.videolistData.data) {
          this.items.push(person);
        }
        console.log(this.videolistData);
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });

  }
  videoByCat(cat_slug){
    this.datatypes = 'catss';
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.VideoProvider.videoByCat(cat_slug).map(res => res.json()).subscribe((res) => {
        this.videolistData=res;
        // this.videolistDatamsg = res.msg;
        // this.videolistDatastatus = res.status;
        this.items = this.videolistData.data
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
    this.gotoWebView('https://www.youtube.com/watch?v='+videoid);
    //this.youtube.openVideo(videoid);
  }
  gotoWebView(URL){
    this.iab.create(URL, '_blank', 'location=yes');

  }

  doInfinite(infiniteScroll:any) {
     this.page+=1;
     console.log('page  '+this.page);
     
    this.VideoProvider.video_list(this.page).map(res => res.json()).subscribe((res) => {      
        if (res.status==true) {
        for(let person of res.data) {
          this.items.push(person);
        }
      }
      infiniteScroll.complete();
      console.log(this.items);

    });
     
  }
}
