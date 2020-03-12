import {Routes} from '@angular/router';
import {homeRoutesNames} from './home.routes.names';

export const HOME_ROUTES: Routes = [
  {path: '', redirectTo: homeRoutesNames.ROOT, pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];
