import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnnouncementproProvider } from '../../providers/announcementpro/announcementpro';

/**
 * Generated class for the AnnouncementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  public loading :any;
  public announceList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public Announce:AnnouncementproProvider,public loadingCtrl:LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementPage');
    this.getannouncement();
  }

  getannouncement(){
    this.Announce.announcementList(20).then((res)=>{
      this.announceList.data = res.data;
      this.announceList.msg = res.msg;
      this.announceList.status = res.status;
      this.loading.dismiss();
    });
  }

  gotoAnounsePage(type,type_value){
      if (type=='product') {
        this.navCtrl.push('MarketViewPage',{id:type_value});
      }
      if (type=='crop') {
        this.navCtrl.push('CropdetailPage',{crop_id:type_value});
      }
      if (type=='rental') {
        this.navCtrl.push('RentalDetailPage',{rid:type_value});
      }
      if (type=='blogs') {
        this.navCtrl.push('ExpertsDetailPage',{id:type_value}); 
      }
      if (type=='news') {
       this.navCtrl.push('NewsPage',{id:type_value});
      }
      if (type=='q') {
       this.navCtrl.push('QuitionviewPage',{QuitionID:type_value})
      }
      if (type=='weather') {
        this.navCtrl.push(WeatherPage);
      }
  }

}
