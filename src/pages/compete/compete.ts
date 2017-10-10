import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {SimpleTimer} from 'ng2-simple-timer';
import { Storage } from '@ionic/storage';

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
  result:any = []; 
  saveMarkers:any = [];   
  counter = 0;  
  marker:any; 
  controls:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private st: SimpleTimer, public alertCtrl: AlertController, private storage: Storage) {
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
    this.controls= index +1;
    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(markers[index].lat, markers[index].lng),
      draggable: false 
    });   
   
    google.maps.event.addListener(marker, 'click', () => {    
      this.marker = marker;  
      const alert = this.alertCtrl.create({
        title: "Take control",
        message: 'Do you want take this?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Take',
            handler: () => {
              this.controls--;
              this.marker.setMap(null);              
              new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(this.marker.getPosition().lat(), this.marker.getPosition().lng()),
                draggable: false,
                click:false,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10
                } 
              });
              let completed = false;
              console.log(this.controls);
              if(this.controls == 0){
                completed = true;
              }
              this.result.push({lat:this.marker.getPosition().lat(), lng:this.marker.getPosition().lng(), time:this.counter});
              this.storage.set(this.course.key, this.result);
            }
          }
        ]
      });
      alert.present();
    });    
    }    
  }  
}

