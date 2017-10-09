import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReplaySubject} from 'rxjs/ReplaySubject';
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
  public course = {name:"", distance:0};   
  private _courses$: any;
  private _db: any;
  private _coursesRef: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._db = firebase.database().ref('/');
    this._coursesRef = firebase.database().ref('courses');
    //this._todosRef.on('child_added', this.handleData, this);
    this._courses$ = new ReplaySubject();
    
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
