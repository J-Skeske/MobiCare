import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native/';
import { Splashscreen } from 'ionic-native/';

import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyBT0DaGypT19XDgJDuT6ql7oRcND6RXZWg",
      authDomain: "mobicare-5910d.firebaseapp.com",
      databaseURL: "https://mobicare-5910d.firebaseio.com",
      storageBucket: "mobicare-5910d.appspot.com",
      messagingSenderId: "655853452935"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = MainPage;
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}