import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {PlaygroupService} from '../../../core/services/playgroup.service';
import {ChatService} from '../../../core/services/chat.service';
import {socialRoutesNames} from '../../social/social.routes.names';

@Component({
  selector: 'app-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
              private cs: ChatService,
              private auth: AuthService,
              private playgroupService: PlaygroupService) { }

  ngOnInit(): void {
  }

  go() {
    this.router.navigate(['/user/register']);
  }

  do() {
    this.router.navigate([socialRoutesNames.ROOT, 'IDj6DKinCm1bK73xvnHo']);
  }

  tan() {
    this.cs.create();
  }
}
