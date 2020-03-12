import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HOME_ROUTES} from './home.routes';
import {HomePageComponent} from './page/home-page.component';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
