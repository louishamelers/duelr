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
            map(chat => ({chatId, ...chat})));
          return this.cs.joinUsers(chatSource);
        });

        return chatSources.length ? combineLatest(chatSources) : of([]);
      }));

    this.chats$.subscribe(chats => console.log(chats));
  }

}
