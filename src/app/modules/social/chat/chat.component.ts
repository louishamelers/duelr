import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatId: string;
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    const source = this.cs.get(this.chatId);
    this.chat$ = this.cs.joinUsers(source);
  }

  submit() {
    this.chat$.subscribe(next => console.log(next));
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }
}
