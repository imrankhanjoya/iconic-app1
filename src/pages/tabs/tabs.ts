import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, AlertController,LoadingController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab4Root } from '../pages';
import { Tab5Root } from '../pages';
import { HomePage } from '../../pages/home/home';
import { NewsPage } from '../../pages/news/news';
import { Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = HomePage;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;

  tab1Title = "";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";

  public selectedTabTitle:any;
  public selectedTabIndex:0;
  public GPSAlert:any;
  public CANCEL_BUTTON:any;

  constructor(private translate: TranslateService,public navCtrl: NavController,public platform:Platform,
    public alertCtrl: AlertController,public events: Events,private geolocation: Geolocation,
    public loadingCtrl:LoadingController,public device: Device,public appVersion: AppVersion) {

    this.translate.get(['Home', 'Krishi Center', 'News', 'Choupal', 'Market' ]).subscribe(values => {
      this.tab1Title = values['Home'];
      this.tab2Title = values['Krishi Center'];
      this.tab3Title = values['News'];
      this.tab4Title = values['Choupal'];
      this.tab5Title = values['Market'];
      this.appVersion.getPackageName((version)=>{
        if (version=="true") {
            //this.navCtrl.push('KrishCenterPage');
        }else{
            this.gpsAlert();
        }
      });

    });

    this.translate.get('GPS_ALERT').subscribe((value) => {
      this.GPSAlert = value;
    });

    this.translate.get('CANCEL_BUTTON').subscribe((value) => {
      this.CANCEL_BUTTON = value;
    });
    // platform.ready().then(() => {

    //           platform.registerBackButtonAction(() => {
    //              let view = this.navCtrl.getActive();
    //              console.log("  current Page  :  " + view);
    //              if (this.navCtrl.canGoBack()&&selectedTabIndex==0) {
    //                 if(this.alert){ 
    //                   this.alert.dismiss();
    //                   this.alert =null;     
    //                 }else{
    //                   this.exitConfrom();
    //                 }
    //               }else {
    //                 this.navCtrl.pop({});
    //               }
    //           });
    //         });

    //   let selectedTab = this.tabRef.getSelected();
    // console.log(selectedTab.index + ' - ' + selectedTab.tabTitle);
    
  }


  gotoChoupal(){
    this.navCtrl.push('ChoupalPage');
  }
  gotoSava(){

    // this.navCtrl.push('KrishCenterPage');

    //this is function Check GPS on or off
    this.appVersion.getPackageName((version)=>{
        if (version=="true") {
            this.navCtrl.push('KrishCenterPage');
        }else{
            this.gpsAlert();
        }
    });

    // this.navCtrl.push('KrishCenterPage');


    // this.rotateClass="rotateimage1";
    //   //this.topMenu = 'toolbarClosed';
    //   this.loading = this.loadingCtrl.create({
    //     content: 'Please wait...'
    //   });
    //   this.loading.present();
    // this.geolocation.getCurrentPosition().then((resp) => {
    //    this.navCtrl.push('KrishCenterPage');
    //    this.loading.dismiss();
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    //   alert("Plase trun on yours phone GPS?");
    //   this.loading.dismiss();
    // });
  }
  onTabsChange(){
    let selectedTab = this.tabRef.getSelected();
    this.selectedTabTitle=selectedTab.tabTitle;
    this.selectedTabIndex=selectedTab.index;
    // if (selectedTab.index==1) {
    //   // this.events.publish('update:page');
    //   this.navCtrl.push('KrishCenterPage');
    // }

  }
  gpsAlert() {
      let alert = this.alertCtrl.create({
        title: 'GPS',
        message: this.GPSAlert,
        buttons: [
          {
            text: this.CANCEL_BUTTON,
            role: 'cancel',
            handler: () => {
              //this.alert = null;
            }
          },
          {
            text: 'Turn on GPS Location',
            handler: () => {

              //this is function go to  GPS setting
              this.appVersion.getVersionNumber(function (version) {
                              
                          });
            }
          }
        ]
      });
      this.alert.present();
    }
}
