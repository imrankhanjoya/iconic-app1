import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the CallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallProvider {

  constructor(public http: Http, private callNumber: CallNumber) {
    console.log('Hello CallProvider Provider');
  }

  makeCall(){
    console.log('----call---');
    this.callNumber.callNumber('9694967744', true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
  }

}
