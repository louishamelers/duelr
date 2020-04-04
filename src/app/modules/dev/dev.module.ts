import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorsComponent} from './colors/colors.component';
import {RouterModule} from '@angular/router';
import {socialRoutesNames} from '../social/social.routes.names';
import {OverviewComponent} from '../social/overview/overview.component';



@NgModule({
  declarations: [
    ColorsComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'colors', component: ColorsComponent}])
  ]
})
export class DevModule { }
