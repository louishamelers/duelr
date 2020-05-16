import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent implements OnInit {

  chatBoi;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  create() {
    this.chatService.chatUser(this.chatBoi);
  }

}
