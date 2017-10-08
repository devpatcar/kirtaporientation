import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { CoursePage} from '../course/course';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {  
  public courses: any[] = [];
  private _db: any;
  private _coursesRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) { 
    let that = this;   
    this._db = firebase.database().ref('/');
    this._coursesRef = firebase.database().ref('courses');   
    this._coursesRef.on("child_added", function(snapshot, prevChildKey) {      
      var data = snapshot.val(); 
      that.courses.push(data); 
    });   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
 
  createCourse(){
    this.navCtrl.push(CoursePage);
  }

  logOut(){
    firebase.auth().signOut();
  }

}
