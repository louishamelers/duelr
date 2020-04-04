import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HOME_ROUTES} from './home.routes';
import {HomePageComponent} from './page/home-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
