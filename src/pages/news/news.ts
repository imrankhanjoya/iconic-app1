import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public newsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public NewsProvider: NewsProvider, private iab: InAppBrowser) {
  }


  ionViewDidLoad() {
  	this.getNews();
    console.log('ionViewDidLoad NewsPage');
  }
   getNews(){
    this.NewsProvider.homeNews().map(res => res.json()).subscribe((res) => {

        this.newsData.data = res.data;
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
        console.log(this.newsData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
    gotoWebView(URL){
    console.log("baran"+URL);
    var ref = this.iab.create(URL, '_blank', 'location=yes');

  }


}
