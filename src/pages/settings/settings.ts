import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  private todo : FormGroup;
  public loc:{state:string,district:string} = {state:'',district:''};

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public translate: TranslateService) {

    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });


  }

 
  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
logForm(){
    console.log(this.todo.value)
  }
}
