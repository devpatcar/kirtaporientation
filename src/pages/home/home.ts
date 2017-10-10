import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ResultPage } from '../result/result';
import { CompetePage, Result } from '../compete/compete';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public courses: any[] = [];
  private _db: any;
  private _coursesRef: any;
  result:Array<Result> = new Array<Result>();

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {
    let that = this;   
    this._db = firebase.database().ref('/');
    this._coursesRef = firebase.database().ref('courses');   
    this._coursesRef.on("child_added", function(snapshot, prevChildKey) {      
      var data = snapshot.val();       
      data.key = snapshot.key;      
      that.courses.push(data); 
    }); 
     
  }
  ionViewDidLoad() {
    this.storage.get('results').then((val) => {
      this.result = val;
    }); 
  }
  goToLogin(){
  	this.navCtrl.push(LoginPage)
  }
  results(){
  	this.navCtrl.push(ResultPage)
  }
  itemSelected(course){
    const alert = this.alertCtrl.create({
      title: course.name,
      message: 'Arye ready to start this course?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Start',
          handler: () => {
            this.navCtrl.push(CompetePage, course)
          }
        }
      ]
    });
    alert.present();
  }
}
