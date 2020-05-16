import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserModule} from './modules/user/user.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldControl} from '@angular/material/form-field';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {HomeModule} from './modules/home/home.module';
import {SocialModule} from './modules/social/social.module';
import {DevModule} from './modules/dev/dev.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    UserModule,
    HomeModule,
    SocialModule,
    SharedModule,
    DevModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
