import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {first} from 'rxjs/operators';
import {AuthService} from '../../../core/services/auth.service';
import {socialRoutesNames} from '../social.routes.names';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatScroll') chatScroll: ElementRef;

  socialRoutesNames = socialRoutesNames;
  chatId: string;
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    const source = this.cs.get(this.chatId);
    this.chat$ = this.cs.joinUsers(source);
  }

  ngAfterViewInit(): void {
    this.chat$.subscribe(next => {
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

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollToBottom() {
    this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight + 100;
  }
}
