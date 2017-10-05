import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html',
})
export class SelectLocationPage {
  public villageName:any;
  public lang:any;
  public selectState: any;
  public stateList: any;
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl: AlertController,public cityStateProvider:CityStateProvider) {
  this. storage.get('userLang').then((val) => {
  this.lang=val;

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectLocationPage');
  }
  change(value){
     if( value.length>2){
    this. showStateInPopup();
     }else{
         console.log("less");
     }
}


  showStateInPopup() {
    this.cityStateProvider.getState(this.lang).map(res => res.json()).subscribe((resp) => {
      //alert(this.crops.toString());
      this.stateList=resp.data;
      console.log('------------'+this.stateList);
      let alert = this.alertCtrl.create();
        alert.setTitle('Select Location');
        for (let activity of this.stateList) {
          alert.addInput({
          type: 'radio', label: activity.state_name, value: activity.state_name, checked: false,
          });
        }
        alert.addButton('Cancel');
        alert.addButton({
          text: 'Ok',
          handler: selected => {
            this.selectState = selected;
          // this.updateActivitiesList(this.selectedActivities);
           console.log('--myNameisKhan---'+this.selectState)

          }
        });
        alert.present();
    });
  }
  gotoNext(){
  this.navCtrl.push('CropsPage');
  }
}
