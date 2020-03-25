import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {userRoutesNames} from './modules/user/user.routes.names';
import {homeRoutesNames} from './modules/home/home.routes.names';
import {HomePageComponent} from './modules/home/page/home-page.component';
import {socialRoutesNames} from './modules/social/social.routes.names';

export const ROUTES: Routes = [
  {path: homeRoutesNames.ROOT, component: HomePageComponent},
  {path: userRoutesNames.ROOT, loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: socialRoutesNames.ROOT, loadChildren: () => import('./modules/social/social.module').then(m => m.SocialModule)},
  {path: 'dev', loadChildren: () => import('./modules/dev/dev.module').then(m => m.DevModule)},
  {path: '404', component: NotFoundComponent, pathMatch: 'full'},
  {path: '', redirectTo: homeRoutesNames.ROOT, pathMatch: 'full'},
  {path: '**', redirectTo: '404'}
];
