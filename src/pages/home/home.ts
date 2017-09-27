import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MandiProvider } from '../../providers/mandi/mandi';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public mandiData: { status: string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
	public topMenu:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mandi:MandiProvider) {
      this.getMandiData();
  		this.topMenu = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  toggleMenu(){

  	if(this.topMenu==false){
  		this.topMenu =true;
  	}else{
  		this.topMenu = false;
  	}

  }
  
  getMandiData(){
    this.mandi.mandiRates().subscribe((resp) => {
      
        this.mandiData.data = resp;
        console.log(this.mandiData.data);
      }, (err) => {
        // Unable to log in
        console.log(err);
      });

  }

}
