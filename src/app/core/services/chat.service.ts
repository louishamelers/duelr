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
import {Playgroup} from '../models/playgroup.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  private static getStyleForUser(uid: string): any {
    let color: string = localStorage.getItem(`chatColor: ${uid}`);
    if (color == null) {
      color = Math.floor(Math.random() * 16777215).toString(16);
      localStorage.setItem(`chatColor: ${uid}`, color);
    }
    return {color: `#${color}`};
  }

  get(chatId): Observable<Chat> {
    return this.afs
      .collection(config.firebaseRoutes.chats)
      .doc<Chat>(chatId)
      .valueChanges();
  }

  get chatActiveTimeStamps(): Map<string, number> {
    const raw = localStorage.getItem('chat-active-timestamps');
    if (raw == null) {
      return new Map<string, number>();
    }
    return new Map(JSON.parse(raw));
  }

  set chatActiveTimeStamps(timeStamps: Map<string, number>) {
    localStorage.setItem('chat-active-timestamps', JSON.stringify([...timeStamps]));
  }

  // creates a chat with the id of currently signed in user
  async create() {
    const {uid} = this.auth.user;

    const data: Chat = emptyChat;
    data.chatName = 'lekker';

    const docRef = await this.afs.collection(config.firebaseRoutes.chats).add(data);

    return this.router.navigate([socialRoutesNames.ROOT, docRef.id]);
  }

  async sendMessage(chatId, content) {
    const {uid} = await this.auth.user;

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

  joinUsers(chat$: Observable<any>): Observable<any> {
    let chat;
    const joinKeys: { [id: string]: any } = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map((message: Message) => message.uid)));

        // Firestore User Doc Reads
        const userDocs: Observable<User>[] = uids.map(u =>
          this.afs.doc<User>(`${config.firebaseRoutes.players}/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(user => {
          const uid = (user as User).uid;
          joinKeys[uid] = {...user, style: ChatService.getStyleForUser(uid)};
        });
        chat.messages = chat.messages.map(message => {
          return {...message, user: joinKeys[message.uid]};
        });

        return chat;
      })
    );
  }

  myChats(): Observable<string[]> { // only gets chats from playgroups right now
    return this.auth.user$.pipe(
      switchMap(user => {
        const uids = Array.from(new Set(user.playgroups.map((message: string) => message)));

        const playgroupDocs: Observable<Playgroup>[] = uids.map(groupId =>
          this.afs.doc<Playgroup>(`${config.firebaseRoutes.playGroups}/${groupId}`).valueChanges()
        );

        return playgroupDocs.length ? combineLatest(playgroupDocs) : of([]);
      }),
      map(playGroups => {
        const chatIds: string[] = [];
        playGroups.forEach(playGroup => chatIds.push(playGroup.chat));
        return chatIds;
      })
    );
  }
}
