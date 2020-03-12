import {Routes} from '@angular/router';
import {userRoutesNames} from './user.routes.names';
import {LoginComponent} from './login/login.component';

export const USER_ROUTES: Routes = [
  {path: userRoutesNames.LOGIN, component: LoginComponent},
  {path: '', redirectTo: userRoutesNames.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
