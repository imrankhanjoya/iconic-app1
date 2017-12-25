import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,LoadingController } from 'ionic-angular';
import { ExpertsProvider } from '../../providers/experts/experts';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  public items:any = [];
  private page:number=1;
  private datatypes:any;
  public expertdata:{ status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController,  public loadingCtrl: LoadingController,public experts:ExpertsProvider,public modalCtrl:ModalController
) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 6000);
  }
  ionViewDidLoad() {
    this.get_expert(this.page);
  }

  get_expert(){
    this.experts.Experts_list('blogs',10,this.page).then((res)=>{
      this.expertdata = res;
      for(let person of this.expertdata.data) {
        this.items.push(person);
      }
      console.log(this.items);
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
    this.datatypes = 'catss';
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

     this.loading.present();
    this.experts.Experts_Cat_list('blogs',30,category_id).map(res => res.json()).subscribe((res) => {
        this.expertdata = res;
        this.items = res.data;
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

  doInfinite(infiniteScroll:any) {
     console.log('doInfinite, start is currently '+this.start);
     this.page+=1;
     console.log('page  '+this.page);
     
     this.experts.Experts_list('blogs',10,this.page).then((res)=>{
      this.expertdata = res;
      /*for(let person of this.expertdata.data) {
        this.items.push(person);
      }
      infiniteScroll.complete();*/
      if (res.status==true) {
        for(let person of this.expertdata.data) {
          this.items.push(person);
        }
      }
      infiniteScroll.complete();
      console.log(this.items);

    });
     
  }

}
