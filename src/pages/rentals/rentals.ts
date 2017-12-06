import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';
import { Events } from 'ionic-angular';

/**
 * Generated class for the RentalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rentals',
  templateUrl: 'rentals.html',
})
export class RentalsPage {
  public items:any = [];
  private page:number=0;
  public Rental_Listdata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,
public rentals:RentalsProvider,public loadingCtrl:LoadingController ) 
  {
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();

  }

  ionViewDidLoad() {
    this.getRental();
    console.log('ionViewDidLoad RentalsPage');
  }

  getRental(){
    this.rentals.Rental_list(this.page,10).then((res)=>{
      this.Rental_Listdata = res;
      this.Rental_Listdata.msg = res.msg;
      this.Rental_Listdata.status = res.status;
      console.log(res);
      for(let person of res.data) {
        this.items.push(person);
      }
      this.loading.dismiss();
    });
  }

  RentalsPage(id,title){
    dataLayer.push({
       'appEventCategory': 'Rental',
       'appEventAction': 'Clicked',
       'appEventLabel': ' Rental Contact-'+id+'~'+title
     });
     dataLayer.push({'event': 'appEvent'});
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }
  
  //Loader Question List
  doInfinite(infiniteScroll:any) {
     console.log('doInfinite, start is currently '+this.start);
     this.page+=1;
     console.log('page  '+this.page);
    this.rentals.Rental_list(this.page,10).then((res)=>{
      this.Rental_Listdata = res;
      this.Rental_Listdata.msg = res.msg;
      this.Rental_Listdata.status = res.status;
      for(let person of this.Rental_Listdata.data) {
        this.items.push(person);
      }
      infiniteScroll.complete();
        console.log(this.items);
    });
  } 

}
