import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { ChoupalProvider } from '../../providers/choupal/choupal';

import { Api } from '../../providers/api/api';

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
  public userId:any;
  public isSend:boolean=false;
  public newMessge:any;
  public sendIcon: string ="assets/img/agri bolo icon/hdpi/senddis.png";
	public choupaldata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public ChoupalProvider:ChoupalProvider,
  public api:Api, public loadingCtrl: LoadingController ) {
    this.userId=api.userData.ID;
    console.log(this.userId);
  }

  ionViewDidLoad() {
    this.choupalget();
    console.log('ionViewDidLoad ChoupalPage');
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // console.log('ionViewDidLoad '+this.questionaddData.title);
    this.ChoupalProvider.postChoupal(this.userId,this.newMessge,'no Image').map(res => res.json()).subscribe((res) => {
        console.log(this.choupaldata.data);
        loading.dismiss();
      }, (err) => {
        alert(err)
        loading.dismiss();
        console.log(err);
      });
  }

}
