import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CoursePage } from '../pages/course/course';
import { AdminPage } from '../pages/admin/admin';
import { EditcoursePage} from '../pages/editcourse/editcourse';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

firebase.initializeApp({
  apiKey: "AIzaSyADbRIKb5BJHYwORXO2FWjy4RW4Xl4CRDE",
  authDomain: "kirtaporientaion.firebaseapp.com",
  databaseURL: "https://kirtaporientaion.firebaseio.com",
  storageBucket: "kirtaporientaion.appspot.com",
  messagingSenderId: "688869986215"
});

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CoursePage,
    AdminPage,
    EditcoursePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CoursePage,
    AdminPage,
    EditcoursePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
