import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AdminPage} from '../admin/admin';

/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  public course = {name:"", distance:0, markers:[]};    
  private _db: any;
  private _coursesRef: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._db = firebase.database().ref('/');
    this._coursesRef = firebase.database().ref('courses');   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }

  createCourse(){
    if(this.course.name != ""){      
      this._coursesRef.push(this.course).key;
      this.course.name = "";
      this.navCtrl.push(AdminPage);
    }    
  }
}
