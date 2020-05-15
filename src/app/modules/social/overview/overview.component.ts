import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  chats$: Observable<any[]>;

  constructor(private cs: ChatService) {
  }

  ngOnInit(): void {
    this.chats$ = this.cs.myChats().pipe(
      switchMap(chatIds => {
        const chatSources: Observable<any>[] = chatIds.map(chatId => {
          const chatSource = this.cs.get(chatId).pipe(
            map(chat => {
              let unread = 0;
              const lastTime = this.cs.chatActiveTimeStamps.get(chatId);

              while (chat.messages[chat.messages.length - (1 + unread)] !== undefined &&
                chat.messages[chat.messages.length - (1 + unread)].createdAt > lastTime) {
                unread++;
              }

              return {chatId, unread, ...chat};
            }));
          return this.cs.joinUsers(chatSource);
        });

        return chatSources.length ? combineLatest(chatSources) : of([]);
      }));
  }

}
