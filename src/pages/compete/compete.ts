import { Component} from '@angular/core';
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
  map: any;
  result:Result = new Result; 
  saveMarkers:any = [];   
  counter = 0;  
  marker:any; 
  controls:number;
  timerId: string;
  results:Array<Result> = new Array<Result>();
  isTaken:boolean;
  yourPosition:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private st: SimpleTimer, public alertCtrl: AlertController, private storage: Storage) {
    this.course = this.navParams.data; 
    this.result.markers = [];
    this.result.runningCords = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetePage');
    this.loadMap();  
    this.st.newTimer('1sec',1);
    this.subscribeTimer();
  } 
  subscribeTimer(){
    this.timerId = this.st.subscribe('1sec', () => this.timercallback());     
  }
  timercallback() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.result.runningCords.push({lat:position.coords.latitude, lng:position.coords.longitude});
    });
		this.counter++;
	}
  loadMap(){  
            
      let latLng = new google.maps.LatLng(this.course.markers[0].lat, this.course.markers[0].lng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.setUpMarkers(this.course.markers,this.map);
    
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
              this.isTaken = false;                        
              this.geolocation.getCurrentPosition().then((position) => {
                this.yourPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);  
                if(google.maps.geometry.spherical.computeDistanceBetween(this.yourPosition, this.marker.getPosition()) < 10){
                  this.isTaken = true;
                }
                console.log(this.yourPosition);
                if(this.isTaken){
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
                  this.result.markers.push({lat:this.marker.getPosition().lat(), lng:this.marker.getPosition().lng()});
                  this.result.runningCords.push({lat:this.marker.getPosition().lat(), lng:this.marker.getPosition().lng()});
                  this.result.time = this.counter;
                  this.result.key = this.course.key;
                  this.result.name = this.course.name;
                  this.result.distance = this.course.distance;
                  this.result.completed = completed;
                  if(this.controls == 0){
                    completed = true;
                    this.result.completed = completed;
                    this.st.unsubscribe(this.timerId);
                    this.results.push(this.result);
                    this.storage.set("results", this.results);
                   
                    const alert = this.alertCtrl.create({
                      title: 'Course completed',
                      subTitle: 'Time:' +this.counter +'s',
                      buttons: [{
                        text: 'OK',
                        handler: () => {                      
                          this.navCtrl.pop();
                        }
                      }]
                    });
                    alert.present();                  
                  }
                }
                else{
                  const alert = this.alertCtrl.create({
                    title: 'Failed to take it',
                    subTitle: 'Please, try again when you are closer. '+google.maps.geometry.spherical.computeDistanceBetween(this.yourPosition, this.marker.getPosition())+' m',
                    buttons: [{
                      text: 'OK'                    
                    }]
                  });
                  alert.present();
                }
              });
            }
          }
        ]
      });
      alert.present();
    });    
    }    
  }  
}
export class Result{ 
    key:string;
    markers:any[];
    completed:boolean;
    time:number;
    name:string;
    distance:number;
    runningCords:any[];  
}
