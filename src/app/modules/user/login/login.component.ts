import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  working = false;
  error = '';
  email = '';
  password = '';

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.working = true;
    this.auth.emailLogin(this.email, this.password).then(res => {
        console.log(res);
      },
      err => {
        this.error = err.message;
        this.working = false;
      });
  }

}
