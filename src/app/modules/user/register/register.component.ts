import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {userRoutesNames} from '../user.routes.names';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.passwordCapitalValidator,
    this.passwordNumberValidator
  ]);

  registerForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordControl
  });

  matcher = new MyErrorStateMatcher();
  fireError = '';
  working = false;
  hide = true;

  passwordCapitalValidator(c: FormControl) {
    const regExp = new RegExp('.*[A-Z].*');

    return regExp.test(c.value) ? null : {
      capitalValid: {
        valid: false
      }
    };
  }

  passwordNumberValidator(c: FormControl) {
    const regExp = new RegExp('.*[0-9].*');

    return regExp.test(c.value) ? null : {
      numberValid: {
        valid: false
      }
    };
  }

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(next => {
      this.fireError = '';
    });
  }

  googleRegister() {
    this.auth.googleSignIn().then(res => {
      this.afterRegister();
    });
  }

  facebookRegister() {
    this.auth.facebookSignIn().then(res => {
      this.afterRegister();
    });
  }

  emailRegister() {
    this.working = true;
    this.fireError = '';
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.auth.emailRegister(email, password).then(res => {
      this.afterRegister();
    },
      err => {
        this.working = false;
        this.fireError = err.message;
      });
  }

  private afterRegister() {
    this.working = false;
    this.router.navigate([userRoutesNames.ROOT, userRoutesNames.FIRSTUSE]);
  }

}
