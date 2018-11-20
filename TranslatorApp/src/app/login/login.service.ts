import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  authState: Observable<{} | null>;
  user: Observable<{} | null>;
  userUid: string;
  loggedIn: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.user = this.afAuth.authState
    .switchMap((user) => {
      if (user) {
        this.userUid = user.uid;
        console.log('SWITCHMAP');
        console.log(user);
        console.log('SWITCHMAP');
        this.loggedIn = true;
        return this.db.object(`users/${user.uid}`).update({email: user.email}).then( () => {
          return this.db.object(`users/${user.uid}`).valueChanges();
        }).catch( (error) => {
          console.log('ERROR UPDATING USER EMAIL');
          console.log(error);
          console.log('ERROR UPDATING USER EMAIL');
        });
      } else {
        return Observable.of(null);
      }
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        const createdAt = firebase.database.ServerValue.TIMESTAMP;
        console.log('CREATED AT');
        console.log(createdAt);
        console.log('CREATED AT');
        const sessionKey = this.db.database
                        .ref(`sessions`)
                        .push({
                          userUid: auth.user.uid
                        }).key;

        const sessionPayload: any = {
          createdAt: createdAt,
          userUid: auth.user.uid,
          currentSessionKey: sessionKey,
        };

        const sessionPayloads: any = {};
        sessionPayloads[`currentSession/${auth.user.uid}`] = sessionPayload;
        sessionPayloads[`users/${auth.user.uid}/sessions/${sessionKey}`] = {'createdAt': createdAt};

        this.loggedIn = true;
        setTimeout(() => {
          console.log("Max session time-limit exceeded...");
          this.signOut();
        }, 300000);
        return this.db.database.ref().update(sessionPayloads);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut() {
    console.log("Signing out...");
    this.afAuth.auth.signOut();
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  getAdmins(){return this.db.list(`/admins`)
  .snapshotChanges()
  .pipe(map(items => {
    return items.map(a => {
      const data = a.payload.val();
      const key = a.payload.key;
      return {key, data};
    });
  }));}
}
