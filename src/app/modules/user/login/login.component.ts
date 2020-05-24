import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../register/register.component';
import {userRoutesNames} from '../user.routes.names';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordControl = new FormControl('', [
    Validators.required
  ]);

  registerForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordControl
  });

  matcher = new MyErrorStateMatcher();
  fireError = '';
  working = false;
  hide = true;

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.working = true;
    this.fireError = '';
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.auth.emailLogin(email, password).then(res => {
        this.working = false;
        this.router.navigate(['/']);
      },
      err => {
        this.fireError = err.message;
        this.working = false;
      });
  }

}
