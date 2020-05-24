import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {socialRoutesNames} from '../social.routes.names';
import {Type} from '../../../core/models/chat.model';
import {BannerService} from '../../../core/services/banner.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  chatTypes = Type;
  socialRoutes = socialRoutesNames;
  chats$: Observable<any[]>;

  constructor(private cs: ChatService,
              private bannerService: BannerService) {
  }

  ngOnInit(): void {
    this.bannerService.addBanner({
      type: 'info',
      title: 'Some information',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est orci, auctor quis mattis.',
      onClick: index => console.log('todo...')
    });
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
