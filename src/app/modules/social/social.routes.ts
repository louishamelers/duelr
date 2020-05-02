import {Routes} from '@angular/router';
import {socialRoutesNames} from './social.routes.names';
import {ChatComponent} from './chat/chat.component';
import {OverviewComponent} from './overview/overview.component';
import {PlaygroupComponent} from './playgroup/playgroup.component';
import {HomePageComponent} from '../home/page/home-page.component';
import {AuthGuard} from '../../core/guards/auth.guard';

export const SOCIAL_ROUTES: Routes = [
  {path: socialRoutesNames.OVERVIEW, component: OverviewComponent, canActivate: [AuthGuard]},
  {path: socialRoutesNames.PLAYGROUP + '/:playgroupId', component: PlaygroupComponent, canActivate: [AuthGuard]},
  {path: ':chatId', component: ChatComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: socialRoutesNames.OVERVIEW, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
