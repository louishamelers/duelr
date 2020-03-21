import {Routes} from '@angular/router';
import {userRoutesNames} from './user.routes.names';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RequiredComponent} from './required/required.component';

export const USER_ROUTES: Routes = [
  {path: userRoutesNames.LOGIN, component: LoginComponent},
  {path: userRoutesNames.REGISTER, component: RegisterComponent},
  {path: userRoutesNames.REQUIRED, component: RequiredComponent},
  {path: '', redirectTo: userRoutesNames.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
