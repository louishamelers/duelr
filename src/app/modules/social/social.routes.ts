import {Routes} from '@angular/router';
import {socialRoutesNames} from './social.routes.names';
import {ChatComponent} from './chat/chat.component';
import {OverviewComponent} from './overview/overview.component';

export const SOCIAL_ROUTES: Routes = [
  {path: socialRoutesNames.OVERVIEW, component: OverviewComponent},
  {path: ':chatId', component: ChatComponent},
  {path: '', redirectTo: socialRoutesNames.OVERVIEW, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
