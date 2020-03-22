import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {PlaygroupService} from '../../../core/services/playgroup.service';

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
        this.valid = next === undefined;
        this.working = false;
      });
    }
  }

  submitData() {
    this.auth.setPlayerName(this.playerName).then(res => {
        this.playgroupService.join(this.auth.user.uid).then(lekker => {
          // this.router.navigate(['/']);
        });
    },
      err => {
        console.log(err.message);
      });
  }

}
