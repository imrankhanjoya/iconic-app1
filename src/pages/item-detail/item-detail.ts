import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../pages';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
    public userlogin:{display_name:string,phone:string,userDict:any,userState:any}={display_name:'',phone:'',userDict:'',userState:''};


  constructor(public navCtrl: NavController, navParams: NavParams, items: Items,public storage:Storage) {
    this.item = navParams.get('item') || items.defaultItem;
    storage.get('userData').then((userlogin) => {

      this.userlogin.display_name = userlogin.display_name;
      this.userlogin.phone = userlogin.user_login;
      this.userlogin.userState = userlogin._user_state;
      this.userlogin.userDict = userlogin._user_state;
      console.log(userlogin);
    });
  }

  gotoprofile(){
      this.navCtrl.setRoor(MainPage);

  }

}
