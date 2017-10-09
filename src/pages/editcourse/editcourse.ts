import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditcoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-editcourse',
  templateUrl: 'editcourse.html',
})
export class EditcoursePage {
  course:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.course = this.navParams.data;
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcoursePage');
    this.loadMap();
  }

  loadMap(){
    
       let latLng = new google.maps.LatLng(-34.9290, 138.6010);
    
       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
     }
}
