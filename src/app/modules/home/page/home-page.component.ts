import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {PlaygroupService} from '../../../core/services/playgroup.service';

@Component({
  selector: 'app-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService,
              private playgroupService: PlaygroupService) { }

  ngOnInit(): void {
  }

  go() {
    this.router.navigate(['/user/register']);
  }
}
