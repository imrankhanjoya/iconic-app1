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
  
  constructor(public navCtrl: NavController,public experts:ExpertsProvider) {
    

  }
  ionViewDidLoad() {

    
    this.get_expert();
    
  }

  get_expert(){
    this.experts.Experts_list('blogs',10).map(res => res.json()).subscribe((res) => {
        this.expertdata = res;
        console.log(this.expertdata);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });
    }

   goToExpertDetial(id){
    this.navCtrl.push('ExpertsDetailPage',{id:id}); 
  }
}
