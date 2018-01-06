import { Component ,ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { IonicPage, NavController, NavParams, LoadingController,ModalController, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var dataLayer: Array;

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
@ViewChild(Slides) slider: Slides;
  public hours:Array<string>=[];
  public hourlyTmp:Array<number>=[];
  public loading:any;
  public lang:any;
  public location:any
  public tehsilId:any;
  public filterLocation:any;
  public weatherInfo:any;
  public NowTimeT:any;
  public res:any;
  public resetcard:any;
  public state_name:any;
  public tehsil_name:any;
	public wheaterdetailall: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  public weatherfiveday: { status:boolean, msg: string,data: any } = {status:false,msg: 'test',data:''};
  	constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public storage:Storage,
              public weather:WeatherProvider,
              public modalCtrl:ModalController,
              public event: Events,
              public viewCtrl:ViewController
              ) {

            //this.tehsilId = navParams.get('filter_tehsil');
            this.loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            this.loading.present();
             setTimeout(() => {
                  this.loading.dismiss();
                }, 6000);
          }  
    

  ionViewDidLoad() {
   dataLayer : [];
    dataLayer.push({
      'screenName': 'WeatherPage'
    });
    dataLayer.push({'event': 'appScreenView'});
      console.log('ionViewDidLoad WeatherPage');

      this.storage.get('userData').then((userdata) => {
        if (userdata) {
          console.log(userdata);
          this.tehsilId=userdata._user_tehsil;
          this.tehsil_name=userdata.tehsil_name;
          this.state_name=userdata.state_name;
          this.weatherdetail(this.tehsilId);
          this.weatherfivedays(this.tehsilId);
          console.log('ionViewDidLoad WeatherPage');
        }
      });
  }

 weatherdetail(tehsil,filter='no'){

      this.NowTimeT = new Date();
        if (filter=='filter_data') {
          this.resetcard = true
        }
        var tehsil = ( typeof this.tehsilId != 'undefined' )?this.tehsilId:tehsil;
        this.wheaterdetailall.data='';
        this.weather.weatherdetail(tehsil).then((res)=>{
            console.log(res);
            this.wheaterdetailall.data = res.data;
            this.wheaterdetailall.msg = res.msg;
            this.wheaterdetailall.status = res.status;
            this.weatherInfo=this.wheaterdetailall.data;
            this.loading.dismiss();

        }); 
      
  }

  weatherfivedays(location:any){
      if (this.navParams.get('fromFilter')) {
          location = this.navParams.get('filter_tehsil');
      }
      this.weatherfiveday.data='';
      this.hours=[];
      this.hourlyTmp=[];
      this.weather.weatherfivedays(location).then((res)=>{
        console.log(res);
        this.weatherfiveday.data = res.data;
        this.weatherfiveday.msg = res.msg;
        this.weatherfiveday.status = res.status;
        for(let tmp of this.weatherfiveday.data.WeatherHourly.data.WeatherData){
          var dp = new DatePipe("en-US");
          var th = dp.transform(tmp.DateTime, 'j');
          this.hours.push(th);  
          this.hourlyTmp.push(tmp.tempratureValue);
        }
      });
      // this.weather.weatherfivedays(location).map(res => res.json()).subscribe((res) => {
      // this.weatherfiveday.data = res.data;
      // this.weatherfiveday.msg = res.msg;
      // this.weatherfiveday.status = res.status;

      // //console.log(this.weatherfiveday.data.WeatherHourly.data.WeatherData);
      // for(let tmp of this.weatherfiveday.data.WeatherHourly.data.WeatherData){
      //   var dp = new DatePipe("en-US");
      //   var th = dp.transform(tmp.DateTime, 'j');
      //   //this.hours.push(tmp.DateTime);  
      //   this.hours.push(th);  
      //   this.hourlyTmp.push(tmp.tempratureValue);
      // }
      
      // console.log(this.hours);
      // console.log(this.hourlyTmp);
      // //console.log(JSON.stringify(this.weatherfiveday.data.WeatherData));

      // }, (err) => {
      // // Unable to log in
      // console.log(err);
      // });
  }

  ResetData(){
    this.navCtrl.push('wheaterdetailall');
  }




  weatherget(tehsil){
    //console.log(tehsil);
    this.weatherdetail(tehsil);
    this.weatherfivedays(tehsil);
  }
  slideChanged(index){
    console.log('---------');
  }
  slides(tehsil_name){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Weather',
       'appEventAction': 'Filter',
       'appEventLabel': ' Scrolled -'+tehsil_name
     });
     dataLayer.push({'event': 'appEvent'});

  }
  openFilter(){
     dataLayer : [];
      dataLayer.push({
       'appEventCategory': 'Weather',
       'appEventAction': 'Filter',
       'appEventLabel': ' Changed Location'
     });
     dataLayer.push({'event': 'appEvent'});

    let modal = this.modalCtrl.create('FilterLocationPage');
    modal.present();
    modal.onDidDismiss((popoverData) => {
      console.log(popoverData)
      if (popoverData.data!="") {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.tehsilId = popoverData.data;
        this.weatherdetail(popoverData.data,'filter_data');
        this.weatherfivedays(popoverData.data);
       // this.navCtrl.push(WeatherPage,{filter_tehsil:popoverData.data, fromFilter:true})..then(() => {
        /*const index = this.viewCtrl.index;
        this.navCtrl.remove(index);*/
 // });; 
      }
    });
  }


  onSlideChanged(){
      var sindex = this.slider.getActiveIndex()-1;
      var tasilId=this.wheaterdetailall.data[sindex].tehsil_id;
      console.log("Slider index for"+sindex);
      console.log(this.wheaterdetailall.data[sindex].tehsil_id);
        this.weatherfivedays(tasilId);
  }
  gotoWeatherPage(){
    this.navCtrl.push(WeatherPage);
  }

//----------------  Chart  --------------------


  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: '#eaefda',
      borderColor: '#4a4b4c',
      pointBackgroundColor: '#649305',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
   ]
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  
//--------------- chat end ----------


}
