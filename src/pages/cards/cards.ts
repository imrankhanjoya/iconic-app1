import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController,public experts:ExpertsProvider) {
    

  }
  ionViewDidLoad() {

    
    this.get_expert();
    this.get_cat();
    
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

  get_cat(){
    this.experts.Cat_list(8).map(res => res.json()).subscribe((res) => {
        this.catDatas.data = res.data;
        this.catDatas.status = res.status;
        this.catDatas.msg = res.msg;
        console.log('all cat data');
        console.log(res);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
    }

   goToExpertDetial(id){
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }
  onChange(selectedData){
      this.get_cat_expert(selectedData);
  }
}
