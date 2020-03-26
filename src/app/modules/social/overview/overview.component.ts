import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  chatIds: string[];

  constructor(private cs: ChatService) { }

  ngOnInit(): void {
    this.cs.myChats().subscribe(chatIds => {
      this.chatIds = chatIds;
    });
  }

}
