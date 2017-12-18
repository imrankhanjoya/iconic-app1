import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExpertsProvider } from '../../providers/experts/experts';


/**
 * Generated class for the AgriInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agri-info',
  templateUrl: 'agri-info.html',
})
export class AgriInfoPage {
  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,  public experts:ExpertsProvider,private iab: InAppBrowser,
    public loadingCtrl: LoadingController){
  }  

  ionViewDidLoad() {

      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });

     this.loading.present();
    this.get_expert();
    console.log('ionViewDidLoad AgriInfoPage');
  }
   get_expert(){
    this.experts.Experts_list().then((res)=>{
        this.expertdata = res;
        this.loading.dismiss();
        console.log(this.expertdata);
    });
}
  gotoWebView(URL){
    this.iab.create(URL, '_blank', 'location=yes');

  }
  goToExpertDetial(id){
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }
   goToCrops(){
   this.navCtrl.push('CroplistPage',{croptype:'Rabi'}); 
  }
   goToKharif(){
   this.navCtrl.push('CroplistPage',{croptype:'Kharif'}); 
  }
   goToRabi(){
   this.navCtrl.push('CroplistPage',{croptype:'Rabi'}); 
  }
   goToChoupal(){
    this.navCtrl.push('ChoupalPage');
  }
  goToHorticulture(){
    this.navCtrl.push('CroplistPage',{croptype:'Horticulture'});
  }
   goToBlogPage(){
   this.navCtrl.push('CardsPage'); 
  }
   gotoVedio(){
    this.navCtrl.push('VideoPage');
  }
   gotoAskquestion(){
    this.navCtrl.push('QuestionlistPage');
  }
   playVideo(videoid:any){
    console.log('videoid  : '+videoid);
    this.gotoWebView('https://www.youtube.com/watch?v='+videoid);
    //this.youtube.openVideo(videoid);
  }
  

}
