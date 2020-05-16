import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user.model';
import {Playgroup} from '../models/playgroup.model';
import {AuthService} from './auth.service';
import {first} from 'rxjs/operators';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class PlaygroupService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore
  ) { }

  async getPlaygroup(uid: string): Promise<Playgroup> {
    return this.afs.doc<Playgroup>(`${config.firebaseRoutes.playGroups}/${uid}`).valueChanges().pipe(first()).toPromise();
  }

  async join(uid: string, pgUid: string) {
    const userData: User = this.auth.user;
    const playgroupData = await this.getPlaygroup(pgUid);

    if (userData.playgroups === undefined) {
      userData.playgroups = [pgUid];
    } else if (userData.playgroups.indexOf(pgUid) === -1) {
      userData.playgroups.push(pgUid);
    }
    if (playgroupData.players === undefined) {
      playgroupData.players = [uid];
    } else if (playgroupData.players.indexOf(uid) === -1) {
      playgroupData.players.push(uid);
    }

    await this.updateData(pgUid, playgroupData);

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${config.firebaseRoutes.players}/${uid}`);
    return userRef.set(userData, {merge: true});
  }

  async create(playgroup: Playgroup) {
    const playgroupRef: AngularFirestoreCollection<Playgroup> = this.afs.collection(`${config.firebaseRoutes.playGroups}`);
    return playgroupRef.add(playgroup);
  }

  async updateData(uid: string, newPlaygroupData?: Playgroup): Promise<any> {
    const userRef: AngularFirestoreDocument<Playgroup> = this.afs.doc(`${config.firebaseRoutes.playGroups}/${uid}`);
    return userRef.set(newPlaygroupData, {merge: true});
  }
}
