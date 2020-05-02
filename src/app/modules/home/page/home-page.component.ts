import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {PlaygroupService} from '../../../core/services/playgroup.service';
import {ChatService} from '../../../core/services/chat.service';
import {socialRoutesNames} from '../../social/social.routes.names';
import {emptyPlaygroup} from '../../../core/models/playgroup.model';

@Component({
  selector: 'app-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
              private cs: ChatService,
              public auth: AuthService,
              private playgroupService: PlaygroupService) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/user/register']);
  }

  chat() {
    this.router.navigate([socialRoutesNames.ROOT, 'iq4DXjZmNoplvLFJFPh7']);
  }

  createChat() {
    this.cs.create();
  }

  createPlaygroup() {
    this.playgroupService.create(emptyPlaygroup);
}
}
