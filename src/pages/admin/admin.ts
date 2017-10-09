import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) { 
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
    console.log('ionViewDidLoad AdminPage');
  }
 
  createCourse(){
    this.navCtrl.push(CoursePage);
  }

  removeCourse(course){      
    const alert = this.alertCtrl.create({
      title: 'Confirm delete',     
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Remove',
          handler: () => {            
            this._coursesRef.child(course.key).remove();    
            let index = this.courses.indexOf(course);
            
                   if(index > -1){
                       this.courses.splice(index, 1);
                   }       
          }
        }
      ]
    });
    alert.present();
  }

  editCourse(){
    
  }

  logOut(){
    firebase.auth().signOut();
  }

}
