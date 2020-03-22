import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { first, map, switchMap, tap} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {socialRoutesNames} from '../../modules/social/social.routes.names';
import {firestore} from 'firebase';
import {Observable, of} from 'rxjs';
import {Chat, Message} from '../models/chat.model';
import {Playgroup} from '../models/playgroup.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  get(chatId): Observable<Chat> {
    return this.afs
      .collection('chats')
      .doc<Chat>(chatId)
      .valueChanges();
  }

  // creates a chat with the id of currently signed in user
  async create() {
    const { uid } = this.auth.user;

    const data: Chat = {
      id: uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate([socialRoutesNames.ROOT, docRef.id]);
  }

  async sendMessage(chatId, content) {
    const { uid } = await this.auth.user;

    const message: Message = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(message)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys: {[id: string]: any} = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));

        // Firestore User Doc Reads
        const userDocs: Observable<User>[] = uids.map(u =>
          this.afs.doc<User>(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(user => {
          joinKeys[(user as User).uid] = user;
        });
        chat.messages = chat.messages.map(message => {
          console.log({ ...message, user: joinKeys[message.uid] });
          return { ...message, user: joinKeys[message.uid] };
        });

        return chat;
      })
    );
  }
}
