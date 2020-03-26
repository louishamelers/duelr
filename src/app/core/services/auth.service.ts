import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`${config.firebaseRoutes.players}/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user$.subscribe(next => this.user = next);
  }

  user$: Observable<User>;
  user: User;

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user.uid, {email: credential.user.email});
  }

  async facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user.uid, {email: credential.user.email});
  }

  async emailRegister(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user.uid, {email: credential.user.email});
  }

  async emailLogin(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  // playerName management

  checkPlayerName(playerName: string): AngularFirestoreDocument {
    playerName = playerName.toLowerCase();
    return this.afs.doc(`${config.firebaseRoutes.playerNames}/${playerName}`);
  }

  async setPlayerName(playerName: string): Promise<any> {
    if (this.user.playerName !== undefined) {
      await this.afs.doc(`/${config.firebaseRoutes.playerNames}/${this.user.playerName}`).delete();
    }
    await this.afs.doc(`/${config.firebaseRoutes.playerNames}/${playerName}`).set({uid: this.user.uid});
    return this.updateUserData(this.user.uid, {playerName});
  }

  // user info management
  private updateUserData(uid: string, newUserData?: User): Promise<any> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${config.firebaseRoutes.players}/${uid}`);
    newUserData.uid = uid;
    return userRef.set(newUserData, {merge: true});
  }
}
