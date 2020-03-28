import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import {RouterModule} from '@angular/router';
import {SOCIAL_ROUTES} from './social.routes';
import { OverviewComponent } from './overview/overview.component';
import {SharedModule} from '../../shared/shared.module';
import { PlaygroupComponent } from './playgroup/playgroup.component';



@NgModule({
  declarations: [ChatComponent, OverviewComponent, PlaygroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SOCIAL_ROUTES),
    SharedModule
  ]
})
export class SocialModule { }
