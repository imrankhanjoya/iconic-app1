import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, PopoverController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  public userDisplayName:any;
  public userState:any;
  public userDict:any;
  public userPhome:any;
  public userDictname:any;
  public userStateName: any;
  public userId: any;
  public base64Image: string ='assets/img/appicon.png';
  public userlogin:{display_name:string,phone:string,userDict:any,userState:any,userDictName:any, userStateName:any}={display_name:'',phone:'',userDict:'',userState:'',userDictName:'', userStateName:''};
  

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
    public camera: Camera,public storage:Storage, public popoverCtrl: PopoverController,public user: User,
    public loadingCtrl: LoadingController) {

    
    storage.get('userData').then((userlogin) => {

      this.userId = userlogin.ID;
      this.userlogin.display_name = userlogin.display_name;
      this.userlogin.phone = userlogin.user_login;
      this.userlogin.userState = userlogin._user_state;
      this.userlogin.userDict = userlogin._user_state;
      this.userlogin.userDictName = userlogin.district_name;
      this.userlogin.userStateName = userlogin.state_name;
      console.log(userlogin);
    });
    
    if (this.base64Image=='') {
        this.base64Image='assets/img/appicon.png';
    }

    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
  */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
  newpassword(){
      this.navCtrl.push('ItemDetailPage');

  }
  openPageWithP(page) {
    console.log(page)
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push('SettingsPage',{pTitle:page});
    
  }
  editcrops() {
    this.navCtrl.push('CropsuodatePage');
  }
  uploadeImg(){
    let popover = this.popoverCtrl.create('UploadImagePage');
     popover.present({
     });
     popover.onDidDismiss((popoverData) => {
      console.log(popoverData);
        if(popoverData=='camera'){
            this.camera.getPicture({
             sourceType: this.camera.PictureSourceType.CAMERA,
             destinationType: this.camera.DestinationType.DATA_URL
            }).then((imageData) => {
              this.base64Image = 'data:image/jpeg;base64,'+imageData;
              console.log('=========data:image/jpeg;base64,'+imageData);
             this.updateProImg(imageData);
             }, (err) => {
              console.log(err);
            });
        }
        if(popoverData=='gallery'){
            this.camera.getPicture({
             sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
             destinationType: this.camera.DestinationType.DATA_URL
            }).then((imageData) => {
              this.base64Image = 'data:image/jpeg;base64,'+imageData;
              console.log('=========data:image/jpeg;base64,'+imageData);
             this.updateProImg(imageData);
             }, (err) => {
              console.log(err);
            });
        }
     });
  }
  updateProImg(image){
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
     });
     loading.present();
     this.user.userUpdateProImg(this.userId,image).map(res => res.json()).subscribe((resp) => {
      loading.dismiss();
     }, (err) => {
      loading.dismiss();
    });
   }
}
