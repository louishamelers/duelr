import { Component } from '@angular/core';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'duelr';

  constructor(public auth: AuthService) {
  }
}
