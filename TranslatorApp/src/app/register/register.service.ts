import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Injectable()
export class RegisterService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase) { }

    addNewUser(email, password){
      var errorMessage = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
      setTimeout(() => {this.router.navigate(['/login'])}, 2000);
    }
}
