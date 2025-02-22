import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {userRoutesNames} from '../../modules/user/user.routes.names';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(next, state): Observable<boolean> {
    return  this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate([userRoutesNames.ROOT]);
        }
      })
    );
  }

}
