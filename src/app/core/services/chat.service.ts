import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {socialRoutesNames} from '../../modules/social/social.routes.names';
import {firestore} from 'firebase';
import {Chat, emptyChat, Message} from '../models/chat.model';
import {User} from '../models/user.model';
import {config} from '../config';

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
      .collection(config.firebaseRoutes.chats)
      .doc<Chat>(chatId)
      .valueChanges();
  }

  // creates a chat with the id of currently signed in user
  async create() {
    const { uid } = this.auth.user;

    const data: Chat = emptyChat;
    data.chatName = 'lekker';

    const docRef = await this.afs.collection(config.firebaseRoutes.chats).add(data);

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
      const ref = this.afs.collection(config.firebaseRoutes.chats).doc(chatId);
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
          this.afs.doc<User>(`${config.firebaseRoutes.players}/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(user => {
          const uid = (user as User).uid;
          joinKeys[uid] = {...user, style: this.getStyleForUser(uid)};
        });
        chat.messages = chat.messages.map(message => {
          return { ...message, user: joinKeys[message.uid] };
        });

        return chat;
      })
    );
  }

  getStyleForUser(uid: string): any {
    let color: string = localStorage.getItem(`chatColor: ${uid}`);
    console.log(color);
    if (color == null) {
      color = Math.floor(Math.random() * 16777215).toString(16);
      localStorage.setItem(`chatColor: ${uid}`, color);
    }
    return {color: `#${color}`};
  }
}
