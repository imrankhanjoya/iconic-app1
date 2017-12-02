import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import { HomePage } from '../home/home';
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
  public id:any;
  public newsData: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public NewsProvider: NewsProvider, private iab: InAppBrowser) {
    this.id=navParams.get('id');
  }


  ionViewDidLoad() {
  	this.getNews();
    console.log('ionViewDidLoad NewsPage');
  }
   back(){
  // this.navCtrl.pop('HomePage');  
   this.navCtrl.push(HomePage);
   }
   getNews(){

    this.NewsProvider.homeNews(5,this.id).then((res)=>{
        this.newsData.data = res.data;
        this.newsData.msg = res.msg;
        this.newsData.status = res.status;
        console.log(this.newsData.data);
      });

  }
  gotoWebView(URL){
    console.log("baran"+URL);
    var ref = this.iab.create(URL, '_blank', 'location=yes');

  }


}
