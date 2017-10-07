import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityStateProvider } from '../../providers/city-state/city-state';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CropsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crops',
  templateUrl: 'crops.html',
})
export class CropsPage {
  public lang:any;
  public cropList:any;

   public ionicNamedColor: string = '#101c00';
   public tump:boolean = true;
   public temp:boolean = true;
   buttonColor: string = '#dbdbdb';
   peon:string =  '#101c00';
   public shoPage:any;
   public skipDataList: Array<Object>;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public cityStateProvider:CityStateProvider,public storage:Storage) {
    this.shoPage='Kharif';
    this.skipDataList = [];
    this. storage.get('userLang').then((val) => {
      this.lang=val;
      this.getCrops();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CropsPage');
  }

  getCrops() {
    this.cityStateProvider.sendCrop(this.lang).map(res => res.json()).subscribe((resp) => {
    this.cropList=resp.data;
    console.log(this.cropList);
    }, (err) => {
      console.log('my name is khan')
    });
  }


  addValue(e) {
    this.skipDataList.push({key: e});
    console.log(this.cropList);
    if (this.cropList[e].sub_type=='true') {
      this.cropList[e].sub_type='-';
    }else {
      this.cropList[e].sub_type='true';
    }
    //this.storage.set('Kharif',this.skipDataList);
    console.log('--------'+this.skipDataList);
 }
  addEvent(index){
    this.shoPage=index;
    console.log(this.tump);
    if(this.tump && this.shoPage=='Horticulture'){
      this.tump=false;
      this.buttonColor = '#101c00';
      this.peon='#dbdbdb';
    }else if(this.shoPage=='Kharif'){
      this.tump=true;
      this.buttonColor = '#dbdbdb';
      this.peon='#101c00';
    }
  }
  selected(){
    console.log(this.cropList);
    var isSelect=0;
    var selectedList=[];
    for (var i = 0; i < this.cropList.length; i++) {
      if (this.cropList[i].sub_type=='true') {
        selectedList.push(this.cropList[i]);
        isSelect++;
      }
      if (i==this.cropList.length-1) {
        if (isSelect<3) {
          alert('Select Minimum 3')
        }else {
          this.storage.set('userKharif',selectedList);
           alert('Thanks')
        }
      }
    }
  }
}
