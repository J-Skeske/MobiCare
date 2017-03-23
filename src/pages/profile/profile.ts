
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;

  constructor(public nav: NavController, public profileData: ProfileData,
    public authData: AuthData, private alertCtrl: AlertController) {
    this.nav = nav;
    this.profileData = profileData;

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }
  //logout 
  logOut(): void {
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }
  //a function for 
  updateName(): void {
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate): void {
    this.profileData.updateDOB(birthDate);
  }
  //update email with confirm password to make sure its the person 
  updateEmail(): void {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',

        },
        {
          name: 'password',
          placeholder: 'confirm your password',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }


  //update password with confirm ResetPasswordPage
  updatePassword() {
   
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'newPassword2',
          placeholder: 'confrim new password',
          type: 'password'
        },
        {
          name: 'password',
          placeholder: 'confirm with old password',
          type: 'password'

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            
            if (data.newPassword == data.newPassword2) {
              this.profileData.updatePassword(data.newPassword, data.password);
              console.log('password changed');
            }else{alert2.present();}

          }
        }
      ]
    });
    let alert2 = this.alertCtrl.create({
      title: 'passwords did not match',
      buttons: [{
                    text: 'Exit',
                    handler: () => {
                         console.log('password do not match');       
                    }
                
                
                }]
      
    });
    

    alert.present();


  }



}