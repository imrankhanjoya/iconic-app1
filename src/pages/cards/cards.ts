import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController,public experts:ExpertsProvider,public modalCtrl:ModalController
) {
    

  }
  ionViewDidLoad() {

    
    this.get_expert();
    
  }

  get_expert(){
    this.experts.Experts_list('blogs',10).then((res)=>{
      this.expertdata = res;
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
    this.experts.Experts_Cat_list('blogs',10,category_id).map(res => res.json()).subscribe((res) => {
        this.expertdata = res;
        console.log(this.expertdata);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
  }

 
     openFilter(){
    let modal = this.modalCtrl.create('SpecialistPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        console.log("popoverData"+this.popoverData);
        this.navCtrl.push(CardsPage,{speciatist:popoverData.data,fromFilter:true}); 
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
