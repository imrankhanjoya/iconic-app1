import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';


/**
 * Generated class for the NewsdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsdetail',
  templateUrl: 'newsdetail.html',
})
export class NewsdetailPage {
  public newsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,public newsr: NewsProvider) {
  	    this.id=navParams.get('id');
  	    console.log('this.id');
  	    console.log(this.id);
  	   this.loading = this.loadingCtrl.create({
         content: 'Please wait...'
        });

        this.loading.present();

  }

  ionViewDidLoad() {
  
  	this.getNews();
    console.log('ionViewDidLoad NewsdetailPage');
  }
  getNews(){

    this.newsr.homeNews(1,this.id,0).then((res)=>{
        this.newsData = res.data[0];
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
        this.loading.dismiss();
        console.log(this.newsData);
      });

  }

}
