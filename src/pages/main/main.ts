import { ProfilePage } from './../profile/profile';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  @ViewChild(Nav) nav: Nav;

 rootPage = HomePage;

  pages: Array<{title: string, component: any}>;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    

    this.pages = [
      { title: 'Homepage', component: HomePage},
      { title: 'profile', component: ProfilePage }
     
    ];

    // this.homePage = HomePage;
    // this.profilePage = ProfilePage

   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
