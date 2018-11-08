import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {AuthGuard} from './login/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

import { WikipediaService } from './services/wikipedia.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [LoginService, AuthGuard, RegisterService, WikipediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
