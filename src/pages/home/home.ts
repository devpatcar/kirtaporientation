import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ResultPage } from '../result/result';
import { CompetePage } from '../compete/compete';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public courses: any[] = [];
  private _db: any;
  private _coursesRef: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    let that = this;   
    this._db = firebase.database().ref('/');
    this._coursesRef = firebase.database().ref('courses');   
    this._coursesRef.on("child_added", function(snapshot, prevChildKey) {      
      var data = snapshot.val();       
      data.key = snapshot.key;      
      that.courses.push(data); 
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
