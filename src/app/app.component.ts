import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { AdminPage } from '../pages/admin/admin';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.rootPage = AdminPage;      
        } else { 
          this.rootPage = HomePage;     
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

