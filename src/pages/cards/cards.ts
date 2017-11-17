import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,LoadingController } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController,  public loadingCtrl: LoadingController,public experts:ExpertsProvider,public modalCtrl:ModalController
) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
  }
  ionViewDidLoad() {

    
    this.get_expert();
    
  }

  get_expert(){
    this.experts.Experts_list('blogs',10,20).then((res)=>{
      this.expertdata = res;
      this.loading.dismiss();

    });
    // this.experts.Experts_list('blogs',10).map(res => res.json()).subscribe((res) => {
    //   this.expertdata = res;
    //   console.log(this.expertdata);
    // }, (err) => {
    //   // Unable to log in
    //   console.log(err);
    // });
  }

  get_cat_expert(category_id){
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
    this.experts.Experts_Cat_list('blogs',20,category_id).map(res => res.json()).subscribe((res) => {
        this.expertdata = res;
        console.log(this.expertdata);
        this.loading.dismiss();
      }, (err) => {
        // Unable to log in
        console.log(err);
        this.loading.dismiss();
      });
  }

 
  openFilter(){
    let modal = this.modalCtrl.create('SpeciallistFilterPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      if (popoverData.data!="") {
        this.get_cat_expert(popoverData.data);
        //console.log("kkj"+this.popoverData);
        //this.navCtrl.push(CardsPage,{speciatist:popoverData.data,fromFilter:true}); 
      }
    });
  }

   goToExpertDetial(id){
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }
  onChange(selectedData){
      this.get_cat_expert(selectedData);
  }
}
