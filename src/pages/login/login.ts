import { Component } from '@angular/core';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder
  ) {
      this.loginForm = formBuilder.group({
        email: ['', 
        Validators.compose([Validators.required])],
        password: ['', 
        Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss();
      }, error => {
        this.loading.dismiss();
        alert(error);
      });
      
     
    }
  }

}
