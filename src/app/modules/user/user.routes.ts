import {Routes} from '@angular/router';
import {userRoutesNames} from './user.routes.names';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FirstUseComponent} from './first-use/first-use.component';
import {HomePageComponent} from '../home/page/home-page.component';
import {AuthGuard} from '../../core/guards/auth.guard';

export const USER_ROUTES: Routes = [
  {path: userRoutesNames.LOGIN, component: LoginComponent},
  {path: userRoutesNames.REGISTER, component: RegisterComponent},
  {path: userRoutesNames.FIRST_USE, component: FirstUseComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: userRoutesNames.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
