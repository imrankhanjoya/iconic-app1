import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ExpertsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experts-detail',
  templateUrl: 'experts-detail.html',
})
export class ExpertsDetailPage {
  public expertid:any;
  public aniName:any;
  public loading:any;
  public expertdetail:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public translateService: TranslateService,public navCtrl: NavController, public navParams: NavParams,public experts:ExpertsProvider,
    public loadingCtrl: LoadingController,private alertCtrl: AlertController) {

    this.translateService.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON= value;
    });
    this.translateService.get('CALL').subscribe((value) => {
      this.CALL= value;
    });
    this.translateService.get('CALL_TOLLFREE').subscribe((value) => {
      this.CALL_TOLLFREE= value;
    });

    this.textSlide='';
    this.buttonOnCloseCSS='';

    this.expertid=navParams.get('id');
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
     this.loading.present();
  }

  ionViewDidLoad() {
  	this.get_expertdetail();
    console.log('ionViewDidLoad ExpertsDetailPage');
  }
  get_expertdetail(){
    this.experts.Experts_detail(this.expertid).map(res => res.json()).subscribe((res) => {
      
        this.expertdetail = res;
        if (res.status!=true) {
          this.navCtrl.push('CardsPage');
        }
        console.log(this.expertdetail);
        this.loading.dismiss();
         setTimeout(() => {
         this.startAnimitio();
       }, 1000);
      
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
      });

  }
   mackCall(){
    this.presentConfirm();
    console.log('-----------------------------');
  }
  startAnimitio(){
      this.buttonOnCloseCSS="buttonOnClose";
      this.aniName="openCallButton";
      this.textSlide="fadeInLeftMarket"
      setTimeout(() => {
        this.textSlide="textGoingBack"
      }, 3000);

      setTimeout(() => {
        this.aniName="closeCallButton"
      }, 4000);
  }

   presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: this.CALL_TOLLFREE,
      buttons: [
        {
          text: this.CANCEL_BUTTON,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clikkkcked');
          }
        },
        {
          text: this.CALL,
          handler: () => {
            window.location.href = "tel:18001200800";
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


}
