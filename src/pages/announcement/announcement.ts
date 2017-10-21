import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public announceList: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public Announce:AnnouncementproProvider) {
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
      });
    // this.Announce.announcementList(20).map(res => res.json()).subscribe((res) => {
      
    //     this.announceList.data = res.data;
    //     this.announceList.msg = res.msg;
    //     this.announceList.status = res.status;
    //     console.log(res.data);
    //   }, (err) => {
    //     // Unable to log in
    //     console.log(err);
    //   });
  }

}
