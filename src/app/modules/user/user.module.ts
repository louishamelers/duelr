import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {USER_ROUTES} from './user.routes';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class UserModule { }
