import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Result } from '../compete/compete';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  result:Array<Result> = new Array<Result>();

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
    this.storage.get('results').then((val) => {
      this.result = val;  
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

}
