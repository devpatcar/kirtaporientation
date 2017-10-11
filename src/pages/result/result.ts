import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Result } from '../compete/compete';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  map: any;
  results:Array<Result> = new Array<Result>();
  currentName:string;  
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');     
    this.storage.get('results').then((val) => {
      this.results = val;    
      this.loadMap();             
    }); 
    
  }
  resetResults(){
    const alert = this.alertCtrl.create({
      title: 'Reset results',
      message: 'Do you want to reset results?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.storage.clear();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  reloadMap(result){
    let latLng = new google.maps.LatLng(result.markers[0].lat, result.markers[0].lng);
      this.currentName = result.name;     
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          
          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          this.setUpMarkers(result.markers,this.map);
                     
          var flightPlanCoordinates = result.runningCords;
          var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
  
          flightPath.setMap(this.map);
    
     }
  
  loadMap(){
        
    let latLng = new google.maps.LatLng(this.results[0].markers[0].lat, this.results[0].markers[0].lng);
    this.currentName = this.results[0].name;    
   
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          
          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          this.setUpMarkers(this.results[0].markers,this.map);
                     
          var flightPlanCoordinates = this.results[0].runningCords;
          var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
  
          flightPath.setMap(this.map);
    
     }
  setUpMarkers(markers, map){   
    for (var index = 0; index < markers.length; index++) {     
     new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(markers[index].lat, markers[index].lng),
      draggable: false 
    });  

  }
  }
}