import {Routes} from '@angular/router';
import {socialRoutesNames} from './social.routes.names';
import {ChatComponent} from './chat/chat.component';
import {OverviewComponent} from './overview/overview.component';
import {PlaygroupComponent} from './playgroup/playgroup.component';

export const SOCIAL_ROUTES: Routes = [
  {path: socialRoutesNames.OVERVIEW, component: OverviewComponent},
  {path: socialRoutesNames.PLAYGROUP + '/:playgroupId', component: PlaygroupComponent},
  {path: ':chatId', component: ChatComponent},
  {path: '', redirectTo: socialRoutesNames.OVERVIEW, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
