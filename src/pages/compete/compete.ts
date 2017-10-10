import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {SimpleTimer} from 'ng2-simple-timer';

/**
 * Generated class for the CompetePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-compete',
  templateUrl: 'compete.html',
})
export class CompetePage {
  course:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers:any = []; 
  saveMarkers:any = []; 
  private _db: any;
  private _coursesRef: any;
  counter = 0;   

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private st: SimpleTimer) {
    this.course = this.navParams.data; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetePage');
    this.loadMap();  
    this.st.newTimer('1sec',1);
    this.subscribeTimer();
  } 
  subscribeTimer(){
    this.st.subscribe('1sec', () => this.timercallback());     
  }
  timercallback() {
		this.counter++;
	}
  loadMap(){
    
    this.geolocation.getCurrentPosition().then((position) => {
          let that = this;          
           let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
           let mapOptions = {
             center: latLng,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           }
      
           this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
           this.setUpMarkers(this.course.markers,this.map);
           
         }, (err) => {
           console.log(err);
         });
    
     }
  setUpMarkers(markers, map){   
    for (var index = 0; index < markers.length; index++) { 
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(markers[index].lat, markers[index].lng),
      draggable: true 
    });
   
    this.markers.push(marker);

    let content = "<h4>Kontroll "+this.markers.length+"</h4>";         
   
    this.addInfoWindow(marker, content); 
    }    
  }
  addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);       
     });
     
    
   }
}

