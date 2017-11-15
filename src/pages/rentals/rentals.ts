import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';

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
  public Rental_Listdata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,public rentals:RentalsProvider,public loadingCtrl:LoadingController ) 
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
    this.rentals.Rental_list().map(res => res.json()).subscribe((res) => {
      
        this.Rental_Listdata = res;
        this.Rental_Listdata.msg = res.msg;
        this.Rental_Listdata.status = res.status;
         this.loading.dismiss();

        console.log(this.Rental_Listdata);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }
   RentalsPage(id){
    this.navCtrl.push('RentalDetailPage',{rid:id});
  }

}
