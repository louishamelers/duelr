import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

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
      this.router.navigate(['/']);
    },
      err => {
        console.log(err.message);
      });
  }

}
