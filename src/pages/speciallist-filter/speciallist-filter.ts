import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import { MarketproProvider } from '../../providers/marketpro/marketpro';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ExpertsProvider } from '../../providers/experts/experts';

 

@IonicPage()
@Component({
  selector: 'page-speciallist-filter',
  templateUrl: 'speciallist-filter.html',
})
export class SpeciallistFilterPage {

 public speciatist : FormGroup;
	public catDatas: { status:string, msg: string,data: any } = {status:'false',msg: 'test',data:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,
  		public viewCtrl:ViewController,
		public experts:ExpertsProvider,
    	private formBuilder: FormBuilder) {

  		this.speciatist = this.formBuilder.group({
		        SpeciaList: ['']
        });
  }

  ionViewDidLoad() {
  	this.getspeciallist();
    console.log('ionViewDidLoad SpecialistPage');
  }

  filteSpeciatistForm(){
        let data = { 'data': this.speciatist.value };
        this.viewCtrl.dismiss(data);
        
    }

   dismiss(){
        let data = { 'data': '' };
        this.viewCtrl.dismiss(data);
    }

     getspeciallist(){
      this.experts.Cat_list('8').map(res => res.json()).subscribe((res) => {
      this.catDatas.data = res.data;
      this.catDatas.msg = res.msg;
      this.catDatas.status = res.status;
         console.log(this.catDatas);

    });
  }


    filterMarketForm(){
        let data = { 'data': this.SpeciaList.value };
        this.viewCtrl.dismiss(data);
        
    }

}
