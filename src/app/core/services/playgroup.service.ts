import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user.model';
import {Playgroup} from '../models/playgroup.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaygroupService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  async getPlaygroup(uid: string): Promise<Playgroup> {
    return new Promise(resolve => {
      this.afs.doc<Playgroup>(`playgroups/${uid}`).valueChanges().subscribe(playgroup => {
        resolve(playgroup);
      });
    });
  }

  async join(uid: string) {
    const userData: User = this.auth.user;
    const playgroupData = await this.getPlaygroup('odGw2W0b6DtnFYoUaqJM');

    if (userData.playgroups.indexOf('odGw2W0b6DtnFYoUaqJM') === -1) {
      userData.playgroups.push('odGw2W0b6DtnFYoUaqJM');
    }
    if (playgroupData.players.indexOf(uid) === -1) {
      playgroupData.players.push(uid);
    }

    await this.updateData('odGw2W0b6DtnFYoUaqJM', playgroupData);

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    return userRef.set(userData, {merge: true});
  }

  async create(playgroup: Playgroup) {
    console.log(playgroup);
    const playgroupRef: AngularFirestoreCollection<Playgroup> = this.afs.collection(`playgroups`);
    return playgroupRef.add(playgroup);
  }

  async updateData(uid: string, newPlaygroupData?: Playgroup): Promise<any> {
    const userRef: AngularFirestoreDocument<Playgroup> = this.afs.doc(`playgroups/${uid}`);
    return userRef.set(newPlaygroupData, {merge: true});
  }
}
