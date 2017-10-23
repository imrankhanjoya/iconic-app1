import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RentalsProvider } from '../../providers/rentals/rentals';

/**
 * Generated class for the RentalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rental-detail',
  templateUrl: 'rental-detail.html',
})
export class RentalDetailPage {
  public Rental_detaildata: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public rentalid:any;

  public aniName:any;
  public textSlide:any;
  public textGotoBack:any;
  public buttonOnCloseCSS:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rentals:RentalsProvider ) {
    this.rentalid=navParams.get('rid');
    this.textSlide='';
    this.buttonOnCloseCSS='';


  }

  ionViewDidLoad() {
  	 this.getRental_detail();
    console.log('ionViewDidLoad RentalDetailPage');
  }
   getRental_detail(){
    this.rentals.Rental_Detail(this.rentalid).map(res => res.json()).subscribe((res) => {
      
        this.Rental_detaildata = res;
        this.Rental_detaildata.msg = res.msg;
        this.Rental_detaildata.status = res.status;
        console.log(this.Rental_detaildata);
        setTimeout(() => {
          this.startAnimitio();
        }, 1000);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

  mackCall(){
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

}
