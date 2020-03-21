import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [NotFoundComponent, WrapperComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    WrapperComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class SharedModule { }
