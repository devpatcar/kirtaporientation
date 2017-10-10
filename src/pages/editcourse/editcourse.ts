import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import firebase from 'firebase';

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
  markers:any = []; 
  saveMarkers:any = []; 
  private _db: any;
  private _coursesRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.course = this.navParams.data;  
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcoursePage');
    this.loadMap();    
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
           // This event listener calls addMarker() when the map is clicked.
            google.maps.event.addListener(this.map, 'click', function(event) {
              that.addMarkerOnClick(event.latLng);
            });
         }, (err) => {
           console.log(err);
         });
    
     }
     addMarkerOnClick(location){
      
       let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position: location,
         draggable: true 
       });
      
       this.markers.push(marker);

       let content = "<h4>Kontroll "+this.markers.length+"</h4>";         
      
       this.addInfoWindow(marker, content);      
      
       this.calcLenght();
     }
    
     calcLenght(){
       
      if(this.markers.length > 1){        
        this.course.distance = 0;
        for (var index = 1; index < this.markers.length; index++) {          
          var latlng = new google.maps.LatLng(this.markers[index-1].getPosition().lat(), this.markers[index-1].getPosition().lng());
          var latlngmarker = new google.maps.LatLng(this.markers[index].getPosition().lat(), this.markers[index].getPosition().lng());
          this.course.distance += google.maps.geometry.spherical.computeDistanceBetween(latlng, latlngmarker)/1000;                   
         }           
       }
       this.updateCourse();
     }

     updateCourse(){
      this._db = firebase.database().ref('/');
      this._coursesRef = firebase.database().ref('courses'); 
      this.saveMarkers = [];
      for (var index = 0; index < this.markers.length; index++) {  
        this.saveMarkers.push({lat:this.markers[index].getPosition().lat(),lng: this.markers[index].getPosition().lng()});                          
       }    
      this._coursesRef.child(this.course.key).set({
          name:this.course.name,
          distance:this.course.distance,
          markers:this.saveMarkers         
      }); 
     }

     addMarker(){
      
       let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position: this.map.getCenter(),
         draggable: true 
       });      

       let content = "<h4>Kontroll</h4>";         
      
       this.addInfoWindow(marker, content);

       this.markers.push(marker);

       this.calcLenght();
      
     }
     addInfoWindow(marker, content){
      
       let infoWindow = new google.maps.InfoWindow({
         content: content
       });
      
      google.maps.event.addListener(marker, 'dblclick', () => {
        var index = this.markers.indexOf(marker, 0);
        if (index > -1) {
          this.markers.splice(index, 1);
        }        
        marker.setMap(null);
        this.calcLenght();
      });

       google.maps.event.addListener(marker, 'click', () => {
         infoWindow.open(this.map, marker);
         this.calcLenght();
       });

       google.maps.event.addListener(marker, 'drag', () => {
        this.calcLenght();
      });
      
     }
}
