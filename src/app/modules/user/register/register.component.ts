import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  password: string;
  errormessage: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.errormessage = '';
    // this.auth.emailLogin(this.password, this.email).then(res => {
    //
    // })
    // this.auth.setup(this.password)
    //   .then(() => {
    //     this.router.navigate(['write']);
    //   })
    //   .catch(reason => {
    //     this.password = '';
    //     this.errormessage = reason;
    //   });
  }

}
