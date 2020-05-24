import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {emptyUser, User} from 'src/app/core/models/user.model';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import {combineLatest, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {config} from '../config';
import {BannerService} from './banner.service';
import {emailSent, emailVerified, verifyEmail} from '../../../assets/resources/banners';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private bannerService: BannerService) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`${config.firebaseRoutes.players}/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    combineLatest(this.afAuth.authState, this.user$).subscribe(([afUser, afsUser]) => {
      if (afUser.emailVerified && !afsUser.notifications.includes('emailVerified')) {
        this.bannerService.addBanner({
          ...emailVerified,
          onClose: () => {
            afsUser.notifications.push('emailVerified');
            this.updateUserData(afUser.uid, afsUser);
          }
        });
      } else if (!afUser.emailVerified) {
        this.bannerService.addBanner({
          ...verifyEmail,
          onClick: (index) => {
            this.afAuth.auth.currentUser.sendEmailVerification().then(_ => {
              const bannerContent = Object.assign({}, emailSent);
              bannerContent.text += afUser.email;
              this.bannerService.addBanner(bannerContent);
            });
            this.bannerService.closeBanner(undefined, index);
          }
        });
      }
    });
    this.user$.subscribe(next => this.user = next);
  }

  user$: Observable<User>;
  user: User;

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user.uid, {...emptyUser, email: credential.user.email});
  }

  async facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user.uid, {...emptyUser, email: credential.user.email});
  }

  async emailRegister(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user.uid, {...emptyUser, email: credential.user.email});
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
  private updateUserData(uid: string, userData?: User): Promise<any> {
    console.log(userData);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${config.firebaseRoutes.players}/${uid}`);
    userData.uid = uid;
    return userRef.set(userData, {merge: true});
  }
}
