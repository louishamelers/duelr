import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {PlaygroupService} from '../../../core/services/playgroup.service';
import {socialRoutesNames} from '../../social/social.routes.names';

@Component({
  selector: 'app-first-use',
  templateUrl: './first-use.component.html',
  styleUrls: ['./first-use.component.scss']
})
export class FirstUseComponent implements OnInit {

  playerName = '';
  valid = false;
  working = false;

  constructor(private auth: AuthService,
              private playgroupService: PlaygroupService,
              private router: Router) { }

  ngOnInit(): void {
  }

  checkPlayerName() {
    this.valid = false;
    if (this.playerName !== '') {
      this.working = true;
      this.auth.checkPlayerName(this.playerName).valueChanges().subscribe(next => {
        console.log(next);
        this.valid = next === undefined;
        this.working = false;
      });
    }
  }

  submitData() {
    this.auth.setPlayerName(this.playerName).then(() =>
      this.router.navigate([socialRoutesNames.ROOT])
    );
  }

}
