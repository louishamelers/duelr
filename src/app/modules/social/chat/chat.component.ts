import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {socialRoutesNames} from '../social.routes.names';
import {Type} from '../../../core/models/chat.model';
import {userRoutesNames} from '../../user/user.routes.names';
import {ScryfallService} from '../../../core/services/scryfall.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatScroll') chatScroll: ElementRef;
  @ViewChild('inputField') inputField: HTMLInputElement;

  socialRoutesNames = socialRoutesNames;
  chatId: string;
  chat$: Observable<any>;
  newMsg: string;
  cardAutofill: string[];

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private scryfallService: ScryfallService
  ) { }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    const source = this.cs.get(this.chatId);
    this.chat$ = this.cs.joinUsers(source);
  }

  ngAfterViewInit(): void {
    this.chat$.subscribe(_ => {
      this.scrollToBottom();
    });
  }

  submit() {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  updateText(element: HTMLInputElement) {
    const match = this.newMsg.match('#[A-Za-z]+');
    if (match) {
      console.log(match);
      this.scryfallService.findCards(match[1]).subscribe(result => this.cardAutofill = result);
    }
  }

  gotoInfo() {
    this.cs.get(this.chatId).subscribe(chat => {
      if (chat.type === Type.GROUP) {
        this.router.navigate(['../', socialRoutesNames.PLAYGROUP, chat.info], {relativeTo: this.route});
      } else if (chat.type === Type.SINGLE) {
        console.log(chat.info);
      }
    });
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollToBottom() {
    this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight + 100;
  }
}
